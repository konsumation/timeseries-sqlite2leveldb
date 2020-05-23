import test from "ava";
import fs from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import sqlite from 'sqlite'
import sqlite3 from 'sqlite3'

import levelup from "levelup";
import leveldown from "leveldown";
import { initialize, Category } from "konsum-db";
import { sqlite2leveldb } from "../src/worker.mjs";

const here = dirname(fileURLToPath(import.meta.url));

async function database() {
  await fs.promises.mkdir(join(here, "..", "build"), { recursive: true });
  const leveldb = await levelup(
    leveldown(join(here, "..", "build", "leveldb"))
  );
  await initialize(leveldb);
  return leveldb;
}

test.serial("migrate", async t => {
  const leveldb = await database();
  const sqldb = await sqlite.open({
    filename: join(here, "..", "tests", "fixtures", "sample.db"),
    driver: sqlite3.Database
  });

  const count = await sqlite2leveldb(sqldb, leveldb);

  await leveldb.close();
  t.true(count > 0);
});

test.serial("list", async t => {
  const leveldb = await database();

  const categories = new Map();

  for await (const c of Category.entries(leveldb)) {
    categories.set(c.name, c);
  }

  t.deepEqual([...categories.keys()], ["ev", "gs", "pv", "sp", "wa"]);
  await leveldb.close();
});

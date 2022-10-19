import test from "ava";
import { mkdir } from "fs/promises";
import { open } from "sqlite";
import sqlite3 from "sqlite3";
import levelup from "levelup";
import leveldown from "leveldown";
import { Master, Category } from "konsum-db";
import { sqlite2leveldb } from "../src/worker.mjs";

async function database() {
  await mkdir(new URL("../build", import.meta.url).pathname, {
    recursive: true
  });
  const leveldb = await levelup(
    leveldown(new URL("../build/leveldb", import.meta.url).pathname)
  );
  return await Master.initialize(leveldb);
}

test.serial("migrate", async t => {
  const master = await database();
  const sqldb = await open({
    filename: new URL("../tests/fixtures/sample.db", import.meta.url).pathname,
    driver: sqlite3.Database
  });

  const count = await sqlite2leveldb(sqldb, master);

  await master.close();
  t.true(count > 0);
});

test.serial("list", async t => {
  const master = await database();

  const categories = new Map();

  for await (const c of Category.entries(master.db)) {
    categories.set(c.name, c);
  }

  t.deepEqual([...categories.keys()], ["ev", "gs", "pv", "sp", "wa"]);
  await master.close();
});

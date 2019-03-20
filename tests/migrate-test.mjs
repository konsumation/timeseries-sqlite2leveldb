import test from "ava";
import { sqlite2leveldb } from "../src/worker";
import sqlite from "sqlite";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import levelup from "levelup";
import leveldown from "leveldown";
import { initialize, Category } from "konsum-db";
import fs from "fs";

const here = dirname(fileURLToPath(import.meta.url));

test.serial("migrate", async t => {
  await fs.promises.mkdir(join(here, "..", "build"), { recursive: true });

  const leveldb = levelup(leveldown(join(here, "..", "build", "leveldb")));

  const sqldb = await sqlite.open(
    join(here, "..", "tests", "fixtures", "sample.db")
  );

  const count = await sqlite2leveldb(sqldb, leveldb);

  leveldb.close();
  t.is(count > 0);
});

test("list", async t => {
  const leveldb = levelup(leveldown(join(here, "..", "build", "leveldb")));
  await initialize(leveldb);

 const categories = new Map();

  for await (const c of Category.entries(leveldb)) {
    categories.set(c.name,c);
  }
 
  t.deepEqual([...categories.keys()],[
     'ev',
     'gs',
     'pv',
     'sp',
     'wa'
]); 
  leveldb.close();
});

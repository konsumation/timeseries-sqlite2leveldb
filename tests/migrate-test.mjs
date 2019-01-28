import test from "ava";
import { sqlite2leveldb } from "../src/worker";
import sqlite from "sqlite";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import levelup from "levelup";
import leveldown from "leveldown";
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

test.cb("list", t => {
  t.plan(1);

  const leveldb = levelup(leveldown(join(here, "..", "build", "leveldb")));

  const readStream = leveldb.createReadStream({ start: "pv/0", end: "pv/Z" });

  readStream.on("data", data => {
    console.log(data.key + " = " + data.value);

    if (data.key.toString() === "pv/1030665600" && data.value == 2004.1) {
      console.log(data.key + " = " + data.value);

      t.pass();
    }
  });

  readStream.on("end", () => {
    leveldb.close();
    t.end();
  });
});

import sqlite from "sqlite";
import levelup from "levelup";
import leveldown from "leveldown";
import { initialize } from "konsum-db";
import { sqlite2leveldb } from "./worker.mjs";

async function migrate() {
  console.log(`migrate ${process.argv[2]} -> ${process.argv[3]}`);
  const sqldb = await sqlite.open(process.argv[2]);
  const leveldb = await levelup(leveldown(process.argv[3]));
  await initialize(leveldb);

  const n = await sqlite2leveldb(sqldb, leveldb);
  console.log(`${n} records migrated`);

  await leveldb.close();
}

migrate();

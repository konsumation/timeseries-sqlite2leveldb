import { sqlite2leveldb } from './worker';
import sqlite from 'sqlite';
import levelup from 'levelup';
import leveldown from 'leveldown';

async function migrate() {
  const sqldb = await sqlite.open(process.argv[2]);
  const leveldb = levelup(leveldown(process.argv[3]));
  console.log(`migrate ${process.argv[2]} -> ${process.argv[3]}`);

  const n = await sqlite2leveldb(sqldb, leveldb);
  console.log(`${n} records migrated`);

  leveldb.close();
}

migrate();

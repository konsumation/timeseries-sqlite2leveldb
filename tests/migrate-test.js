import test from 'ava';
import { sqlite2leveldb } from '../src/worker';
import sqlite from 'sqlite';

const path = require('path');

test('migrate', async t => {
  const db = await sqlite.open(
    path.join(__dirname, '../tests', 'fixtures', 'database.db')
  );

  await sqlite2leveldb(db);

  t.pass();
});

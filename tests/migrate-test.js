import test from 'ava';
import { sqlite2leveldb } from '../src/worker';
import sqlite from 'sqlite';

const levelup = require('levelup');
const path = require('path');

test('migrate', async t => {
  const leveldb = levelup(path.join(__dirname, '../build', 'leveldb'));

  const sqldb = await sqlite.open(
    path.join(__dirname, '../tests', 'fixtures', 'sample.db')
  );

  await sqlite2leveldb(sqldb, leveldb);

  t.pass();
});

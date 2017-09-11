import test from 'ava';
import { sqlite2leveldb } from '../src/worker';
import sqlite from 'sqlite';

const levelup = require('levelup');
const path = require('path');

test.skip('migrate', async t => {
  const leveldb = levelup(path.join(__dirname, '../build', 'leveldb'));

  const sqldb = await sqlite.open(
    path.join(__dirname, '../tests', 'fixtures', 'sample.db')
  );

  await sqlite2leveldb(sqldb, leveldb);

  t.pass();
});

test.cb('list', t => {
  t.plan(1);

  const leveldb = levelup(path.join(__dirname, '../build', 'leveldb'));

  const readStream = leveldb.createReadStream({ start: 'pv/0', end: 'pv/Z' });

  readStream.on('data', data => {
    console.log(data.key + ' = ' + data.value);
    t.pass();
  });

  readStream.on('end', () => {
    t.end();
  });
});

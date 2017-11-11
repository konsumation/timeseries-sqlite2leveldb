import test from 'ava';
import { sqlite2leveldb } from '../src/worker';
import sqlite from 'sqlite';

const levelup = require('levelup');
const leveldown = require('leveldown');
const path = require('path');

test.serial('migrate', async t => {
  const leveldb = levelup(
    leveldown(path.join(__dirname, '..', 'build', 'leveldb'))
  );

  const sqldb = await sqlite.open(
    path.join(__dirname, '..', 'tests', 'fixtures', 'sample.db')
  );

  await sqlite2leveldb(sqldb, leveldb);

  leveldb.close();
  t.pass();
});

test.cb('list', t => {
  t.plan(1);

  const leveldb = levelup(
    leveldown(path.join(__dirname, '..', 'build', 'leveldb'))
  );

  const readStream = leveldb.createReadStream({ start: 'pv/0', end: 'pv/Z' });

  readStream.on('data', data => {
    //console.log(data.key + ' = ' + data.value);

    if (data.key.toString() === 'pv/1030665600' && data.value == 2004.1) {
      console.log(data.key + ' = ' + data.value);

      t.pass();
    }
  });

  readStream.on('end', () => {
    leveldb.close();
    t.end();
  });
});

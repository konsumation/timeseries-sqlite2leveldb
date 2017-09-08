import sqlite from 'sqlite';

export async function sqlite2leveldb(sqldb) {
  const stmt = await sqldb.prepare('SELECT date,type,amount FROM value_date');

  stmt.each((err, result) => {
    console.log(result);
  });
}

function pad(num, size) {
  const s = '000000000' + num;
  return s.substr(s.length - size);
}

export async function sqlite2leveldb(sqldb, leveldb) {
  const DATE = "strftime('%s',date)";
  const stmt = await sqldb.prepare(
    `SELECT ${DATE},type,amount FROM value_date`
  );

  stmt.each((err, result) => {
    const key = `${result.type}/${pad(result[DATE], 10)}`;

    leveldb.put(key, result.amount, err => {
      if (err) return console.log('Ooops!', err);
    });
  });
}

function pad(num, size) {
  const s = '000000000' + num;
  return s.substr(s.length - size);
}

export async function sqlite2leveldb(sqldb, leveldb) {
  const DATE = "strftime('%s',date)";

  const inserts = [];
  await sqldb.each(
    `SELECT ${DATE},type,amount FROM value_date`,
    (err, result) => {
      const key = `${result.type}/${pad(result[DATE], 10)}`;
      inserts.push({ type: 'put', key: key, value: result.amount });
    }
  );

  return new Promise((resolve, reject) => {
    leveldb.batch(inserts, err => {
      if (err) reject(err);
      else resolve();
    });
  });
}

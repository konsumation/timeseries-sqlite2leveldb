export async function sqlite2leveldb(sqldb, leveldb) {
  const DATE = "strftime('%s',date)";
  const stmt = await sqldb.prepare(
    `SELECT ${DATE},type,amount FROM value_date`
  );

  stmt.each((err, result) => {
    console.log(result);

    const key = `${result.type}/${result[DATE]}`;

    leveldb.put(key, result.amount, err => {
      if (err) return console.log('Ooops!', err);

      leveldb.get(key, (err, value) => {
        if (err) return console.log('Ooops!', err);
        console.log(`${key}=${value}`);
      });
    });
  });
}

export async function sqlite2leveldb(sqldb, leveldb) {
  const stmt = await sqldb.prepare('SELECT date,type,amount FROM value_date');

  stmt.each((err, result) => {
    //console.log(result);

    const key = `${result.type}/${result.date}`;

    leveldb.put(key, result.amount, err => {
      if (err) return console.log('Ooops!', err);

      leveldb.get(key, (err, value) => {
        if (err) return console.log('Ooops!', err);
        console.log(`${key}=${value}`);
      });
    });
  });
}

/**
 * convert sqlite data into leveldb data
 * @param sqldb
 * @param leveldb
 * @return {Promise}
 */
export async function sqlite2leveldb(sqldb, leveldb) {
  const DATE = "strftime('%s',date)";

  const inserts = [];
  await sqldb.each(
    `SELECT ${DATE},type,amount FROM value_date`,
    (err, result) => {
      const key = `${result.type}/${result[DATE].padStart(10, '0')}`;
      inserts.push({ type: 'put', key, value: result.amount });
    }
  );

  return new Promise((resolve, reject) => {
    leveldb.batch(inserts, err => {
      if (err) reject(err);
      else resolve();
    });
  });
}

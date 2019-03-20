
import { Category } from 'konsum-db';

/**
 * Convert sqlite data into leveldb data
 * @param {Database} sqldb source sqlite database
 * @param {Levelup} leveldb destination level db
 * @return {Promise<number>} A promise that resolves after all records have been inserted
 */
export async function sqlite2leveldb(sqldb, leveldb) {
  const DATE = "strftime('%s',date)";

  const categories = new Map();

  for await (const c of Category.entries(leveldb)) {
    categories.set(c.name,c);
  }

  let n = 0;

  await sqldb.each(
    `SELECT ${DATE},type,amount FROM value_date`,
    (err, result) => {
      console.log(n,result);
      let c = categories.get(result.type);
      if(c === undefined) {
        c = new Category(result.type, {});
        c.write(leveldb);
        categories.set(c.name,c);
      }
      c.writeValue(leveldb,parseFloat(result[DATE]),result.amount);
      n++;
    }
  );

  console.log("NNNN",n);
  return n;
}

import { Category } from "konsum-db";

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
    categories.set(c.name, c);
  }

  await sqldb.each(
    "SELECT id,name,unit,color,decimal_places FROM value_type",
    (err, result) => {
      let c = categories.get(result.id);
      if (c === undefined) {
        c = new Category(result.id, {
          description: result.description,
          unit: result.unit,
          color: result.result,
          decimal_places: result.decimal_places
        });
        c.write(leveldb);
        categories.set(c.name, c);
        //console.log(c, result);
      }
    }
  );

  let n = 0;

  await sqldb.each(
    `SELECT ${DATE},type,amount FROM value_date`,
    (err, result) => {
      //console.log(n, result);
      let c = categories.get(result.type);
      if (c === undefined) {
        c = new Category(result.type, {});
        c.write(leveldb);
        categories.set(c.name, c);
        console.log(`unknown category ${result.type}`);
      }

      c.writeValue(leveldb, parseFloat(result[DATE]), result.amount);
      n++;
    }
  );

  return n;
}

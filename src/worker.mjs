import { Category } from "konsum-db";

/**
 * Convert sqlite data into leveldb data
 * @param {Database} sqldb source sqlite database
 * @param {Master} master konsum master
 * @return {Promise<number>} A promise that resolves after all records have been inserted
 */
export async function sqlite2leveldb(sqldb, master) {
  const DATE = "strftime('%s',date)";

  const categories = new Map();

  for await (const c of Category.entries(master.db)) {
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
        c.write(master.db);
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
        c.write(master.db);
        categories.set(c.name, c);
        console.log(`unknown category ${result.type}`);
      }

      c.writeValue(master.db, result.amount, parseFloat(result[DATE]));
      n++;
    }
  );

  return n;
}

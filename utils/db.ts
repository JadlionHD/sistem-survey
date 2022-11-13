import mysql from "serverless-mysql";
const database = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT!),
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD
  }
});

export async function query(query: string, values?: unknown[]) {
  try {
    const results = await database.query(query, values);
    await database.end();

    // @ts-ignore
    return results.length === 0 ? null : results;
  } catch (error) {
    return { error };
  }
}

import mysql from "mysql2/promise";

const connection = await mysql.createConnection(process.env.DB_URI);

export default async function dbQuery(...args) {
  try {
    const data = await connection.execute(...args);
    return data;
  } catch (error) {
    console.log(error);
  }
}

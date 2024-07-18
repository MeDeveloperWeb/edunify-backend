import dbQuery from "../database/query.js";

export default async function viewSchools(req, res, next) {
  try {
    const query = `SELECT * FROM schools`;

    const data = await dbQuery(query);

    const [rows] = data;
    return res.json(rows);
  } catch (error) {
    console.log(error);
    return [];
  }
}

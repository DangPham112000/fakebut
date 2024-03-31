import { MongoClient } from "mongodb";
const connStr = process.env.ATLAS_URI || "";

const client = new MongoClient(connStr);

let conn;

try {
  conn = await client.connect();
} catch (error) {
  console.log(error);
}

let db = conn.db("sample_mflix");

export default db;

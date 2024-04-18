import { MongoClient } from "mongodb";
// const connStr = process.env.MONGO_URI || "";
const connStr = process.env.ATLAS_URI || "";

const client = new MongoClient(connStr);

let conn;

try {
  conn = await client.connect();
} catch (error) {
  console.log("mongo err");
  console.log(error);
}

let db = conn.db("sample_mflix");
// let db = conn.db("my_test");

export default db;

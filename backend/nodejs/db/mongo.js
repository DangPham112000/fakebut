import { MongoClient } from "mongodb";

// const connStr = process.env.MONGO_URI || "";
const connStr = process.env.ATLAS_URI || "";
// const dbName = 'my_test';
const dbName = "sample_mflix";

const getDatabase = async (connectionString, databaseName) => {
	const client = new MongoClient(connectionString);
	let conn;

	try {
		conn = await client.connect();
	} catch (error) {
		console.error(error.code + " - Can not connect mongoDB");
		return "";
	}

	return conn.db(databaseName);
};

const db = await getDatabase(connStr, dbName);

export default db;

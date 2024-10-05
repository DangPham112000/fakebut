import mongoose from "mongoose";
import {countConnections} from '../helpers/check.connect.js'
// const connStr = process.env.MONGO_URI || "";
const connectionString = process.env.ATLAS_URI || "";

// Singleton
class Database {
    constructor() {
        this.connect();
    }
    // connect
    connect(type = 'mongodb') {
        if (true) { // dev
            mongoose.set('debug', true);
            mongoose.set('debug', {color: true});
        }

        mongoose.connect(connectionString)
            .then(_ => {
                console.log('Connected mongoBD success!!!');
                countConnections();
            })
            .catch(err => console.log('Connect error: ', err));
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database()
        }
        return Database.instance;
    }
}

const instanceMongodb = Database.getInstance();

export default instanceMongodb;

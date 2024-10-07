import mongoose from "mongoose";
import {countConnections} from '../helpers/check.connect.js';
import config from '../configs/config.mongodb.js'

const {db: {name, host, port, uri, maxPoolSize}} = config;
// const connectionString = uri || "";
const connectionString = `mongodb://${host}:${port}/` || "";

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

        mongoose.connect(connectionString, {
            maxPoolSize
        })
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

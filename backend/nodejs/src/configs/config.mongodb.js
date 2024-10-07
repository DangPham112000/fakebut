const dev = {
    app: {
        port: +process.env.DEV_APP_PORT,
    },
    db: {
        host: process.env.DEV_DB_HOST,
        port: +process.env.DEV_DB_PORT,
        name: process.env.DEV_DB_NAME,
        uri: process.env.DEV_DB_URI,
        maxPoolSize: +process.env.DEV_DB_MAXPOOLSIZE,
    }
}

const pro = {
    app: {
        port: +process.env.PRO_APP_PORT,
    },
    db: {
        host: process.env.PRO_DB_HOST,
        port: +process.env.PRO_DB_PORT,
        name: process.env.PRO_DB_NAME,
        uri: process.env.PRO_DB_URI,
        maxPoolSize: +process.env.PRO_DB_MAXPOOLSIZE,
    }
}

const config = {dev, pro};
const env = process.env.NODE_ENV || 'dev';

console.log(env, config[env]);

export default config[env];
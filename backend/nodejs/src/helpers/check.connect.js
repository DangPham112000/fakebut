import mongoose from "mongoose";
import os from "os";

const _5_SECONDS = 5000;

const countConnections = () => {
    const numConns = mongoose.connections.length;
    console.log(`Number of mongoDB connections :: ${numConns}`);
    return numConns;
}

const checkOverload = () => {
    setInterval(() => {
        const numConns = countConnections();
        const memoryUsage = process.memoryUsage().rss;
        const numCores = os.cpus().length; // Example 1 cpu have 1 core

        // Example each core can have up to 5 connection;
        const maxConn = numCores * 5;

        console.log(`Memory usage :: ${memoryUsage / 1024 / 1024}MB`);

        if (numConns > maxConn) {
            console.log(`Connection overload detected`);
            // TODO: notify.send(...) 
        }

    }, _5_SECONDS);
}

export {
    countConnections,
    checkOverload
}
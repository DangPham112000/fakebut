import { createClient } from "redis";
import RedisStore from "connect-redis";

const redisClient = createClient();
redisClient.connect().catch((error) => {
	console.error(error.code + " - Can not connect redis");
});

const redisStore = new RedisStore({
	client: redisClient,
	prefix: process.env.REDIS_PREFIX,
});

export default redisStore;

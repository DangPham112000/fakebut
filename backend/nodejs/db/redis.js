import { createClient } from "redis";
import RedisStore from "connect-redis";

const redisClient = createClient();
redisClient.connect().catch(console.log);

const redisStore = new RedisStore({
  client: redisClient,
  prefix: process.env.REDIS_PREFIX,
});

export default redisStore;

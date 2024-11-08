import redis from "redis";
import { promisify } from "util";

const redisClient = redis.createClient();

const pExpireAsync = promisify(redisClient.pExpire).bind(redisClient);
const setNXAsync = promisify(redisClient.setNX).bind(redisClient);

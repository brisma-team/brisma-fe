import Redis from "ioredis";

const redisConnect = new Redis({
  host: process.env.NEXT_PUBLIC_REDIS_HOST,
  port: process.env.NEXT_PUBLIC_REDIS_PORT,
  password: process.env.NEXT_PUBLIC_REDIS_PASSWORD,
});

export default redisConnect;

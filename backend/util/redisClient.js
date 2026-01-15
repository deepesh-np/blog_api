import { createClient } from "redis";

const redisClient = createClient({
  url: "redis://127.0.0.1:6379",
});

redisClient.on("connect", () => {
  console.log("Redis connecting...");
});

redisClient.on("ready", () => {
  console.log("Redis connected and ready");
});

redisClient.on("reconnecting", () => {
  console.warn("Redis reconnecting...");
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

redisClient.on("end", () => {
  console.warn("Redis connection closed");
});

export const initRedis = async () => {
  try {
    await redisClient.connect();
  } catch (err) {
    console.error("Redis startup failed:", err);
    process.exit(1);
  }
};

export default redisClient;

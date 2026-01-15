import redisClient from "../util/redisClient.js";

export const cacheService = {
  async get(key) {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  },

  async set(key, value, ttl = 60) {
    await redisClient.set(
      key,
      JSON.stringify(value),
      "EX",
      ttl
    );
  },

  async del(key) {
    await redisClient.del(key);
  },

  async delByPattern(pattern) {
    const keys = await redisClient.keys(pattern);
    if (keys.length) {
      await redisClient.del(keys);
    }
  },
};

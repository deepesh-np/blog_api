import { cacheService } from "../services/cacheService.js";

export const cacheMiddleware = ({
  key,
  ttl = 60,
}) => {
  return async (req, res, next) => {
    const cacheKey =
      typeof key === "function"
        ? key(req)
        : key;

    const cached = await cacheService.get(cacheKey);

    if (cached) {
      return res.status(200).json(cached);
    }

    // hijack res.json
    const originalJson = res.json.bind(res);

    res.json = (data) => {
      cacheService.set(cacheKey, data, ttl);
      return originalJson(data);
    };

    next();
  };
};

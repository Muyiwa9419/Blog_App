const NodeCache = require('node-cache')


const cache = new NodeCache({ stdTTL: 600 });


const cacheMiddleware = (req, res, next) => {
    if (req.method !== 'GET') {
      return next(); // Only cache GET requests
    }
  
    const key = req.originalUrl || req.url; // Use the original URL as the cache key
    const cachedResponse = cache.get(key);
  
    if (cachedResponse) {
      console.log(`Cache hit for ${key}`);
      return res.send(cachedResponse); // Return the cached response if it exists
    } else {
      console.log(`Cache miss for ${key}`);
      // Replace res.send to cache the response before sending it
      res.sendResponse = res.send;
      res.send = (body) => {
        cache.set(key, body); // Cache the response body
        res.sendResponse(body);
      };
      next();
    }
  };

  module.exports = cacheMiddleware
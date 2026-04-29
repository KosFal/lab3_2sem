function memoizeTTL(fn, ttl = 1000) {
  const cache = {};

  return function(...args) {
    const key = JSON.stringify(args);
    const now = Date.now(); 

    if (key in cache) {
      const entry = cache[key];

      if (now - entry.timestamp > ttl) {
        console.log(`${key}`);
        delete cache[key]; 
      } else {
        console.log(`${key}`);
        return entry.result;
      }
    }

    console.log(`${key}`);
    const result = fn(...args);

    cache[key] = {
      result: result,
      timestamp: now
    };

    return result;
  };
}
const multiply = (a, b) => a * b;

const ttlMemoized = memoizeTTL(multiply, 2000); 


ttlMemoized(5, 5); 
setTimeout(() => {
  ttlMemoized(5, 5); 
}, 500);

setTimeout(() => {
  
  ttlMemoized(5, 5); 
}, 3000);

function memoizeCustom(fn, limit = 0, customEvictor) {
  const cache = {};
  const metadata = {}; 

  return function(...args) {
    const key = JSON.stringify(args);
    const now = Date.now();


    if (key in cache) {
      console.log(`${key}`);
      metadata[key].accessCount += 1;
      metadata[key].lastAccessed = now;
      return cache[key];
    }

    console.log(`${key}`);
    const result = fn(...args);

    cache[key] = result;
    metadata[key] = {
      key: key,
      createdAt: now,
      lastAccessed: now,
      accessCount: 1
    };

    const keys = Object.keys(cache);
    if (limit > 0 && keys.length > limit) {
      let keyToRemove = keys[0];

      if (typeof customEvictor === 'function') {
        keyToRemove = customEvictor(keys, metadata);
      }

      delete cache[keyToRemove];
      delete metadata[keyToRemove];
      console.log(`${keyToRemove}`);
    }

    return result;
  };
}

const randomEvictor = (keys, metadata) => {
  const randomIndex = Math.floor(Math.random() * keys.length);
  return keys[randomIndex];
};

const multiply = (a, b) => a * b;

const randomMemoized = memoizeCustom(multiply, 2, randomEvictor);

randomMemoized(2, 2); 
randomMemoized(3, 3); 
randomMemoized(4, 4);

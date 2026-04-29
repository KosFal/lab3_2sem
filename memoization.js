function memoize(fn, limit = 0) {
  const cache = {};
  const keysHistory = [];
  return function(...args) {
    const key = JSON.stringify(args);

    if (key in cache) {
      console.log(`${key}`);
      return cache[key];
    }

    console.log(`${key}`);
    const result = fn(...args);

    cache[key] = result;
    keysHistory.push(key);

    if (limit > 0 && keysHistory.length > limit) {
      const oldestKey = keysHistory.shift();
      
      delete cache[oldestKey];
      console.log(`Кеш переповнено. Видалено найстаріший запис: ${oldestKey}`);
    }

    return result;
  };
}

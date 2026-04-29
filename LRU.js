function memoizeLRU(fn, limit = 0) {
  const cache = {};
  const keysHistory = []; 

  return function(...args) {
    const key = JSON.stringify(args);

    if (key in cache) {
      console.log(`[Кеш HIT] Взято з кешу: ${key}`);

      const index = keysHistory.indexOf(key);
      keysHistory.splice(index, 1);
      keysHistory.push(key);
      return cache[key];
    }

    console.log(` ${key}`);
    const result = fn(...args);

    cache[key] = result;
    keysHistory.push(key);

    if (limit > 0 && keysHistory.length > limit) {
      const lruKey = keysHistory.shift();
      delete cache[lruKey];
      console.log(`Видалено найменш використовуваний запис: ${lruKey}`);
    }

    return result;
  };
}

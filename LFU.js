function memoizeLFU(fn, limit = 0) {
  const cache = {};
  const counts = {}; 
  let currentSize = 0; 

  return function(...args) {
    const key = JSON.stringify(args);

    if (key in cache) {
      console.log(`${key}`);
      counts[key] += 1; 
      return cache[key];
    }

    console.log(`${key}`);
    const result = fn(...args);

    cache[key] = result;
    counts[key] = 1; 
    currentSize++;

    if (limit > 0 && currentSize > limit) {
      let minCount = Infinity; 
      let lfuKey = null;

      for (const k in counts) {
        if (counts[k] < minCount) {
          minCount = counts[k];
          lfuKey = k;
        }
      }

      delete cache[lfuKey];
      delete counts[lfuKey];
      currentSize--; 

      console.log(` Видалено непопулярний запис: ${lfuKey} (викликів: ${minCount})`);
    }

    return result;
  };
}
const multiply = (a, b) => a * b;
const lfuMemoized = memoizeLFU(multiply, 2); 

lfuMemoized(2, 2);
lfuMemoized(3, 3); 
lfuMemoized(2, 2); 
lfuMemoized(2, 2); 
lfuMemoized(4, 4); 

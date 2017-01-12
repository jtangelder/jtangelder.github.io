export function reduce(fn, initialValue, arrayLike) {
  let value = initialValue;
  for(let i = 0; i < arrayLike.length; i++) {
    value = fn(value, arrayLike[i], i);
  }
  return value;
}

export function map(fn, arrayLike) {
  return reduce((acc, value, index) => {
    acc.push(fn(value, index));
    return acc;
  }, [], arrayLike);
}

export function round(nr, decimals) {
  const m = Math.pow(10, decimals);
  return Math.round(nr * m) / m;
}
export function round(nr, decimals) {
  const m = Math.pow(10, decimals);
  return Math.round(nr * m) / m;
}

export function average(values) {
  return values.reduce((a, b) => a + b) / values.length;
}

export function mode(values) {
  return values.reduce((acc, value) => {
    acc.map[value] = acc.map[value] || 0;
    acc.map[value] += 1;

    if (acc.map[value] > acc.modeCount) {
      acc.modeCount = acc.map[value];
      acc.modeValue = value;
    }
    return acc;
  }, {
    map: {},
    modeCount: 0,
    modeValue: null
  }).modeValue;
}

export function getValues(array, keys) {
  return array.reduce((results, item) => {
    keys.forEach(key => {
      results[key] = results[key] || [];
      results[key].push(item[key]);
    });
    return results;
  }, {});
}

export function getAverageValue(values) {
  return (typeof values[0] === 'number') ? average(values) : mode(values)
}

export function createAverageObject(objects) {
  if (!objects.length) {
    return {};
  }
  const values = getValues(objects, Object.keys(objects[0]));
  return Object.keys(values).reduce((result, key) =>
    Object.assign(result, { [key]: getAverageValue(values[key]) })
  );
}
const cache = {};

function set(key, value) {
  cache[key] = {
    value: value,
    timestamp: Date.now(),
  };
}

function get(key) {
  return new Promise((resolve) => {
    resolve(
      cache[key] && cache[key].timestamp + 15 * 60 * 1000 > Date.now()
        ? cache[key].value
        : null
    );
  });
}

export default {
  set,
  get,
};

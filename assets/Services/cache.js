// Define an in-memory cache object to store key-value pairs
const cache = {};

/**
 * Stores a value in the cache with a timestamp.
 * @param {string} key - The key under which the value is stored.
 * @param {*} value - The value to be stored.
 */
function set(key, value) {
  cache[key] = {
    value: value, // The actual value to store
    timestamp: Date.now(), // Current time to manage cache expiration
  };
}

/**
 * Retrieves a value from the cache if it hasn't expired.
 * @param {string} key - The key of the value to retrieve.
 * @returns {Promise<*>} A promise that resolves to the stored value or null if expired/not found.
 */
function get(key) {
  return new Promise((resolve) => {
    resolve(
      // Check if the key exists and the stored value hasn't expired (15 minutes)
      cache[key] && cache[key].timestamp + 15 * 60 * 1000 > Date.now()
        ? cache[key].value // Return the value if it's valid
        : null // Return null if the value is expired or the key doesn't exist
    );
  });
}

// Export the set and get functions to be used elsewhere in the application
export default {
  set,
  get,
};

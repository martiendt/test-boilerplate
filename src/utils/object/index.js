/**
 * Remove blank attribute from object
 *
 * @param {Object} obj
 * @returns {Object}
 */
export function removeEmpty(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
}

export default {
  removeEmpty,
};

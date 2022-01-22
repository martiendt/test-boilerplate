export const clean = (object) => {
  Object.entries(object).forEach(([k, v]) => {
    if (v && typeof v === "object") {
      clean(v);
    }
    if ((v && v === null) || v === undefined || v.length === 0 || k.length === 0) {
      delete object[k];
    }
  });
  return object;
};

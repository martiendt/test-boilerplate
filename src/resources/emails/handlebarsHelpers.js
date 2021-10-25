import { serverConfig } from "#src/config/server.js";

/**
 * Generate text containing released year and
 * current year like 2016-2021 or just 2021
 * if released year equals current year.
 *
 * @param {int} releaseYear
 * @returns {int|string}
 */
export const copyrightYear = (releaseYear) => {
  const currentYear = new Date().getFullYear();
  if (currentYear !== releaseYear) {
    return `${releaseYear}-${currentYear}`;
  }
  return releaseYear;
};

/**
 * Prints app name to handlebars template.
 * @returns {string}
 */
export const appName = () => {
  return serverConfig.appName;
};

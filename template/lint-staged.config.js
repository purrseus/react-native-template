/**
 * @type {import('lint-staged').Config}
 */
module.exports = {
  '{src,scripts,__tests__}/**/*.{ts,tsx,js,jsx,mjs}': 'yarn lint',
};

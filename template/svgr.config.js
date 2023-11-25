/**
 * @type {import('@svgr/core').Config}
 */
module.exports = {
  replaceAttrValues: {
    '#000': '{props.fill}',
    '#111': '{props.stroke}',
  },
};

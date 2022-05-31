const path = require(`path`);
const alias = require(`./aliases`);
const { aliasWebpack } = require('react-app-alias');
const {addWebpackExternals } = require('customize-cra')

const SRC = `./src`;
const aliases = alias(SRC);

const resolvedAliases = Object.fromEntries(
  Object.entries(aliases).map(([key, value]) => [key, path.resolve(__dirname, value)])
);

const options = {
  alias: resolvedAliases,
};

module.exports = function override(config) {
  config.ignoreWarnings = [{ message: /Failed to parse source map/ }];

  addWebpackExternals({
    'jquery': '$',
    'lodash': '_',
    'lodash-es': '_',
    'leaflet': 'L',
    // 'charts.js': 'Chart',
    // '@amcharts/amcharts4/core': 'am4core',
    // '@amcharts/amcharts4/themes/animated': 'am4themes_animated',
    // '@amcharts/amcharts4/charts': 'am4charts',
  })(config)

  return aliasWebpack(options)(config);
};

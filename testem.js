/* eslint-env node */
const config = require('ember-chromium').getTestemConfig();
config.reporter = 'dot';

module.exports = config;

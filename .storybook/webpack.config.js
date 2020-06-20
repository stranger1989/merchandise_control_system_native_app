const { resolve } = require("path");
const webpack = require('webpack');
const { withUnimodules } = require("@expo/webpack-config/addons");

module.exports = ({ config }) => {
  return withUnimodules(config, { projectRoot: resolve(__dirname, "../") });
};
const { join } = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.config.base");

const rootPath = join(__dirname, "..");

module.exports = merge(baseConfig, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: join(rootPath, "dist"),
    port: 3000,
  },
});
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.config.base");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = merge(baseConfig, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    hot: true,
    port: 3000,
  },
  plugins: [new ReactRefreshWebpackPlugin()],
});

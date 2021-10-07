const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.config.base");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const plugins = [];

if (process.env.ANALYZE && JSON.parse(process.env.ANALYZE)) {
  plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: "server",
    }),
  );
}

module.exports = merge(baseConfig, {
  mode: "production",
  plugins,
});

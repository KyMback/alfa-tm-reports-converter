const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.config.base");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const WorkboxPlugin = require("workbox-webpack-plugin");
const { join } = require("path");

const rootPath = join(__dirname, "..");
const srcPath = join(rootPath, "src");

const plugins = [
  new WorkboxPlugin.InjectManifest({
    swSrc: join(srcPath, "service-worker.ts"),
  }),
];

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

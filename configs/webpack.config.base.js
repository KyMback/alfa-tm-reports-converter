const { join, resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const rootPath = join(__dirname, "..");
const srcPath = join(rootPath, "src");
const publicPath = join(rootPath, "public");

module.exports = {
  entry: join(srcPath, "index.tsx"),
  output: {
    path: join(rootPath, "dist"),
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      typings: resolve(srcPath, "typings"),
      utils: resolve(srcPath, "utils"),
      services: resolve(srcPath, "services"),
      stores: resolve(srcPath, "stores"),
      contexts: resolve(srcPath, "contexts"),
      hooks: resolve(srcPath, "hooks"),
      components: resolve(srcPath, "components"),
      pages: resolve(srcPath, "pages"),
      modules: resolve(srcPath, "modules"),
      styles: resolve(srcPath, "styles"),
      constants: resolve(srcPath, "constants"),
      // To optimize bundle size
      xlsx: "xlsx/dist/xlsx.mini.min.js",
      mobx: "mobx/dist/mobx.esm.production.min.js",
    },
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(png)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[hash][ext][query]",
        },
      },
      {
        test: /\.(woff|woff2|ttf)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[hash][ext][query]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: join(publicPath, "index.html"),
      favicon: join(publicPath, "favicon.png"),
    }),
    new CopyWebpackPlugin({
      patterns: [join(publicPath, "manifest.json")],
    }),
  ],
};

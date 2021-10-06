const { join, resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const rootPath = join(__dirname, "..");
const srcPath = join(rootPath, "src");

module.exports = {
  entry: join(srcPath, "index.tsx"),
  output: {
    path: join(rootPath, "dist"),
    clean: true,
    library: {
      type: "umd",
    },
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
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: join(srcPath, "index.html"),
    }),
  ],
};

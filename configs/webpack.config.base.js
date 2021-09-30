const { join } = require("path");
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
    // alias: {
    //   constants: resolve(srcPath, "constants"),
    //   pages: resolve(srcPath, "pages"),
    //   components: resolve(srcPath, "components"),
    //   modules: resolve(srcPath, "modules"),
    // },
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
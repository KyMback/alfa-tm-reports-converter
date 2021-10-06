const presets = [
  "@babel/preset-env",
  [
    "@babel/preset-react",
    {
      runtime: "automatic",
    },
  ],
  "@babel/preset-typescript",
];
const plugins = [];

if (process.env.NODE_ENV === "development") {
  plugins.push("react-refresh/babel", [
    "babel-plugin-styled-components",
    {
      fileName: false,
    },
  ]);
} else {
  plugins.push([
    "babel-plugin-styled-components",
    {
      displayName: false,
      minify: true,
      pure: true,
      transpileTemplateLiterals: true,
    },
  ]);
}

module.exports = {
  presets,
  plugins,
};

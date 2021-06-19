const path = require("path");
const { merge } = require("webpack-merge");
const nodeExternals = require("webpack-node-externals");

const baseConfig = {
  entry: path.resolve(__dirname, "src/server.js"),
  output: {
    filename: "server/index.js",
    path: path.resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.js/i,
        exclude: path.resolve(__dirname, "node_modules"),
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js"],
  },
  target: "node",
  externals: [nodeExternals()],
};

const productionConfig = merge(baseConfig, {
  mode: "production",
});

const developmentConfig = merge(baseConfig, {
  mode: "development",
  devtool: "source-map",
});

module.exports =
  process.env.WEBPACK_ENV === "production"
    ? productionConfig
    : developmentConfig;

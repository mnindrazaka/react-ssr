const path = require("path");
const { merge } = require("webpack-merge");
const nodeExternals = require("webpack-node-externals");

const baseConfig = {
  entry: path.resolve(__dirname, "src/server/index.js"),
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
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css/i,
        loader: "css-loader",
        options: {
          modules: {
            exportOnlyLocals: true,
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)/i,
        type: "asset/resource",
        generator: {
          filename: "assets/img/[hash][ext][query]",
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
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

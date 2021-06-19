const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");

const baseConfig = {
  entry: "./src/client/index.js",
  output: {
    filename: "assets/js/main.js",
    path: path.resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)/i,
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
        use: ["style-loader", "css-loader"],
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
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
  ],
};

const productionConfig = merge(baseConfig, {
  mode: "production",
});

const developmentConfig = merge(baseConfig, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    contentBase: "./build",
  },
});

module.exports =
  process.env.WEBPACK_ENV === "production"
    ? productionConfig
    : developmentConfig;

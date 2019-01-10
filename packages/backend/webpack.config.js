const TsConfigPathsPlugin = require("tsconfig-paths-webpack-plugin")
const slsw = require("serverless-webpack")
const path = require("path")

module.exports = {
  entry: slsw.lib.entries,
  mode: slsw.lib.webpack.isLocal ? "development" : "production",
  devtool: "inline-source-map",
  target: "node",
  resolve: {
    extensions: [".js", ".json", ".ts"],
    plugins: [new TsConfigPathsPlugin()]
  },
  output: {
    libraryTarget: "commonjs2",
    path: path.join(__dirname, "build"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true
            }
          }
        ]
      }
    ]
  }
}

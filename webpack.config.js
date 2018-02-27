module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/public/src',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'env', 'stage-1']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  watch: true,
  devServer: {
    historyApiFallback: true,
    contentBase: __dirname + '/public/',
    port: 3000
  }
};

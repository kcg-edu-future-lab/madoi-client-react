module.exports = {
  // development or production
  mode: 'development',
  entry: './src/madoi-react.ts',
  module: {
    rules: [
      {
        // 拡張子 .ts の場合
        test: /\.ts$/,
        // TypeScript をコンパイルする
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: [
      '.ts', '.js',
    ],
  },
  output: {
    library: "madoi-react",
    filename: 'madoi-react.js',
    libraryTarget: "umd"
  },
  devServer: {
    contentBase: "dist",
    watchContentBase: true,
    open: true
  }
};

import path from 'path';

export default {
  mode: 'development',
  entry: path.join(__dirname, 'src/ic-table.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'build.js',
    libraryTarget: 'umd',
    globalObject: "typeof self !== 'undefined' ? self : this"
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), './node_modules'],
  },
  module: {
    rules: [
      {
        test: /.js?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },
};


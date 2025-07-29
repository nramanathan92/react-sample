const path = require('path');
const fs = require('fs');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// Dynamically generate entry points from jswrapper directory
const jswrapperDir = path.resolve(__dirname, '../src/jswrapper');
const entries = {};

if (fs.existsSync(jswrapperDir)) {
  const files = fs.readdirSync(jswrapperDir);
  files.forEach(file => {
    if (file.endsWith('.js')) {
      const name = `SF${path.basename(file, '.js')}`;
      entries[name] = `./src/jswrapper/${file}`;
    }
  });
}

module.exports = {
  entry: entries,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'var',
    globalObject: 'this',
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: ['**/node_modules', '**/dist'],
  },
  // Removed externals to include React and ReactDOM in the bundle
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
      {
        test: /\.module\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /^((?!\.module).)*css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
};
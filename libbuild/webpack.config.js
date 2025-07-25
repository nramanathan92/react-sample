const path = require('path');

module.exports = {
  entry: './libbuild/jswrapper/PLP.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'sf-plp.js',
    library: 'SFplp',
    libraryTarget: 'var',
    globalObject: 'this',
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
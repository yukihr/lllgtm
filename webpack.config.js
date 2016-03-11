var CleanWebpackPlugin = require('clean-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    Crx = require('crx-webpack-plugin'),
    path = require('path');

module.exports = {
  entry: {
    content: './src/content.ts'
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.tsx', '.ts', '.js']
  },
  externals: {
    react: 'React'
  },
  module: {
    loaders: [
      { test: /\.ts(x?)$/, loader: 'ts-loader' }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist', 'build'], {
      verbose: true,
      dry: false
    }),
    new CopyWebpackPlugin([{
      from: './src/config/chrome/manifest.json',
      to: 'manifest.json'
    },{
      from: './src/icons',
      to: 'icons'
    }]),
    new Crx({
      keyFile: './crx.pem',
      contentPath: './build',
      outputPath: './dist',
      name: 'looksgood'
    })
  ]
};

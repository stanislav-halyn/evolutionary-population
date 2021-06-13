const path = require('path');
const merge = require('webpack-merge');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const paths = require('./paths');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',

  optimization: {
    moduleIds: 'hashed',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: paths.assetsFavicon, to: paths.dist, noErrorOnMissing: true },
        { from: paths.assetsManifest, to: paths.dist, noErrorOnMissing: true },
        { from: paths.assetsFonts, to: paths.distFonts, noErrorOnMissing: true },
        { from: paths.assetsImages, to: paths.distImages, noErrorOnMissing: true },
      ],
    }),
  ],
});

var path = require('path');
var webpack = require('webpack');
var ionicWebpackFactory = require(process.env.IONIC_WEBPACK_FACTORY);

var ModuleConcatPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');

var prodPlugins = [];
if (process.env.IONIC_ENV === 'prod') {
  prodPlugins.push(new ModuleConcatPlugin());
}

module.exports = {
  entry: process.env.IONIC_APP_ENTRY_POINT,
  output: {
    path: '{{BUILD}}',
    publicPath: 'build/',
    filename: '[name].js',
    devtoolModuleFilenameTemplate: ionicWebpackFactory.getSourceMapperFunction(),
  },
  devtool: process.env.IONIC_SOURCE_MAP_TYPE,

  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: [path.resolve('node_modules')],
    alias: {
      'api': path.resolve(__dirname, 'api/server')
    }
  },

  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.ts$/,
        loader: process.env.IONIC_WEBPACK_LOADER
      },
      {
        test: /\.js$/,
        loader: process.env.IONIC_WEBPACK_TRANSPILE_LOADER
      }
    ]
  },

  plugins: [
    ionicWebpackFactory.getIonicEnvironmentPlugin(),
    ionicWebpackFactory.getCommonChunksPlugin(),
    new webpack.ProvidePlugin({
      __extends: 'typescript-extends'
    })
  ].concat(prodPlugins),

  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    __dirname: true
  }
};

function resolveExternals(context, request, callback) {
  return resolveMeteor(request, callback) ||
    callback();
}

function resolveMeteor(request, callback) {
  var match = request.match(/^meteor\/(.+)$/);
  var pack = match && match[1];

  if (pack) {
    callback(null, 'Package["' + pack + '"]');
    return true;
  }
}

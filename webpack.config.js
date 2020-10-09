const path = require('path');
const glob = require('glob-all');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const PurgecssPlugin = require('purgecss-webpack-plugin');
const purgecssWordpress = require('purgecss-with-wordpress');
const autoprefixer = require('autoprefixer');

module.exports = (env, argv) => {
  const isProdMode = argv.mode === 'production';
  const PATHS = {
    php: path.join(__dirname, '**/*.php'),
    css: path.join(__dirname, 'src/sass/**/*'),
    js: path.join(__dirname, 'src/js/**/*')
  };
  const extraWordpressClasses = [
    'sub-menu'
  ];

  return {
    context: __dirname,
    entry: {
      index: './src/index.js',
      style: './src/sass/style.scss',
      customizer: './src/js/customizer.js'
    },
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: '[name]-bundle.[contenthash].js',
      sourceMapFilename: '[name].map'
    },
    mode: isProdMode ? 'production' : 'development',
    devtool: 'cheap-source-map',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader'
        },
        {
          test: /\.s?css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [autoprefixer()]
              }
            },
            'sass-loader'
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new FixStyleOnlyEntriesPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css'
      }),
      new PurgecssPlugin({
        paths: glob.sync([PATHS.php, PATHS.js], { nodir: true }),
        safelist: [
          ...purgecssWordpress.safelist,
          ...extraWordpressClasses
        ]
      }),
      new BrowserSyncPlugin({
        files: '**/*.php',
        proxy: 'http://cumberland.test'
      })
    ],
    optimization: {
      minimizer: [
        new UglifyJsPlugin(),
        new OptimizeCssAssetsPlugin({ cssProcessorOptions: { map: { inline: false, annotation: true } } })
      ]
    }
  };
};
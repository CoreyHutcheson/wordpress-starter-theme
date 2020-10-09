const path = require('path');
const glob = require('glob-all');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const PurgecssPlugin = require('purgecss-webpack-plugin');
const purgecssWordpress = require('purgecss-with-wordpress');

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
    devtool: 'source-map',
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
            {
              loader: 'css-loader',
              options: { sourceMap: true }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  // Prefixes CSS
                  require('autoprefixer')([
                    "> 1%",
                    "last 2 versions"
                  ]),
                  // Minifies CSS
                  require('cssnano')({
                    preset: 'default',
                  })
                ],
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: true }
            }
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
      // new PurgecssPlugin({
      //   paths: glob.sync([PATHS.php, PATHS.js], { nodir: true }),
      //   safelist: [
      //     ...purgecssWordpress.safelist,
      //     ...extraWordpressClasses
      //   ]
      // }),
      new BrowserSyncPlugin({
        files: '**/*.php',
        proxy: 'http://cumberland.test'
      })
    ],
    optimization: {
      minimizer: [
        new TerserPlugin({
          extractComments: false
        })
      ]
    }
  };
};

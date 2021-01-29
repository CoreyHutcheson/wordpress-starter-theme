const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");

module.exports = (env, argv) => {
  const isProdMode = argv.mode === 'production';
  const stylesheetName = isProdMode ? '[name].[contenthash].css' : 'style.css';
  const postCssPlugins = [
    // Prefixes CSS
    require('autoprefixer')([
      "> 1%",
      "last 2 versions"
    ]),
    // Minifies CSS
    require('cssnano')({
      preset: 'default',
    })
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
        // Javascript -> Babel Loader
        {
          test: /\.jsx?$/,
          loader: 'babel-loader'
        },
        // SCSS (scss -> resolve-url -> postcss -> css -> extract)
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
              options: { plugins: () => postCssPlugins, sourceMap: true }
            },
            {
              loader: 'resolve-url-loader'
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: true }
            }
          ]
        },
        // Images (Under 10k bytes, data is output. Otherwise image is output to 'public/media')
        {
          test: /\.(png|svg|jpe?g|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
                outputPath: 'media',
                name: '[name].[ext]'
              }
            },
          ],
        },
        // Fonts (Output to 'public/fonts')
        {
          test: /\.(ttf|woff2?|eot)$/,
          use: {
            loader: 'file-loader',
            options: {
              outputPath: 'fonts',
              name: '[name].[ext]'
            }
          },
        },
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new FixStyleOnlyEntriesPlugin(),
      new MiniCssExtractPlugin({
        filename: stylesheetName
      }),
      new BrowserSyncPlugin({
        proxy: 'http://localhost:8080',
        files: ['**/*.php'],
        injectCss: true
      })
    ],
    optimization: {
      minimizer: [
        new TerserPlugin({
          extractComments: false
        })
      ]
    },
    externals: {
      jquery: 'jQuery'
    }
  };
};

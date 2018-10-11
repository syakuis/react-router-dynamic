const path = require('path'); // node.js 내장 패키지
const fs = require('fs');
const glob = require('glob');
const webpack = require('webpack'); // node.js 내장 패키지
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

// data.json 생성하기 위함
/* const componentData = () => {
  const data = glob.sync('./src/*.com.js').reduce((prev, curr) => {
    const name = path.basename(curr, '.js');
    return { ...prev, [name]: curr.replace('./src/', '') };
  }, {});
  fs.writeFile('./src/data.json', JSON.stringify(data));
};

componentData(); */

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: './src/index.js',
  output: {
    libraryTarget: 'umd',
    library: '[name]',
    filename: '[name].js?hash=[hash]',
    path: path.resolve(__dirname, 'dist'),
  },

  externals: {},

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
    new StyleLintPlugin({
      emitErrors: true,
    }),
    new HtmlWebpackPlugin({
      title: 'react',
      filename: 'index.html',
      template: 'src/index.html',
      // excludeAssets: [/layout.css/],
    }),
    new HtmlWebpackExcludeAssetsPlugin(),
    new FileManagerPlugin({
      onStart: {
        delete: [
          path.join(__dirname, 'dist'),
          // path.join(__dirname, 'resources/dist'),
        ],
      },
      // onEnd: {
      //   copy: [
      //     {
      //       source: path.join(__dirname, 'dist'),
      //       destination: path.join(__dirname, 'resources/dist'),
      //     },
      //   ],
      // },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            babelrc: true,
          },
        },
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':data-src'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: '../',
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['file-loader'],
      },

      {
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
              publicPath: '../',
            },
          },
        ],
      },
    ],
  },

  resolve: {
    alias: {
      __dirsrc: path.resolve(__dirname, 'src'),
    },
  },

  devServer: {
    historyApiFallback: true,
    contentBase: 'dist',
  },
};

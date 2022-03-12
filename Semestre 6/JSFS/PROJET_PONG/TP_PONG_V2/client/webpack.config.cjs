const path = require('path');
const webpack = require('webpack');

const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PRODUCTION = false;

module.exports = {
  entry: path.resolve(__dirname, 'src', 'scripts', 'pong.js'),

  output: {
    path: path.resolve(__dirname, (PRODUCTION ? '../server/public/' : 'dist')),
    filename: 'scripts/bundle.js'
  },

  mode :  (PRODUCTION ? 'production' : 'development'),
  devtool : (PRODUCTION ? undefined : 'eval-source-map'),

  devServer: {
      static: {
	       publicPath: path.resolve(__dirname, 'dist'),
	       watch : true
      },
      host : 'localhost',
      port : 8000,
      open : true
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)/i,
        use: {
          loader: 'file-loader',
          options: {
            name : '[name].[ext]',
            outputPath : 'images'
          }
        }
      }
    ]
  },

  plugins: [
      new webpack.ProgressPlugin(),
      new HtmlWebpackPlugin({
	       template: path.resolve(__dirname,'src', 'index.html'),
	        filename: './index.html',
	        hash: true,
      }),
      new CopyPlugin({
          patterns: [
            {    // décommenter ce bloc pour copier les fichiers de src/html dans dist/html
              context: path.resolve(__dirname, 'src', 'html'),
              from: "**/*.html",
              to:  'html',
              noErrorOnMissing: true,
              globOptions: { }
            },
            {      // décommenter ce bloc pour copier les fichiers de src/images dans dist/images
              context: path.resolve(__dirname, 'src','images'),
              from: '**/*',
              to:  'images/[name][ext]',
              noErrorOnMissing: true,
            },
            {
             context: path.resolve(__dirname, 'src', 'style'),
             from: '**/*.css',
             to:  'style/[name][ext]',
	           noErrorOnMissing: true,
           },
         ]
       }),
     ],


  /* en cas de gestion de bibliothèques externes à exclure du buncle, ici cas de React pour l'exemple
  externals : {
    react: 'React',
    react-dom: 'ReactDom',
  },
  */

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  }
}

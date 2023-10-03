import miniCssExtract from 'mini-css-extract-plugin';
import terserWebpack from 'terser-webpack-plugin';

import { IMAGES_SRC } from './routes';

const WEBPACK_CONFIG_JS = {
  mode: 'production',
  cache: true,
  stats: {
    entrypoints: false,
    children: false
  },
  optimization: {
    minimizer: [
      new terserWebpack({
        parallel: true,
        terserOptions: {
          ecma: 8,
          compress: { warnings: false },
          output: {
            comments: false,
            beautify: false
          }
        }
      })
    ]
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader?cacheDirectory',
            options: {
              presets: ['@babel/env']
            }
          }
        ]
      }
    ]
  }
};

const WEBPACK_CONFIG_CSS = {
  mode: 'production',
  cache: {
    type: 'memory'
  },
  stats: {
    entrypoints: false,
    children: false
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  plugins: [
    new miniCssExtract({
      filename: '[name].css',
      chunkFilename: '[id].css',
      allChunks: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          miniCssExtract.loader,
          {
            loader: 'fast-css-loader',
            options: {
              importLoaders: 1,
              sourcemap: false,
              url: false
            }
          },
          {
            loader: 'fast-sass-loader',
            options: {
              imagePath: IMAGES_SRC
            }
          },
          'postcss-loader'
        ]
      }
    ]
  }
};

export { WEBPACK_CONFIG_CSS, WEBPACK_CONFIG_JS };

const resolve = require('./resolve');
const MinifyCssIdentsPlugin = require("minify-css-idents");

module.exports = function webpackLoaders(cssLoaders = ['style-loader'], cssOptions = {}) {
  return [
    {
      test: /\.[jt]sx?$/,
      exclude: /node_modules|dist-*/,
      use: 'babel-loader',
    },
    {
      test: /\.md$/,
      use: ['raw-loader'],
    },
    {
      test: /\.s?css$/,
      use: [
        ...cssLoaders,
        {
          loader: 'minify-css-idents/css-loader',
          options: {
            importLoaders: 2,
            url: false,
            ...cssOptions,
            modules: {
              auto: /\.scss$/,
              exportLocalsConvention: 'camelCase',
              localIdentName: '[path]___[name]__[local]',
              namedExport: false,
              ...cssOptions.modules,
            },
          },
        },
        'postcss-loader',
        {
          loader: 'sass-loader',
          options: {
            sassOptions: {
              indentWidth: 2,
              includePaths: [resolve('src/gui/assets/scss')],
            },
          },
        },
      ],
    },
    {
      test: /\.(jpe?g|png|gif)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            hash: 'sha512',
            digest: 'hex',
            name: 'img/[hash].[ext]',
          },
        },
        {
          loader: 'image-webpack-loader',
          options: {
            bypassOnDebug: true,
            optipng: { optimizationLevel: 7 },
            gifsicle: { interlaced: false },
          },
        },
      ],
    },
    {
      test: /\.svg$/,
      use: [{
        loader: '@svgr/webpack',
        options: {
          svgoConfig: {
            plugins: [
              {
                name: 'preset-default',
                params: {
                  overrides: {
                    // viewBox is required to resize SVGs with CSS.
                    // @see https://github.com/svg/svgo/issues/1128
                    removeViewBox: false,
                  },
                },
              },
            ],
          },
        },
      }],
    },
    {
      test: /\.(woff|woff2|eot|ttf)$/,
      loader: 'file-loader',
      options: {
        name: 'fonts/[name].[ext]',
      },
    },
  ]
};
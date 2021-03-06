const webpack = require('webpack');

module.exports = {
  chainWebpack: config => {
    // package.json scripts set process.env.NODE_ENV as needed.
    // If NODE_ENV is undefined, set to development here.
    process.env.NODE_ENV = process.env.NODE_ENV || 'development';
    if (process.env.NODE_ENV === 'test') {
      require('dotenv').config({ path: '.env.test'});
    } else if (process.env.NODE_ENV === 'development') {
      require('dotenv').config({ path: '.env.development'});
    } else if (process.env.NODE_ENV === 'production') {
      require('dotenv').config({ path: '.env.production'});
    }
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(ttf|eot|woff|woff2)(#iconic-sm)?$/,
          use: {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
            },
          },
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
        'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
        'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
        'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
        'process.env.FIREBASE_AUTH_STATE_PERSISTENCE': JSON.stringify(process.env.FIREBASE_AUTH_STATE_PERSISTENCE)
      })
    ]
  }
}

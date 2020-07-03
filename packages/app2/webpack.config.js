const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    module: {
        rules: [
            {
              test: /\.jsx?$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-react'],
                },
              },
            },
        ],
    },
    // devServer: {
    //     contentBase: join(__dirname,'dist'),
    //     port: 3002
    // },
    output: {
        publicPath: 'http://localhost:3002/',
      },
    plugins: [
        new ModuleFederationPlugin({
            name: 'app2',
            library: {type: 'var',name: 'app2'},
            exposes: {
                "./Button": "./src/Button"
            },
            filename: 'remoteEntry.js',
            shared: {
                react: {
                    eager: true,
                    singleton: true,
                },
                'react-dom': {
                    eager: true,
                    singleton: true,
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}



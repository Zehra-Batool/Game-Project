const path = require('path');
import * as webpack from 'webpack';

const config: webpack.Configuration = {
    entry: "./src/app.ts",
    devtool: "eval-source-map",
    mode: "development",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "public")
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    }
};
export default config;

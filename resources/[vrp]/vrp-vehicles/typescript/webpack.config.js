const path = require('path');
const WebpackObfuscator = require('webpack-obfuscator');

const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const smp = new SpeedMeasurePlugin();

const buildPath = path.join(__dirname, '../');

const server = smp.wrap({
    entry: ['./src/server/server.ts'],
    output: {
        path: path.resolve(buildPath, 'server'),
        filename: 'server.js',
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['ts-loader'],
                exclude: /node_modules/,
            },
        ]
    },
    plugins: [
        new WebpackObfuscator({
            compact: true,
            debugProtection: false,
            debugProtectionInterval: false,
            disableConsoleOutput: false,
            identifierNamesGenerator: 'hexadecimal',
            log: false,
            numbersToExpressions: true,
            renameGlobals: false,
            selfDefending: true,
            simplify: true,
            splitStrings: true,
            splitStringsChunkLength: 5,
            stringArray: true,
            stringArrayCallsTransform: true,
            stringArrayCallsTransformThreshold: 1,
            stringArrayEncoding: ['rc4'],
            stringArrayIndexShift: true,
            stringArrayRotate: true,
            stringArrayShuffle: true,
            stringArrayWrappersCount: 10, //15 //10
            stringArrayWrappersChainedCalls: true,
            stringArrayWrappersParametersMaxCount: 15, //15 //10
            stringArrayWrappersType: 'function',
            stringArrayThreshold: 1,
            transformObjectKeys: false,
            unicodeEscapeSequence: false
        })
    ],
    optimization: {
        minimize: true
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    target: "node"
});

const client = smp.wrap({
    entry: ['./src/client/client.ts'],
    output: {
        path: path.resolve(buildPath, 'client'),
        filename: 'client.js',
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['ts-loader'],
                exclude: /node_modules/,
            }
        ]
    },
    plugins: [
        new WebpackObfuscator({
            compact: true,
            debugProtection: false,
            debugProtectionInterval: false,
            disableConsoleOutput: false,
            identifierNamesGenerator: 'hexadecimal',
            log: false,
            numbersToExpressions: true,
            renameGlobals: false,
            selfDefending: true,
            simplify: true,
            splitStrings: true,
            splitStringsChunkLength: 5,
            stringArray: true,
            stringArrayCallsTransform: true,
            stringArrayCallsTransformThreshold: 1,
            stringArrayEncoding: ['rc4'],
            stringArrayIndexShift: true,
            stringArrayRotate: true,
            stringArrayShuffle: true,
            stringArrayWrappersCount: 10, //15 //10
            stringArrayWrappersChainedCalls: true,
            stringArrayWrappersParametersMaxCount: 15, //15 //10
            stringArrayWrappersType: 'function',
            stringArrayThreshold: 1,
            transformObjectKeys: true,
            unicodeEscapeSequence: false
        })
    ],
    optimization: {
        minimize: false
    },
    resolve: {
        extensions: ['.ts', '.js'],
    }
});

module.exports = [server, client];
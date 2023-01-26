const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',

    entry: {
        indexPage: './src/pages/index.tsx',
        aboutPage: './src/pages/about.tsx',
        loginPage: './src/pages/login.tsx',
        registerPage: './src/pages/register.tsx',
        musicBrowserPage: './src/pages/musicBrowser.tsx',
        musicUploadPage: './src/pages/musicUpload.tsx',
        musicApprovePage: './src/pages/musicApprove.tsx',

        profileOverviewPage: './src/pages/profileOverview.tsx',

        frontendRouter: './src/pages/frontend-router.ts',
        
        notFound: './src/pages/notFound.tsx',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },

    module: {
        rules: [
            {
                test: /\.(ts|tsx|)$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /.css$/,
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'file-loader',
                options: {
                    mimetype: 'image/jpg',
                    limit: 1 * 1024,
                },
            },
            {
                test: /\.wav$/,
                // include: SRC,
                loader: 'file-loader'
              }
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/lang', to: 'lang/' }
            ]
        }),
        new HtmlWebpackPlugin({
            title: "Melody Bits",
            inject: true,
            filename: 'index.html',
            chunks: ['indexPage']
        }),
        new HtmlWebpackPlugin({
            title: "Melody Bits",
            inject: true,
            filename: 'about.html',
            chunks: ['aboutPage']
        }),
        new HtmlWebpackPlugin({
            title: "Melody Bits",
            inject: true,
            filename: 'login.html',
            chunks: ['loginPage']
        }),
        new HtmlWebpackPlugin({
            title: "Melody Bits",
            inject: true,
            filename: 'register.html',
            chunks: ['registerPage']
        }),
        new HtmlWebpackPlugin({
            title: "Melody Bits",
            inject: true,
            filename: 'music-browser.html',
            chunks: ['musicBrowserPage']
        }),
        new HtmlWebpackPlugin({
            title: "Melody Bits",
            inject: true,
            filename: 'music-upload.html',
            chunks: ['musicUploadPage']
        }),
        new HtmlWebpackPlugin({
            title: "Melody Bits",
            inject: true,
            filename: 'music-approve.html',
            chunks: ['musicApprovePage']
        }),
        new HtmlWebpackPlugin({
            title: "Melody Bits",
            inject: true,
            filename: 'profile-overview.html',
            chunks: ['profileOverviewPage']
        }),
        new HtmlWebpackPlugin({
            title: "Melody Bits",
            inject: true,
            filename: 'frontend-router.html',
            chunks: ['frontendRouter']
        }),
    ],

    resolve: {
        extensions: ['.ts', '.js', '.tsx']
    }
}
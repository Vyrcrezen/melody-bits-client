const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin');
// const CompressionPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
    // mode: 'development',
    // devtool: 'inline-source-map',
    // mode: 'production',

    entry: {
        indexPage: './src/pages/index.tsx',
        aboutPage: './src/pages/about.tsx',
        loginPage: './src/pages/login.tsx',
        registerPage: './src/pages/register.tsx',
        musicBrowserPage: './src/pages/musicBrowser.tsx',
        musicUploadPage: './src/pages/musicUpload.tsx',
        musicEditPage: './src/pages/mainMusicEdit.tsx',
        musicApprovePage: './src/pages/musicApprove.tsx',

        profileOverviewPage: './src/pages/profileOverview.tsx',
        profileSubmissionsPage: './src/pages/mainProfileSubmissions.tsx',

        privacyPolicyPage: './src/pages/privacyPolicy.tsx',
        termsAndRulesPage: './src/pages/termsAndRules.tsx',

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
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
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
              },
              {
                test: /\.md$/,
                use: 'raw-loader'
              }
        ]
    },

    // optimization: {
    //     minimize: true,
    //     minimizer: [new TerserPlugin()],
    //   },
      
    plugins: [
        // new BundleAnalyzerPlugin(),

        // new CompressionPlugin({
        //     test: /\.(js)$/,
        //     filename: '[path][base].gz',
        //     algorithm: 'gzip',
        //   }),

        new CopyWebpackPlugin({
            patterns: [
                { from: './src/lang', to: 'lang/' }
            ]
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/media', to: 'media/' }
            ]
        }),
        // new CopyWebpackPlugin({
        //     patterns: [
        //         { from: './src/braun', to: 'braun/' }
        //     ]
        // }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/char', to: 'char/' }
            ]
        }),
        new HtmlWebpackPlugin({
            title: "Melody Bits",
            inject: true,
            minify: true,
            filename: 'index.html',
            chunks: ['indexPage']
        }),
        new HtmlWebpackPlugin({
            title: "Melody Bits",
            inject: true,
            minify: true,
            filename: 'about.html',
            chunks: ['aboutPage']
        }),
        new HtmlWebpackPlugin({
            title: "Melody Bits",
            inject: true,
            minify: true,
            filename: 'login.html',
            chunks: ['loginPage']
        }),
        new HtmlWebpackPlugin({
            title: "Melody Bits",
            inject: true,
            minify: true,
            filename: 'register.html',
            chunks: ['registerPage']
        }),
        new HtmlWebpackPlugin({
            title: "Melody Bits",
            inject: true,
            minify: true,
            filename: 'music-browser.html',
            chunks: ['musicBrowserPage']
        }),
        new HtmlWebpackPlugin({
            title: "Melody Bits",
            inject: true,
            minify: true,
            filename: 'music-upload.html',
            chunks: ['musicUploadPage']
        }),
        new HtmlWebpackPlugin({
            title: "Melody Bits",
            inject: true,
            minify: true,
            filename: 'music-edit.html',
            chunks: ['musicEditPage']
        }),
        new HtmlWebpackPlugin({
            title: "Melody Bits",
            inject: true,
            minify: true,
            filename: 'music-approve.html',
            chunks: ['musicApprovePage']
        }),
        new HtmlWebpackPlugin({
            title: "Melody Bits",
            inject: true,
            minify: true,
            filename: 'profile-overview.html',
            chunks: ['profileOverviewPage']
        }),
        new HtmlWebpackPlugin({
            title: "Melody Bits",
            inject: true,
            minify: true,
            filename: 'profile-submissions.html',
            chunks: ['profileSubmissionsPage']
        }),
        new HtmlWebpackPlugin({
            title: "Melody Bits",
            inject: true,
            minify: true,
            filename: 'frontend-router.html',
            chunks: ['frontendRouter']
        }),
    ],

    resolve: {
        extensions: ['.ts', '.js', '.tsx']
    },
}
var ExtractTextPlugin = require ("extract-text-webpack-plugin");
const path = require('path');

module.exports = {    
    entry: "./init.js",
    output: {
        filename: "tabs.js",
        path: path.resolve(__dirname, "dist"),
    },

    // Enable sourcemaps for debugging webpack"s output.
    devtool: "source-map",

    resolve: {
        extensions: [".webpack.js", ".web.js", ".js", ".jsx"],
        alias: {        
            lib: path.resolve(__dirname, "src/lib/"),            
        },
    },

    module: {
        rules: [
            {
                test: /.jsx?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: ["es2015"]
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader",                    
                }),
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            hash: "sha512",
                            digest: "hex",
                            name: "[hash].[ext]",
                        }
                    },
                    {
                        loader: "image-webpack-loader",
                        options: {
                            bypassOnDebug: true,                            
                        }
                    }
                ],
                // loaders: [
                //     "file?hash=sha512&digest=hex&name=[hash].[ext]",
                //     "image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false"
                // ]
            },
        ],               
    },

    externals: {
        // "react": "React",
        // "react-dom": "ReactDOM",        
    },

    plugins: [   
        new ExtractTextPlugin("tabs.css")
    ]
};
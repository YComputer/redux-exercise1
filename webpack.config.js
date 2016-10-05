module.exports = {
    entry: "./index-2.js",
    output: {
        filename: "bundle.js"
    },
    module: {
        loaders:[
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query:{
                    presets: ['react', 'es2015', 'stage-2']
                }
            }
        ]
    }
}

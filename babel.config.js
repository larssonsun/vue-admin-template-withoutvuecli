module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                targets: {
                    /*
                        > 1% # 全球使用情况统计选择的浏览器版本
                        last 2 version # 每个浏览器的最后两个版本
                        not ie <= 8 # 排除小于 ie8 以下的浏览器
                     */
                    "browsers": ["> 1%", "last 2 versions", "not ie <= 8"], // vue-cli中生成的也是如此
                    "node": "current"
                },
                "useBuiltIns": "usage",
                "corejs": 3
            }
        ],
        "@vue/babel-preset-jsx"
    ],
    plugins: [
        "@babel/plugin-transform-runtime"
    ]
}
const autoprefixer = require('autoprefixer'); // https://github.com/postcss/autoprefixer
const presetEnv = require('postcss-preset-env'); // https://github.com/csstools/postcss-preset-env
const precss = require('precss'); // https://github.com/jonathantneal/precss
const cssnano = require('cssnano'); // https://cssnano.co/docs/getting-started
const postcssLiquid = require('postcss-shopify-settings-variables'); // https://github.com/bit3725/postcss-shopify-settings-variables


module.exports = {
    plugins: [
        autoprefixer,
        presetEnv,
        precss,
        cssnano({preset: 'default'}),
        postcssLiquid,
    ]
}
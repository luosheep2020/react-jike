// eslint-disable-next-line no-undef
const path = require('path')

// eslint-disable-next-line no-undef
module.exports = {
    devServer: {
        port: 3006
    },
    webpack: {
        alias: {
            // eslint-disable-next-line no-undef
            '@': path.resolve(__dirname, 'src')
        }
    }
}
const path = require('path');

module.exports = {
    webpack: {
        alias: {
            "@components": path.resolve(__dirname, 'src/UI/components/Features/Characters'),
            "@helperComponents": path.resolve(__dirname, 'src/UI/HelperComponents'),
            "@services": path.resolve(__dirname, 'src/services'),
        }
    }
};
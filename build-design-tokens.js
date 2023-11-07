const { registerTransforms } = require('@tokens-studio/sd-transforms');
const StyleDictionary = require('style-dictionary');

registerTransforms(StyleDictionary);
// create a funcion
function getStyleDictionaryConfig(brand) {
    return {
        source: [
            `${__dirname}/tokens/literal/${brand}/**/*.json`,
            `${__dirname}/tokens/alias/${brand}/**/*.json`
        ],
        platforms: {
            json: {
                transformGroup: 'tokens-studio',
                buildPath: './',
                files: [
                    {
                        'destination': `${brand}-tokens.json`,
                        'format': 'json'
                    },
                ],
            },
        }
    };

};

['brand-one', 'brand-two'].map(function (brand) {
    // let dir = `${__dirname}/alias/${brand}`;
    // const aliases = readdirSync(dir);

    console.log('\n==============================================');
    console.log(`\nProcessing: [${brand}]`);

    // const StyleDictionary = StyleDictionaryPackage.extend(getStyleDictionaryConfig(brand, aliases));
    const brands = StyleDictionary.extend(getStyleDictionaryConfig(brand));
    brands.buildAllPlatforms();

    console.log('\nEnd processing');
    // StyleDictionary.buildPlatform(brand);
});

const { transform } = require('@divriots/style-dictionary-to-figma');
const StyleDictionary = require('style-dictionary');


console.log(__dirname);
StyleDictionary.registerFormat({
    name: 'figmaTokensPlugin',
    formatter: ({ dictionary }) => {
        const transformedTokens = transform(dictionary.tokens);
        return JSON.stringify(transformedTokens, null, 2);
    },
});
// create a funcion
function getStyleDictionaryConfig() {
    return {
        include: [`${__dirname}/tokens/literal/**/*.json`],
        source: [
            `${__dirname}/tokens/alias/**/*.json`
        ],
        format: {
            figmaTokensPlugin: ({ dictionary }) => {
                const transformedTokens = transform(dictionary.tokens);
                return JSON.stringify(transformedTokens, null, 2);
            },
        },
        platforms: {
            json: {
                transformGroup: 'js',
                buildPath: './',
                files: [
                    {
                        'destination': 'tokens.json',
                        'format': 'figmaTokensPlugin'
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
    const brands = StyleDictionary.extend(getStyleDictionaryConfig());
    brands.buildAllPlatforms();

    console.log('\nEnd processing');
    // StyleDictionary.buildPlatform(brand);
});

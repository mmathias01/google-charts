// eslint-disable-next-line no-undef
require('@babel/register')({
    babelrc: false,
    presets: [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'usage',
                targets: {
                    node: true,
                },
            },
        ],
    ],
})

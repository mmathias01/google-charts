/* globals process */
module.exports = wallaby => {
    return {
        files: [
            'src/*.js',
            'src/**/*.js',
        ],
        tests: ['test/*.spec.js'],
        env: {
            type: 'node',
            runner: 'node',
        },
        compilers: {
            '**/*.js': wallaby.compilers.babel({
                "babelrc": false,
                "presets": [
                    [
                      "@babel/preset-env",
                      {
                        "useBuiltIns": "usage",
                        "targets": {
                            "node": true
                          }
                      }
                    ]
                  ]
            }),
        },
        debug: true
    }
}

module.exports = {
    extends: 'stylelint-config-suitcss',
    rules: {
        indentation: 4,
        'number-leading-zero': null,
        'string-quotes': 'single',
        'order/properties-alphabetical-order': null,
        'at-rule-empty-line-before': [
            'always',
            {
                except: ['blockless-after-blockless', 'first-nested'],
            },
        ],
    },
};

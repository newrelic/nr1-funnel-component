'use strict';

module.exports = {
    parser: 'babel-eslint',
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        jest: true
    },
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
            experimentalObjectRestSpread: true
        }
    },
    plugins: ['react', 'import'],
    rules: {
        'no-debugger': ['error'],
        'no-console': ['error', { allow: ['warn', 'error'] }],
        'no-func-assign': ['error'],
        'no-nested-ternary': ['error'],
        'no-irregular-whitespace': ['error'],
        'no-unused-vars': ['error', {
            ignoreRestSiblings: true
        }],
        curly: ['error'],
        'dot-notation': ['error'],
        'array-bracket-spacing': ['error', 'never'],
        'no-sparse-arrays': ['error'],
        'block-spacing': ['error', 'always'],
        'brace-style': ['error', '1tbs'],
        'capitalized-comments': ['off'],
        'comma-dangle': ['error', {
            arrays: 'always-multiline',
            objects: 'always-multiline',
            imports: 'always-multiline',
            exports: 'always-multiline',
            functions: 'never'
        }],
        'comma-spacing': ['error', {
            before: false,
            after: true
        }],
        'comma-style': ['error', 'last'],
        'computed-property-spacing': ['error', 'never'],
        'eol-last': ['error', 'always'],
        'func-call-spacing': ['error', 'never'],
        indent: ['error', 4],
        'jsx-quotes': ['error', 'prefer-double'],
        'key-spacing': ['error', {
            beforeColon: false,
            afterColon: true
        }],
        'keyword-spacing': ['error', {
            before: true
        }],
        'linebreak-style': ['error', 'unix'],
        'new-parens': ['error'],
        'no-undef': ['error'],
        'no-unneeded-ternary': ['error'],
        'no-whitespace-before-property': ['error'],
        'object-curly-newline': ['error', {
            multiline: true,
            consistent: true
        }],
        'object-property-newline': ['error'],
        'object-curly-spacing': ['error', 'always'],
        'operator-linebreak': ['error', 'after', {
            overrides: {
                '?': 'before',
                ':': 'before'
            }
        }],
        'padded-blocks': ['error', {
            classes: 'always',
            blocks: 'never',
            switches: 'never'
        }],
        'padding-line-between-statements': ['error', {
            blankLine: 'always',
            prev: '*',
            next: 'return'
        }, {
            blankLine: 'always',
            prev: '*',
            next: 'throw'
        }, {
            blankLine: 'always',
            prev: '*',
            next: 'try'
        }, {
            blankLine: 'always',
            prev: '*',
            next: 'switch'
        }, {
            blankLine: 'always',
            prev: 'switch',
            next: '*'
        }, {
            blankLine: 'always',
            prev: 'directive',
            next: '*'
        }, {
            blankLine: 'always',
            prev: '*',
            next: 'block-like'
        }, {
            blankLine: 'always',
            prev: 'block-like',
            next: '*'
        }, {
            blankLine: 'always',
            prev: '*',
            next: 'class'
        }],
        quotes: ['error', 'single'],
        'quote-props': ['error', 'consistent'],
        semi: ['error', 'always'],
        'semi-spacing': ['error'],
        'space-before-blocks': ['error', 'always'],
        'space-before-function-paren': ['error', {
            anonymous: 'always',
            named: 'never',
            asyncArrow: 'always'
        }],
        'no-var': ['error'],
        'space-in-parens': ['error', 'never'],
        'space-infix-ops': ['error'],
        'space-unary-ops': ['error', {
            words: true,
            nonwords: false
        }],
        'switch-colon-spacing': ['error'],
        'template-tag-spacing': ['error', 'never'],
        'arrow-parens': ['error', 'always'],
        'arrow-spacing': ['error', {
            before: true,
            after: true
        }],
        'no-confusing-arrow': ['warn'],
        'no-useless-computed-key': ['error'],
        'object-shorthand': ['error', 'always'],
        'prefer-const': ['error'],
        'prefer-template': ['error'],
        'rest-spread-spacing': ['error', 'never'],
        'sort-imports': ['off'],
        'template-curly-spacing': ['error', 'never'],
        'no-bitwise': ['error'],
        'no-new-object': ['error'],
        'no-array-constructor': ['error'],
        'prefer-arrow-callback': ['error'],
        'no-useless-constructor': ['error'],
        'no-duplicate-imports': ['error'],
        'one-var': ['error', 'never'],
        'no-case-declarations': ['error'],
        'no-else-return': ['error'],
        'spaced-comment': ['error', 'always', { exceptions: ['*'] }],
        'no-new-wrappers': ['error'],
        radix: ['error'],
        'no-dupe-class-members': ['error'],

        'import/no-useless-path-segments': ['error'],

        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error'
    },
    globals: {
        process: true,
        __dirname: true,
        __nr: true
    }
};
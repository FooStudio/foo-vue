module.exports = {
    root: true,
    parser: 'babel-eslint',
    extends: 'standard',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
    },
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    'globals': {
        'App': true,
        'document': true,
        'window': true,
        'TweenMax': true,
        'TweenLite': true,
        'TimelineMax': true,
        'Sine': true,
        'Power1': true,
        'Power2': true,
        'Power3': true,
        'Power4': true,
        'Back': true,
        'Elastic': true,
        'Linear': true,
        'FB': true,
        'twttr': true,
        'gapi': true,
        'requestAnimationFrame': true
    },
    // add your custom rules here
    'rules': {
        'comma-dangle': ['off'],
        'no-unused-vars': ['warn'],
        'no-undef': ['warn'],
        'quotes': ['off'],
        'no-console': ['off'],
        'max-len': ['off'],
        'semi': ['warn', 'always'],
        'space-before-blocks': ['off'],
        'space-before-function-paren': ['off'],
        'camelcase': ['warn'],
        'comma-style': ['warn', 'last'],
        'spaced-comment': ['off'],
        'indent': [1, 4, {'SwitchCase': 1}],
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    }
};

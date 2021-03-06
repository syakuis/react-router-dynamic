module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  parser: 'babel-eslint',
  extends: [
    'airbnb',
    'prettier',
  ],
  plugins: [
    'prettier',
    'react',
    'jsx-a11y',
  ],
  settings: {
    'import/resolver': 'webpack',
    'import/parser': 'babel-eslint',
  },
  rules: {
    'prettier/prettier': ['error'],
    'import/no-unresolved': [2, { commonjs: false }],
    'import/extensions': ['error', 'never', { packages: 'always' }],
    'import/no-extraneous-dependencies': 'off',
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx'] }
    ],

    'jsx-a11y/label-has-for': [
      2,
      {
        components: ['Label'],
        required: {
          some: ['nesting', 'id']
        },
        allowChildren: true
      }
    ],
    'jsx-a11y/click-events-have-key-events': [0],
    'jsx-a11y/mouse-events-have-key-events': [0],
    'jsx-a11y/anchor-is-valid': ['error', {
      components: ['Link'],
      specialLink: ['to', 'hrefLeft', 'hrefRight'],
      aspects: ['invalidHref',]
    }],
  },
}

module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-tailwindcss', 'stylelint-config-prettier-scss'],
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind'],
      },
    ],
    'selector-class-pattern': null,
    'scss/dollar-variable-pattern': null,
    'custom-property-empty-line-before': null,
    'color-function-notation': null,
    'color-function-alias-notation': null,
    'alpha-value-notation': null,
    'color-hex-length': null,
    'value-keyword-case': null,
    'font-family-name-quotes': null,
  },
}

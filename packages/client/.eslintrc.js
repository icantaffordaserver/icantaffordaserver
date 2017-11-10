module.exports = {
  parser: 'babel-eslint',
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'prettier',
    'prettier/react',
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
}

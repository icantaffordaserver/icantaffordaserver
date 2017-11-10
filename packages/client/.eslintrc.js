module.exports = {
  parser: 'babel-eslint',
  extends: [
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

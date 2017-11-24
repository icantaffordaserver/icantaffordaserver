module.exports = {
  parser: 'babel-eslint',
  extends: [
    'react-app',
    'plugin:import/errors',
    'plugin:import/warnings',
    'prettier',
    'prettier/react',
  ],
  plugins: ['json', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
}

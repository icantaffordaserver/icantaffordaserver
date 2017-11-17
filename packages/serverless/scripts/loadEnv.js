import yaml from 'js-yaml'
import fs from 'fs'

// loads the environment configuration from env.yml
const loadEnv = () => {
  // get the database env config
  const envConfig = yaml.safeLoad(
    fs.readFileSync(`${__dirname}/../env.yml`, 'utf8'),
  )

  if (!envConfig.dev.GRAPHCOOL_SIMPLE_ENDPOINT) {
    console.error(
      'Please make sure you have set your environment variables in env.yml',
    )
  }
  Object.keys(envConfig.dev).map(key => (process.env[key] = envConfig.dev[key]))
}
loadEnv()
export default loadEnv

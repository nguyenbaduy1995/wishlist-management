'use strict'

const path = require('path')
const dotenv = require('dotenv')
const dotEnvPath = path.resolve(`./.env${process.env.NODE_ENV === 'test' ? '.test' : ''}`)
dotenv.config({
  path: dotEnvPath
})

const dbConfig = {
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'patient',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'postgres',
  logging: false
}

module.exports = {
  development: dbConfig,
  test: dbConfig,
  staging: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    logging: false
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    logging: false
  }
}

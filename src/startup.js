import {
  resolve
} from 'path'
import dotenv from 'dotenv'

const dotEnvPath = resolve(`./.env${process.env.NODE_ENV === 'test' ? '.test' : ''}`)
dotenv.config({
  path: dotEnvPath
})

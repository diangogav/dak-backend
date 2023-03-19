import dotenv from 'dotenv'
dotenv.config()

if (!process.env.MONGO_URL) { throw new Error('MONGO_URL not set') }

const config = {
  MONGO_URL: process.env.MONGO_URL,
  PORT: process.env.PORT || 3977
}

export { config }
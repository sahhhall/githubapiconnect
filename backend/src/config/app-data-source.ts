import { DataSource } from 'typeorm'
import 'dotenv/config'

const myDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST as string,
  port: parseInt(process.env.DB_PORT as string) || 5432,
  username: process.env.DB_USERNAME as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string,
  logging: true,
  synchronize: process.env.NODE_ENV !== 'production'
})

const connectDB = async () => {
  try {
    await myDataSource.initialize()
    console.log('Connected to PostgreSQL database')
    return myDataSource
  } catch (error) {
    console.error('Database connection failed:', error)
    throw error
  }
}

export { connectDB, myDataSource }

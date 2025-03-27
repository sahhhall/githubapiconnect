import { DataSource } from 'typeorm'
import 'dotenv/config'
import { User } from '../entities/user.entity'
import { Friend } from '../entities/friend.entity'
import { DatabaseConnectionError } from '../utills/errors'

const myDataSource = new DataSource({
  type: 'postgres',
  host: process.env.PGHOST,
  port: parseInt(process.env.PGPORT || '5432'),
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  logging: process.env.NODE_ENV !== 'production',
  entities: [User, Friend],
  synchronize: process.env.NODE_ENV !== 'production',
  ssl: {
    rejectUnauthorized: false
  }
})

const connectDB = async () => {
  try {
    await myDataSource.initialize()
    console.log('Connected to PostgreSQL database')
    return myDataSource
  } catch (error) {
    throw new DatabaseConnectionError()
  }
}

export { connectDB, myDataSource }

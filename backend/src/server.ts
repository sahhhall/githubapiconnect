import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { config } from 'dotenv'
import { connectDB } from './config/app-data-source'

const app = express()
const port = process.env.PORT || 3000

config()
connectDB()

app.use(morgan('dev'))
app.use(express.json())
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  })
)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

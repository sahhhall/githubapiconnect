import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import 'express-async-errors';
import { config } from 'dotenv'
import { connectDB } from './config/app-data-source'
import userRoutes from './routes/user.routes'
import { errorHandler } from './utills/errors/handler'
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


app.use('/api/users', userRoutes)


app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

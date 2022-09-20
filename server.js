import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import workoutRoutes from './routes/workoutRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

// routing

app.use((req, res, next) => {
    console.log(req.path, req.method);

    next()
})

app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// routing

const port = process.env.PORT || 5000
app.listen(port)

mongoose.connect('mongodb+srv://websitetemplate:websitetemplate@websitetemplate.pox9jrl.mongodb.net/?retryWrites=true&w=majority')
.then(() => console.log(`Server is running on port ${port}`))
.catch((err) => console.log(err))
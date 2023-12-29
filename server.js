import dotenv from 'dotenv';
import express from 'express';
import connect from './config/mongooseConnection.js';
import router from './routes/index.js';
dotenv.config()


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', router)
connect()
const port = process.env.PORT
app.listen(port, () => {
    console.log(`Charlotte is running on ${port}`)
})




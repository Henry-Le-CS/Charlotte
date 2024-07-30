import compression from 'compression';
import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import router from './routes/index.js';

const app = express()
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', router)

// init mongodb
import './config/mongooseConnection.js';
import CheckConnection from './helper/check.connect.js';
CheckConnection.checkOverLoads()
const port = process.env.PORT
app.listen(port, () => {
    console.log(`Charlotte is running on ${port}`)
})




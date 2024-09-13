import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import multer from 'multer';
const app = express();

// CORS configuration
var corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ['Content-Type', 'Authorization', 'ngrok-skip-browser-warning'] 
};
// Apply CORS middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
const upload = multer();
app.use(upload.none());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, ngrok-skip-browser-warning');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use(cookieParser())

// Init other middleware
app.use(morgan('common'));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Init database
import './dps/init.mongodb.js';

// Import and init routes
import router from './routes/index.js';
app.use('/', router);

// Handling errors for 404
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// Global error handler
app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        stack: error.stack,
        message: error.message || 'Internal Server Error'
    });
});

export default app;

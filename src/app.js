import express from "express";
import morgan from "morgan";

import apiRoutes from './routes/data.routes.js';

// Initializations
const app = express();

// Settings
app.set('json spaces', 2);

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

// Global Variables

// Public

// Routes
app.use('/api', apiRoutes);


// Not Defined routes
app.use((req, res, next) => {
    res.status(404).json({
        message: "Endpoint not found"
    })
});


export default app;
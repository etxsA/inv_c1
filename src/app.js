import express from "express";
import exphbs from "express-handlebars";

import morgan from "morgan";

import path from "path";
import { fileURLToPath } from "url";

import apiRoutes from './routes/data.routes.js';
import appRoutes from './routes/app.routes.js';
import helpers from "./libs/handlebars.js";

// Initializations
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Settings
app.set('json spaces', 2);
app.set('views', path.join(__dirname, 'views'));

// Render Engine
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: helpers
}));
app.set('view engine', '.hbs');



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
app.use((req, res, next) => {
    app.locals.user = req.user;
    next()
});

// Public
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', apiRoutes); // API
app.use('/app', appRoutes);

// Default Route
app.use("*", (req, res) => {
    res.status(404).json({message: "Not Found"});
});


export default app;
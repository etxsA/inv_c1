import express from "express";
import exphbs from "express-handlebars";
import flash from "connect-flash";
import session from "express-session";
import MySQLStore from "express-mysql-session";

import morgan from "morgan";

import path from "path";
import { fileURLToPath } from "url";

import apiRoutes from './routes/data.routes.js';
import appRoutes from './routes/app.routes.js';
import helpers from "./libs/handlebars.js";
import "./libs/passport.js";
import { pool } from "./db.js";
import passport from "passport";

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
    // Storing Sessions
app.use(session({
    secret: "dfavgbkhsdljkfoipoatgwehbnjmqf87103-0495j1nrfmknd1897438j5r1081u234neql;16789098765434r5tyu8i981765415678991234yhnjqeoihfl",
    resave: false,
    saveUninitialized: false,
    store: MySQLStore({}, pool)
}));

    // Flash
app.use(flash());
    // Passport
app.use(passport.initialize());
app.use(passport.session());

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

// Global Variables
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
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
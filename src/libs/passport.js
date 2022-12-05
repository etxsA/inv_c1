import passport from "passport";
import passportLocal from "passport-local";

import helpers from "./helpers.js"
import { pool } from "../db.js";

const LocalStrategy = passportLocal.Strategy;


// To sign up 
passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const [rows]= await pool.query('SELECT * FROM users WHERE email = ?', [username]);
    if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password, user.password);

        if (validPassword) {
            done(null, user, req.flash('success', 'Bienvenido' + user.username));
        } else {
            done(null, false, req.flash('messasge', 'Contraseña Incorrecta'));
        }
    } else {
        return done(null, false, req.flash('message', 'El correo electrónco no esta registrado'))
    }
}));


// To sign up 
passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true

}, async (req, username, password, done) => {
    try {    
        const { fullname, email } = req.body;

        const newUser = {
            fullname,
            username,
            password,
            email
        };

        

        newUser.password = await helpers.encryptPassword(password);
        const result = await pool.query('INSERT INTO users set ?', [newUser]);
        newUser.id = result[0].insertId;
        return done(null, newUser, req.flash('success', 'Succesfully Signed Up'));
    } catch (err) {
        return done(null, false, req.flash('message', err.message));
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    done(null, rows[0]);
})

import passport from "passport";
import passportLocal from "passport-local";

import helpers from "./helpers.js"
import { pool } from "../db.js";

const LocalStrategy = passportLocal.Strategy;

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
        return done(null, newUser);
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

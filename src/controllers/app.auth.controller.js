import passport from "passport";

// "/signin"
export const signIn = (req, res) => {
    res.render('auth/signin');
};

export const postSignIn = (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/app/monitor/w',
        failureRedirect: '/app/signin',
        failureFlash: true
    })(req, res, next);
};

// "/signup"
export const signUp = (req, res) => {
    res.render('auth/signup');
};

export const postSignUp = passport.authenticate('local.signup', {
    successRedirect: '/app/monitor/w',
    failureRedirect: '/app/signup',
    failureFlash: true,
});


export const logout = (req, res) => {
    req.logOut(req.userId, (err) => {
        if (err) {return err};
    });
    req.flash('success', 'Session Cerrada con Exito');
    res.redirect('/app/signin'); 
};


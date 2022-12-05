import passport from "passport";

// "/signin"
export const signIn = (req, res) => {
    res.render('auth/signin');
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


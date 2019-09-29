const express = require('express');
const passport = require('passport');

const userRoute = express.Router();

// user req
userRoute.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));
// google redirect -> passport process 
userRoute.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    console.log(req.session);
    res.redirect("http://localhost:3000/");
});

// `req.user` contains the authenticated user
userRoute.post('/register', (req, res, next) => {
    // validate (maybe not need)

    // passport
    passport.authenticate('local-register', (err, user, info) => {
        if (err) { return next(err); }
        if (!user) {
            return res.json({
                success: false,
                message: info.message
            });
        }
        res.status(200).json({
            success: true,
            data: user,
            message: info.message
        });
    })(req, res, next);
});

userRoute.post('/login', (req, res, next) => {
    // validate (maybe not need)

    // passport
    passport.authenticate('local-login', (err, user, info) => {
        if (err) { return next(err); }
        if (!user) {
            res.json({
                success: false,
                message: info.message
            });
        }
        req.logIn(user, (err) => {
            if (err) { return next(err); }
            res.status(200).json({
                success: true,
                data: user,
                message: info.message
            });
        });
    })(req, res, next);
});

userRoute.get('/logout', (req, res) => {
    req.logout();
    res.json({ success: true })
    // res.redirect('http://localhost:3000');
});

isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {return next();}
    res.redirect('http://localhost:3000/login');
}

userRoute.get('/profile', isLoggedIn, (req, res)=> {
    res.json({
        email: req.user.email,
        name: req.user.name
    });
})


module.exports = userRoute;

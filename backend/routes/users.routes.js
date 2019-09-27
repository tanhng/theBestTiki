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
    res.redirect('http://google.com');
});

userRoute.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = userRoute;
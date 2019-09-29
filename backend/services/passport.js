const passport = require('passport');
const bcryptjs = require('bcryptjs');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../models/users.model');

// oauth google
passport.serializeUser((user, done) => {
    console.log("Serializing User...")
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    console.log("Deserializing User...")
    UserModel.findById(id, (err, user) => {
        done(err, user);
    });
});
passport.use(
    new GoogleStrategy({
        clientID: "812618322617-8v29t2hq30tecck8pru3l40t1q78pqq3.apps.googleusercontent.com",
        clientSecret: "eg4f4fbaVv-GxGEW1RI6QjP_",
        callbackURL: '/user/auth/google/callback',
        proxy: true
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const existingUser = await UserModel.findOne({ googleId: profile.id });
            if (existingUser) {
                return done(null, existingUser);
            } else {
                const newUser = await UserModel.create({
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    name: profile.name.familyName + ' ' + profile.name.givenName
                });
                done(null, newUser);
            }
        } catch (err) {
            console.log(err.message);
        }
    })
);

passport.use('local-register', new LocalStrategy({
    usernameField: 'email',
    passswordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    UserModel.findOne({ 'email': email }, (err, user) => {
        if (err) return done(err);
        if (user) {
            return done(null, false, { message: 'Email has been used.' })
        }
        UserModel.create({
            email: email,
            password: password,
            name: req.body.fullName
        }, (err, newUser) => {
            if (err) { return done(err); }
            else {
                return done(null, newUser, { message: 'Register Success!' });
            }
        })
    })
}));

passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    UserModel.findOne({ 'email': email }, (err, user) => {
        if (err) return done(err);
        if (!user || !bcryptjs.compareSync(password, user.password)) {
            return done(null, false, { message: 'Incorrect Username or Password.'});
        }
        return done(null, user, {message: 'Login Success!'});
    });
}));
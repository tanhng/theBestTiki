const express = require('express');
const passport = require('passport');
const bcryptjs = require('bcryptjs');
const UserModel = require('../models/users.model');
const userRoute = express.Router();

// user req
userRoute.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));
// google redirect -> passport process 
userRoute.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    console.log(req.session);
    res.redirect('http://localhost:3000');
});

userRoute.post("/register", async (req, res) => {
    try {
        // validate email, password, fullname
        const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

        if (!emailRegex.test(req.body.email)) {
            res.status(400).json({
                success: false,
                message: "Invalid email address"
            });
        } else if (req.body.password.length < 6) {
            res.status(400).json({
                success: false,
                message: "Password  too short"
            });
        } else {

            // check email exist
            const data = await UserModel.findOne({ email: req.body.email }).lean();
            if (data) {
                res.status(400).json({
                    success: false,
                    message: "Email has been used"
                });
            } else {
                //hash pw
                const hashPassword = bcryptjs.hashSync(req.body.password, 10);
                //create user record
                const newUser = await UserModel.create({
                    ...req.body,
                    password: hashPassword
                })
                res.status(201).json({
                    success: true,
                    data: newUser
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
})

userRoute.post("/login", async (req, res) => {
    try {
        const data = await UserModel.findOne({ email: req.body.email }).lean();
        if (!data) {
            res.status(400).json({
                success: false,
                message: "Email doesn't exist"
            });
        } else if (!bcryptjs.compareSync(req.body.password, data.password)) {
            res.status(400).json({
                success: false,
                message: "Wrong Password"
            });
        } else {
            req.session.currentUser = {
                _id: data._id,
                email: data.email
            }

            res.status(200).json({
                success: true,
                message: "Login Success",
                data: {
                    email: data.email,
                }
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
})

userRoute.get("/test", (req, res) => {
    // console.log(req.session.currentUser);
    res.status(500).json({
        success: true,
    });
})

userRoute.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.json({
                success: false,
                message: err.message
            })
        } else {
            res.json({success: true});
        }
    });
})


// userRoute.get('/logout', (req, res) => {
//     req.logout();
//     res.redirect('/');
// });

module.exports = userRoute;
// basic
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const userRouter = require('./routes/users.routes');
const postRouter = require('./posts/post.route');
const uploadRouter = require('./uploads/upload.route');

// // extend
// const passport = require('passport');
// require('./services/passport');

// connect to mongodb
mongoose.connect("mongodb://localhost:27017/teki-web", { useNewUrlParser: true }, (e) => {
    //FIXME: tim cach viet khac
    if (e)
        throw e;
    else {
        console.log("MongoDB Connected...");

        // basic init
        const server = express();

        server.use(express.static('public'));
        server.use(cors({
            origin: ['http://localhost:3000'],
            credentials: true
        }));
        server.use(bodyParser.json());
        server.use(session({
            secret: 'keyboard cat',
            resave: true,
            saveUninitialized: false,
        }));
        // server.use(passport.initialize());
        // server.use(passport.session());
        
        // TODO: router
        server.use('/user', userRouter);
        server.use('/post', postRouter);
        server.use('/upload',uploadRouter);

        server.listen(process.env.PORT || 5000, (err) => {
            if (err)
                throw err;
            else
                console.log("Server listen on port 5000...");
        });
    }
})
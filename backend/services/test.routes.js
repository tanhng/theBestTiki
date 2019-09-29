const express = require('express');

const app = express.Router();

app.get('/current-user', (req, res) => {
    res.send(req.user);
});

app.get('/', (req, res)=> {
    console.log(req.user);
    res.send({success: true});
})

module.exports = app;
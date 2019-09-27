const express = require('express');

const app = express.Router();

app.get('/current-user', (req, res) => {
    res.send(req.user);
});

module.exports = app;
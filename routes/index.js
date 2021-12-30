const express = require('express');
const helmet = require('helmet');
const path = require('./path');
const error = require('../middleware/error');

module.exports = function(app) {
    app.use(express.urlencoded({extended: true}));
    app.use(helmet());
    app.set('view engine','ejs');

    app.use(express.json());
    app.use('', path);
    // app.get('', (req, res) => {
    //     res.send('everything works...')
    // })

    app.use(error);
}
'use strict';

const express = require('express');
const logging = require('morgan');

const app = express();

// Do not log tests
if (process.env.NODE_ENV !== 'test') {
    app.use(logging('combined')); // Apache style Logs
}

// Allow these to be overridden by environment variables
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 5000;

// eslint-disable-next-line no-unused-vars
const routes = require('./routes.js')(app);

module.exports = app.listen(port, host, function () {
    console.log(`Server running at http://${host}:${port}/`);
});

/*jslint node: true, plusplus: true, white: true*/

"use strict";

var startTime = new Date().getTime();

var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    APP_PORT = 3000;

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'web')));

app.listen(APP_PORT);

console.log('Server startup in ' + (new Date().getTime() - startTime) + 'ms');
console.log('Server running on http://localhost:' + APP_PORT);

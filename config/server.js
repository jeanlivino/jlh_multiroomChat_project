// dependecies
const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

// app
const app = express();

//// variables
app.set('view engine', 'ejs');
app.set('views', './app/views');

//// middlewares
app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({extended: true}))
app.use(expressValidator())

//// autoload
consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app)

// export
module.exports = app;
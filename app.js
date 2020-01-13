const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const env = process.env.NODE_ENV || 'development';
const config = require('./server/config/config.json').token[env];
const jwtConfig = require('./server/config/jwtConfig');
const errorHandler = require('./server/helper/errorHelper');
const i18n = require('i18n');


// setup express app
const app = express();

// log request to the console
app.use(logger('dev'));

// parse incoming request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

i18n.configure({
    locales: ['en', 'id'],
    directory: __dirname + '/server/locales',
    defaultLocale: 'id'
});

app.use(i18n.init);
app.use(jwtConfig());
app.use(errorHandler);

require('./server/routes')(app);
// setup a default catch-all route that sends back a welcome message json format 
app.get('*', (req, res) => res.status(200).send({
    message: 'welcome to the beginning of nothingness'
}));

module.exports = app;
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./api/index');
var championsRouter = require('./api/champions');
var championRouter = require('./api/champion');
var rolesRouter = require('./api/roles');
var roleRouter = require('./api/role');

var app = express();

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const dev_db_url =
  'mongodb+srv://admin:123123123@cluster0.3ouubdf.mongodb.net/?retryWrites=true&w=majority';
const mongoDB = process.env.MONGODB_URI || dev_db_url
mongoose.connect(mongoDB, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use('/', indexRouter);
app.use('/champions', championsRouter);
app.use('/champion', championRouter);
app.use('/roles', rolesRouter);
app.use('/role', roleRouter);

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

module.exports = app;

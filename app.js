const express = require('express');
const app = express();
const port = process.env.NODE_ENV === "development" ? 3000 : 443;
const pug = require('pug');
const path = require('path');
const flash = require('express-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const routes = require('./routes/blog');
const db = require('./models/db')
const timestamp = require('time-stamp');
const gravatar = require('gravatar');


const indexRouter = require('./routes/blog');


app.use(session({
  secret: 'oswald',
  resave: false,
  saveUninitialized: true
}));

app.use(cookieParser());

app.use(flash());

app.set('view engine', 'pug')

app.use(express.urlencoded())

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

var url = gravatar.url('markymarrk@gmail.com', { s: '200', r: 'pg', d: '404' });

app.listen(port, console.log('hi'));

console.log(timestamp())

module.exports = app;
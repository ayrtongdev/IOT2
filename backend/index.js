// index.js
const express = require('express');
const cors = require('cors');
const { authRoutes } = require('./auth');
const productApp = require('./products');
var path = require('path');
var logger = require('morgan');
require('./config/database');

var usersRouter = require('./routes/users');
const exp = require('constants');

const app = express();
app.use(cors());

const port = 3000;


app.use(express.json());
app.use('/auth', authRoutes);
app.use('/products', productApp);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', usersRouter);



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
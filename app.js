const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');//чтобы парсить json
const authRoutes = require('./routes/auth');
const analyticsRoutes = require('./routes/analytics');
const categoryRoutes = require('./routes/category');
const orderRoutes = require('./routes/order');
const positionRoutes = require('./routes/position');
const keys = require('./config/keys');

const app = express();

mongoose.connect(keys.mongoURI)
    .then(()=>console.log('mongoDB connected'))
    .catch((err)=> console.log(err));

app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use(require('morgan')('dev'));//чтобы логировать запросы
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('cors')());//чтобы обрабатывать cors запросы

app.use('/api/auth', authRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/position', positionRoutes);


module.exports = app;
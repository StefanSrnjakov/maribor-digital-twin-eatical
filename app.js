var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//MONGOOSE
var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://najaki:najaki123@maribor-digital-twin-db.rwybp.mongodb.net/maribor-digital-twin-db';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, "MongoDB connection error."));


var indexRouter = require('./routes/index');
var allergenRouter = require('./routes/allergenRoutes')
var categoryRouter = require('./routes/categoryRoutes')
var imageRouter = require('./routes/imageRoutes')
var mealRouter = require('./routes/mealRoutes')
var orderRouter = require('./routes/orderRoutes')
var restaurantRouter = require('./routes/restaurantRoutes')
var userRouter = require('./routes/userRoutes')

var app = express();

//SESSION
var session = require('express-session');
var MongoStore = require('connect-mongo');
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: MongoStore.create({mongoUrl: mongoDB})
}));
app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/allergen', allergenRouter)
app.use('/category', categoryRouter)
app.use('/image', imageRouter)
app.use('/meal', mealRouter)
app.use('/order', orderRouter)
app.use('/restaurant', restaurantRouter)
app.use('/user', userRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

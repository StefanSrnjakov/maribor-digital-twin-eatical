const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
dotenv.config();


//MONGOOSE
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONNECT, () => console.log('Connected to database!'));
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, "MongoDB connection error."));



const indexRouter = require('./routes/index');
const allergenRouter = require('./routes/allergenRoutes')
const categoryRouter = require('./routes/categoryRoutes')
const imageRouter = require('./routes/imageRoutes')
const mealRouter = require('./routes/mealRoutes')
const orderRouter = require('./routes/orderRoutes')
const restaurantRouter = require('./routes/restaurantRoutes')
const userRouter = require('./routes/userRoutes')
const tokenRouter = require('./routes/tokenRoutes')


const app = express();

//CORS
const cors = require('cors');
const allowedOrigins = ['http://localhost:3000', 'http://localhost:5000', 'https://eatical.herokuapp.com'];
app.use(cors({
  credentials: true,
  origin: function (origin, callback) {
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));


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
app.use('/token', tokenRouter)

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

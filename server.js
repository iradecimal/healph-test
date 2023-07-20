const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./utils/mongodb.js');

const userRouter = require('./routes/user_routes.js');
const intakeRouter = require('./routes/daily_intake_routes.js');
const mealRouter = require('./routes/meal_routes.js');
const reportRouter = require('./routes/meal_routes.js');

const port = process.env.PORT;
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


//routes for the API server
app.use('/users', require('./routes/user_routes.js'));
app.use('/intakes', require('./routes/daily_intake_routes.js'));
app.use('/meals', require('./routes/meal_routes.js'));
app.use('/reports', require('./routes/meal_routes.js'));

app.listen(port, () => console.log(`Server started on port ${port}`));

app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
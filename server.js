const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./utils/mongodb.js');
const port = process.env.PORT;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes for the API server
app.use('/users', require('./routes/user_routes.js'));
app.use('/intakes', require('./routes/daily_intake_routes.js'));
app.use('/meals', require('./routes/meal_routes.js'));
app.use('/reports', require('./routes/report_routes.js'));

app.listen(port, () => console.log(`Server started on port ${port}`));
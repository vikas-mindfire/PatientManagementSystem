require('dotenv').config();

const express = require('express');
const port = 5000;
const connectDB = require('./config/db');
const cors = require('cors');

connectDB();

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors());

// middlewares
const middleware = require('./middleware')
middleware.forEach((item) => app.use(item))

// routers
app.use('/patients', require('./modules/patients/route'))
app.use('/users', require('./modules/users/route'))
app.use('/appointments', require('./modules/appointments/route'))

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
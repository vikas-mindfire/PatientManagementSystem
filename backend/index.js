const express = require('express');
const port = 5000;
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// middlewares
const middleware = require('./middleware')
middleware.forEach((item) => app.use(item))

// routers
app.use('/patients', require('./modules/patients/route'))

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
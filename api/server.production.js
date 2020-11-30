const express = require('express'),
   app = express(),
   bodyParser = require('body-parser');

const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT_PRODUCT;
app.listen(port);

console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes/appRoutes');
routes(app);
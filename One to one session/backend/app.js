const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/error');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({path:path.join(__dirname,"config/config.env")});



app.use(express.json());
app.use(cors());

const sessionlink = require('./routes/sessionroute')



app.use('/api/v1/',sessionlink);



app.use(errorMiddleware)
module.exports = app;
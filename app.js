const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes/routes');
const mongodbPort = "mongodb://localhost:27017/eim-info-mgmt";

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(morgan('dev'));

mongoose.connect(mongodbPort, {
    useNewUrlParser: true
}).then(() => {
        console.log("Connection to db established successfully...");
    },
    (err) => {
        console.log("Error while connecting to db: " + err);
    });

app.use('/', routes);

module.exports = app;
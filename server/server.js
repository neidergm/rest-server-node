require("./config/config");

const express = require("express");
const mongoose = require('mongoose');
const path = require('path');
const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// path for public folder
app.use(express.static(path.resolve(__dirname, '../public')));

//  URIs
app.use(require("./routes/index"));

// MongoDB Connection
mongoose.connect(process.env.URLDB, { useNewUrlParser: true }, (err, resp) => {
    if (err) throw err;

    console.log("DB Conected!");

});

// Start App
app.listen(process.env.PORT, function () {
    console.log(`Running app at port ${process.env.PORT}...`);
});
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const routes = require('../routes/index')

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/posts', { useNewUrlParser: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "Error connecting to MongoDB"));
db.once("open", function (callback) {
  console.log("Connection to MongoDB Succeeded");
});

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use(routes)

module.exports = app;
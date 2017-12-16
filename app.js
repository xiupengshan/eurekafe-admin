// app.js
/* eslint no-console: "off" */

"use strict";

require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

const app = express();

app.use(morgan("tiny"));

app.set("view engine", "pug");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static("dist"));

app.get("/", function(req,res) {
  res.render("index");
});

app.use(require("./lib/auth.js")(app));

app.get("/dashboard", function(req, res) {
  res.render("dashboard");
});


const port = process.env.PORT||3000;

app.listen(port, function() {
  console.log("\x1b[32m", "app listening on port", port, "\x1b[0m");
});

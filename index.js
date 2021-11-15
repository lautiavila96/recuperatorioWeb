"use strict";
exports.__esModule = true;
var express = require("express");
var iniciar_1 = require("./iniciar");
var app = express();
(0, iniciar_1.initAPI)(app);
var port = 3002;
var server = app.listen(port, function () { return console.log("Escuchando en el Puerto 3002!"); });

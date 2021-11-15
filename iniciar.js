"use strict";
exports.__esModule = true;
exports.initAPI = void 0;
var bodyParser = require("body-parser");
var config = require("./config");
/* import { Connections } from "./connections";
import { Auth } from "./modules/autenticaciones/autenticaciones.class"; */
var requireDir = require("require-dir");
function initAPI(app) {
    /*     Connections.initialize();
        
        Auth.initialize(app); */
    app.use(bodyParser.json({ limit: "150mb" }));
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.all("*", function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
        res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH,OPTIONS, HEAD");
        if ("OPTIONS" === req.method) {
            res.header("Access-Control-Max-Age", "1728000");
            res.sendStatus(200);
        }
        else {
            next();
        }
    });
    for (var m in config.modules) {
        if (config.modules[m].active) {
            var routes = requireDir(config.modules[m].path);
            for (var route in routes) {
                if (config.modules[m].middleware) {
                    console.log("Rutas: ", config.modules[m].route);
                    app.use("/api" + config.modules[m].route, config.modules[m].middleware, routes[route]);
                }
                else {
                    console.log("Rutas: ", config.modules[m].route);
                    app.use("/api" + config.modules[m].route, routes[route]);
                }
            }
        }
    }
}
exports.initAPI = initAPI;

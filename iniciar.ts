import * as bodyParser from "body-parser";
import * as Express from "express";

import * as config from "./config";
/* import { Connections } from "./connections";
import { Auth } from "./modules/autenticaciones/autenticaciones.class"; */

const requireDir = require("require-dir");

export function initAPI(app: Express) {
/*     Connections.initialize();
    
    Auth.initialize(app); */
    
    app.use(bodyParser.json({ limit: "150mb" }));
    app.use(
        bodyParser.urlencoded({
            extended: true,
        })
    );

    app.all("*", (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
        res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH,OPTIONS, HEAD");


        if ("OPTIONS" === req.method) {
            res.header("Access-Control-Max-Age", "1728000");
            res.sendStatus(200);
        } else {
            next();
        }
    });

 
    for (const m in config.modules) {
        if (config.modules[m].active) {
            const routes = requireDir(config.modules[m].path);
            for (const route in routes) {
                if (config.modules[m].middleware) {
                    console.log("Rutas: ", config.modules[m].route);
                    app.use("/api" + config.modules[m].route, config.modules[m].middleware, routes[route]);
                } else {
                    console.log("Rutas: ", config.modules[m].route);
                    app.use("/api" + config.modules[m].route, routes[route]);
                }
            }
        }
    }
}

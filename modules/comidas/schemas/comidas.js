"use strict";
exports.__esModule = true;
exports.comidas = exports.ComidaSchema = void 0;
var mongoose = require("mongoose");
exports.ComidaSchema = new mongoose.Schema({
    nombreComercial: { type: String, required: false, lowercase: true },
    tipo: { type: String, lowercase: true },
    creador: { type: String, lowercase: true },
    precioVenta: { type: String, lowercase: true },
    lugarOrigen: { type: Boolean, required: true, lowercase: true }
});
exports.comidas = mongoose.model("Comida", exports.ComidaSchema, "comidas");

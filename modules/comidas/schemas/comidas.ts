import * as mongoose from "mongoose";

export const ComidasSchema = new mongoose.Schema({
    nombreComercial: { type: String, required: false, lowercase: true },
    tipo: { type: String, lowercase: true },
    creador: { type: String, lowercase: true },
    precioVenta: { type: String, lowercase: true },
    lugarOrigen: { type: Boolean, required: true, lowercase: true }
});

export let comidas = mongoose.model("Comida", ComidasSchema, "comidas");
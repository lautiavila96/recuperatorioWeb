import * as express from "express";
import * as comidasSchema from "./../schemas/comidas";

const router = express.Router();

router.post("/comidas", async (req, res) => {
  try {
    const newComida = req.body;
    const comidas = new comidasSchema.comidas(newComida);
    const comidaNueva = await comidas.save();
    console.log("Comida agregada", comidaNueva);
    return res.status(200).send({ status: "success", data: comidaNueva });
  } catch (err) {
    console.log("Error: ", err);
    return res.status(404).send({ status: "error", data: err });
  }
});

router.get("/comidas", async (req, res) => {
  try {
    let comidas = await comidasSchema.comidas.find();
    console.log("Comidas registradas!", comidas);
    return res.status(200).send({ status: "success", data: comidas });
  } catch (err) {
    console.log("Error: ", err);
    return res.status(404).send({ status: "error", data: err });
  }
});

router.put("/comida/:id", async (req, res) => {
  try {
    const comidaUpdate = req.body;
    const idComida = req.params.id;
    const comidaUpdated = await comidasSchema.comidas.findByIdAndUpdate(
        idComida,
      comidaUpdate,
      { new: true }
    );
    console.log("Comida modificada", comidaUpdated);
    return res.status(200).send({ status: "success", data: comidaUpdated });
  } catch (err) {
    console.log("Error: ", err);
    return res.status(404).send({ status: "error", data: err });
  }
});

router.delete("/comida/:id", async (req, res) => {
  try {
    const comidaDelete = req.body;
    const idComida = req.params.id;
    const comidaDeleted = await comidasSchema.comidas.findByIdAndDelete(
        idComida,
      comidaDelete
    );
    console.log("Comida Borrada", comidaDeleted);
    return res.status(200).send({ status: "success", data: comidaDeleted });
  } catch (err) {
    console.log("Error: ", err);
    return res.status(404).send({ status: "error", data: err });
  }
});

export = router;

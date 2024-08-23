const express = require("express");
const path = require("path");
const router = express.Router();
const Files = require("./controllers/files");

// Inicializacion de clase controladora
const filesController = new Files();

// Ruta para obtener el listado de la informacion
router.get('/files/data', filesController.list);

// Ruta para renderizar el frontend de React compilado en la carpeta build
router.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

module.exports = router;
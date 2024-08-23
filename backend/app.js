const express = require("express");
const cors = require("cors");
const path = require('path');
const routes = require('./router');

// Clase para iniciar el servidor
class Server {
    
    express = express();    

    constructor () {
        this.app = express();        
    }

    // Metodo para configurar servidor de Express: CORS, frontend, headers, router
    config() {
        this.app.use(express.static(path.join(__dirname, 'build')));    
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use('/', routes);
    }

    // Metodo para iniciar servidor basado en clases de Express
    init() {
        this.config();
        this.app.listen(7000, () => console.log('Server is running on port: 7000'));
    }
}

const server = new Server();
server.init();
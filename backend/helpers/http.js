const https = require('https');

// Clase que maneja las peticiones HTTPS a la API externa

class Http {

    hostname = 'echo-serv.tbxnet.com';

    constructor () { }

    // Metodo para obtener los archivos .csv
    getFileList() {
        return new Promise((resolve, reject) => {
           
            const options = this.getConfig('/v1/secret/files');
            const req = https.request(options, (res) => {
                let data = '';
                
                res.on('data', (chunk) => {
                    data += chunk;
                });
                
                res.on('end', () => {                    
                    resolve(JSON.parse(data));
                });
            });
            
            req.on('error', (error) => {
                console.log(error);
                reject(error);
            });
            
            req.end();
        });
    }

    // Metodo para obtener la informacion de cada archivo
    downloadFileData(fileName) {
        return new Promise((resolve, reject) => {
           
            const options = this.getConfig(`/v1/secret/file/${ fileName }`);
            const req = https.request(options, (res) => {
                let data = '';
                
                res.on('data', (chunk) => {
                    data += chunk;
                });
                
                res.on('end', () => {          
                    resolve(data);
                });
            });
            
            req.on('error', (error) => {
                console.log(error);
                reject(error);
            });
            
            req.end();
        });
    }
    
    // Funcion para configurar segun sea el caso la data de las peticiones HTTPS
    getConfig(path) {
        const httpOpts = {
            hostname: this.hostname,
            port: 443,
            path,
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'authorization': 'Bearer aSuperSecretKey'
            },
        };

        return httpOpts;
    }
}

module.exports = Http;
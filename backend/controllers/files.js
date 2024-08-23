const Http = require('../helpers/http');
const transformResponse = require('../helpers/transformResponse');

class Files {

    constructor (http = new Http()) {
        this.http = http;
    }

    // Controlador que obtiene y convierte la informacion a traves de HTTPS

    list = async (_, res) => {

        try {

            const { files } = await this.http.getFileList();
            let data = [];
            let requests = [];                                    

            for (let i = 0; i < files.length; i++) {

                requests.push(this.http.downloadFileData(files[i]));                
            }
            
            const responses = await Promise.all(requests);            

            responses.forEach((response, index) => {
                
                const transformed = transformResponse(response, files[index]);

                if (transformed?.lines.length > 0) {

                    data.push(transformed);
                }   
            });                                 

            return res.status(200).send(data);

        } catch (e) {
            console.log(e);
            return res.status(500).send({ error: e });
        }
    }    
}

module.exports = Files;
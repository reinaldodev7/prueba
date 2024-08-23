// Funcion que filtra y formatea en los valores requeridos
module.exports = (response, fileName) => {        

    if (typeof response !== 'string') {
        return false;
    }

    const separatedValues = response.split('\n');    
    let result = {
        file: fileName,
        lines: []
    };

    for (let i = 0; i < separatedValues.length; i++) {

        const values = separatedValues[i].split(',');

        if (values.length === 4 && validateFile(values) !== 0) {            

            result.lines.push({
                text: values[1],
                number: parseInt(values[2]),
                hex: values[3]
            });
        }
    }

    return result;
}

// Validar los tipos de datos de los valores obtenidos

function validateFile(value) {            

    if (typeof value === 'string') {
        return 0;
    }

    if (!value[0].includes('.csv')) {
        return 0;
    } else if (typeof value[1] !== 'string') {
        return 0;
    } else if (isNaN(parseInt(value[2]))) {
        return 0;
    } else if (value[3].length !== 32) {
        return 0;
    }

    return true;
}
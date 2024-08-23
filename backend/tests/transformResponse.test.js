const transformResponse = require('../helpers/transformResponse'); 

describe('transformResponse', () => {
    test('debería retornar false si la respuesta no es una cadena', () => {
        expect(transformResponse(123, 'test.csv')).toBe(false);
        expect(transformResponse([], 'test.csv')).toBe(false);
        expect(transformResponse({}, 'test.csv')).toBe(false);
    });

    test('debería retornar un objeto con líneas si se proporciona una entrada válida', () => {
        const response = 'file.csv,text1,123,12345678901234567890123456789012\nfile.csv,text2,456,12345678901234567890123456789012';
        const result = transformResponse(response, 'file.csv');
        
        expect(result).toEqual({
            file: 'file.csv',
            lines: [
                { text: 'text1', number: 123, hex: '12345678901234567890123456789012' },
                { text: 'text2', number: 456, hex: '12345678901234567890123456789012' }
            ]
        });
    });

    test('debería ignorar líneas con datos inválidos', () => {
        const response = 'file.csv,text1,abc,12345678901234567890123456789012\nfile.csv,text2,456,12345678901234567890123456789012\nfile.csv,text3,789,1234567890123456789012345678901';
        const result = transformResponse(response, 'file.csv');
        
        expect(result).toEqual({
            file: 'file.csv',
            lines: [
                { text: 'text2', number: 456, hex: '12345678901234567890123456789012' }
            ]
        });
    });

    test('debería retornar un array de líneas vacío si no se encuentran líneas válidas', () => {
        const response = 'file.csv,text1,abc,12345678901234567890123456789012\nfile.csv,text2,xyz,12345678901234567890123456789012';
        const result = transformResponse(response, 'file.csv');
        
        expect(result).toEqual({
            file: 'file.csv',
            lines: []
        });
    });
});

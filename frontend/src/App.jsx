import 'bootstrap/dist/css/bootstrap.min.css'
import { FormControl, Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import './App.css'; 

function App() {
  const [data, setData] = useState([]);
  const [tempData, setTempData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:7000/files/data');
        const newData = await response.json();
        let dataToShow = [];

        for(let i = 0; i < newData.length; i++) {

          for(let x = 0; x < newData[i].lines.length; x++) {

            newData[i].lines[x].fileName = newData[i].file;
            dataToShow.push(newData[i].lines);
          }
        }

        dataToShow = dataToShow.flat();        
        setData(dataToShow);
        setTempData(dataToShow);
      } catch (error) {
        alert('Ha ocurrido un error obteniendo la data');
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

  const orderTableByName = (fileName) => {

    if (fileName === '' || fileName === undefined || fileName === null) {
      setTempData(data);
    }
    const newOrder = data.filter((field) => field.fileName.includes(fileName));
    setTempData(newOrder);
  }

  return (
    <div className="app">
      <header>
        <h2>Prueba de React + Node</h2>
        <FormControl
          placeholder="Filtrar archivo"
          type="search"
          className="search-input border-0 rounded-pill"
          onKeyUp={(event) => orderTableByName(event.target.value)}
        />
      </header>
      <Table striped bordered hover responsive> 
        <thead>
          <tr>
            <th>File Name</th>
            <th>Text</th>
            <th>Number</th>
            <th>Hex</th>
          </tr>
        </thead>
        <tbody>
          {tempData.map((fileData, fileIndex) => (
            <tr key={fileIndex}>
              <td>{fileData.fileName}</td>
              <td>{fileData.text}</td>
              <td>{fileData.number}</td>
              <td>{fileData.hex}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>    
  );
}

export default App;
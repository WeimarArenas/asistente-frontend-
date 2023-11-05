import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [equipos, setEquipos] = useState([]);

  const fetchData = () => {
    // Realiza la solicitud HTTP para obtener los datos
    axios.get('http://127.0.0.1:5000/equipos')
      .then(response => {
        setEquipos(response.data.equipos);
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });
  };

  // Cargar los datos al montar el componente
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Consulta de equipos</h1>
      <button onClick={fetchData}>Cargar Datos</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Serie</th>
            <th>Propietario</th>
            <th>Fecha de Fabricación</th>
            <th>Fecha de Ingreso</th>
            <th>Condición de Ingreso</th>
            <th>Riesgo</th>
            <th>ID INVIMA</th>
            <th>ID Área</th>
          </tr>
        </thead>
        <tbody>
          {equipos.map(equipo => (
            <tr key={equipo.id}>
              <td>{equipo.id}</td>
              <td>{equipo.nombre}</td>
              <td>{equipo.marca}</td>
              <td>{equipo.modelo}</td>
              <td>{equipo.serie}</td>
              <td>{equipo.propietario}</td>
              <td>{equipo.fecha_fabricacion}</td>
              <td>{equipo.fecha_ingreso}</td>
              <td>{equipo.condicion_ingreso}</td>
              <td>{equipo.riesgo}</td>
              <td>{equipo.id_invima}</td>
              <td>{equipo.id_area}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

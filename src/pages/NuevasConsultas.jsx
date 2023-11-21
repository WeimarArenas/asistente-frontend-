import React, { useState, useEffect } from "react";
import Header from "../components/Header";

import '../styles/nuevasConsultas.css';

function NuevasConsultas() {
  const [consultas, setConsultas] = useState([]);
  const [nuevaConsulta, setNuevaConsulta] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const obtenerConsultas = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/nuevas-consultas");

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      const data = await response.json();
      setConsultas(data.consultas);
    } catch (error) {
      console.error("Error al obtener las consultas:", error);
    }
  };

  const agregarConsulta = async () => {
    // Obtener la fecha actual en formato YYYY-MM-DD
    const fechaActual = new Date().toISOString().split('T')[0];

    // Realizar la petición para agregar una nueva consulta
    await fetch("http://127.0.0.1:5000/nuevas-consultas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tipo_consulta: nuevaConsulta,
        fecha: fechaActual,
      }),
    });

    // Actualizar el estado de las consultas después de agregar una nueva
    obtenerConsultas();

    // Ocultar el formulario después de agregar una nueva consulta
    setMostrarFormulario(false);
  };

  useEffect(() => {
    // Obtener las consultas al cargar el componente
    obtenerConsultas();
  }, []); // El segundo argumento vacío asegura que la llamada solo se realice una vez al montar el componente

  return (
    <div>
      <Header />
      <div className="consultasContainer">
        {/* Mostrar el formulario para ingresar nuevas consultas */}
        {mostrarFormulario && (
          <div className="consultasModal">
            <label>Escribe el tipo de consulta que deseas:</label>
            <input
              type="text"
              value={nuevaConsulta}
              onChange={(e) => setNuevaConsulta(e.target.value)}
              style={{
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '8px',
                fontSize: '16px',
                width: '100%', // O ajusta el ancho según sea necesario
                boxSizing: 'border-box',
              }}
            />

            <button
              onClick={agregarConsulta}
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '4px 8px',
                textAlign: 'center',
                textDecoration: 'none',
                fontSize: '16px',
                cursor: 'pointer',
                borderRadius: '4px',
              }}
            >
              Guardar
            </button>
          </div>
        )}

        {/* Mostrar el botón para mostrar/ocultar el formulario */}
        <button onClick={() => setMostrarFormulario(!mostrarFormulario)}>
          {mostrarFormulario ? "Cancelar" : "Nueva Consulta"}
        </button>
      </div>

      {/* Mostrar la tabla de consultas */}
      <table className="mi-tabla">
        <thead>
          <tr>
            <th>Tipo de Consulta</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {consultas.map((consulta) => (
            <tr key={consulta.id}>
              <td>{consulta.tipo_consulta}</td>
              <td>{consulta.fecha}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default NuevasConsultas;
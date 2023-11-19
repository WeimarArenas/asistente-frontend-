import React, { useState } from "react";

function TablaEquiposAreas({ filteredEquipos, onEquipoClick  }) {
  const [query, setQuery] = useState("");

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

	const handleEquipoClick = (equipo) => {
    onEquipoClick(equipo);
  };

  const filteredEquiposInsensitive = filteredEquipos.filter((equipo) =>
    equipo.nombre.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="table-container">
      <div className='containerBarraBusqueda'>
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={query}
          onChange={handleSearchChange}
        />
      </div>
      <table class="mi-tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Serie</th>
            <th>Propietario</th>
            <th>Fecha de Fabricación</th>
            <th>Fecha de Ingreso</th>
            <th>Condición de Ingreso</th>
            <th>Riesgo</th>
          </tr>
        </thead>
        <tbody>
          {filteredEquiposInsensitive.map((equipo) => (
             <tr key={equipo.id} onClick={() => handleEquipoClick(equipo)}>
              <td>{equipo.nombre}</td>
              <td>{equipo.marca}</td>
              <td>{equipo.modelo}</td>
              <td>{equipo.serie}</td>
              <td>{equipo.propietario}</td>
              <td>{equipo.fecha_fabricacion}</td>
              <td>{equipo.fecha_ingreso}</td>
              <td>{equipo.condicion_ingreso}</td>
              <td>{equipo.riesgo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaEquiposAreas;

import React from "react";

function TablaEquiposAreas({filteredEquipos }){
    return(
        <div className="table-container">
          <table>
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
              {filteredEquipos.map(equipo => (
                <tr key={equipo.id}>
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
};

export default TablaEquiposAreas;
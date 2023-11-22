import React, { useState } from "react";

function FormularioRegistroInvima({ registrosInvima, editableFields, handleChangeEditable }) {
  const [formData, setFormData] = useState({
    numero_registro: "",
    vigencia: "",
    fecha: "",
    evidencia_documento: "",
    evidencia_fotografica: "",
    evidencia_textual: "",
  });

  const registro = registrosInvima ? registrosInvima[0] : null;

  const handleSaveChanges = () => {
    fetch('http://127.0.0.1:5000/equipos/registros-invima', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        id_equipo: 1, 
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Respuesta del servidor:', data);
      })
      .catch(error => {
        console.error('Error al enviar la solicitud:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  
    return (
      <form className="form-container">
        {registro ? (
          <div>
            <div className="form-group">
              <label>Número de Registro:</label>
              <input
                type="text"
                name="numero_registro"
                value={editableFields.numero_registro || registro.numero_registro}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Vigencia:</label>
              <input
                type="text"
                name="vigencia"
                value={editableFields.vigencia || registro.vigencia}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Fecha:</label>
              <input
                type="text"
                name="fecha"
                value={editableFields.fecha || registro.fecha}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Documentos de evidencia:</label>
              <input
                type="text"
                name="evidencia_documento"
                value={editableFields.evidencia_documento || registro.evidencia_documento}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Evidencia fotográfica:</label>
              <input
                type="text"
                name="evidencia_fotografica"
                value={editableFields.evidencia_fotografica || registro.evidencia_fotografica}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Evidencia Textual:</label>
              <textarea
                name="evidencia_textual"
                value={editableFields.evidencia_textual || registro.evidencia_textual}
                onChange={handleInputChange}
                rows="4"
                cols="50"
              />
            </div>
          </div>
        ) : null}
        <div className="button-container">
        <button type="button" onClick={handleSaveChanges}>Guardar</button>
        </div>
      </form>
    );
  };
  
  export default FormularioRegistroInvima
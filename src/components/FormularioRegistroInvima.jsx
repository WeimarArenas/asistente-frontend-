import React, { useState, useEffect } from "react";

function FormularioRegistroInvima({ registrosInvima, id_equipo }) {
  const [formData, setFormData] = useState({
    numero_registro: "",
    vigencia: "",
    fecha: "",
    evidencia_documento: null,
    evidencia_fotografica: null,
    evidencia_textual: "",
  });

  useEffect(() => {
    if (registrosInvima && registrosInvima.length > 0) {
      const registro = registrosInvima[0];
      setFormData({
        numero_registro: registro.numero_registro,
        vigencia: registro.vigencia,
        fecha: registro.fecha,
        evidencia_documento: registro.evidencia_documento,
        evidencia_fotografica: null, 
        evidencia_textual: registro.evidencia_textual,
      });
    } else {
      setFormData({
        numero_registro: "",
        vigencia: "",
        fecha: "",
        evidencia_documento: null,
        evidencia_fotografica: null, 
        evidencia_textual: "",
      });
    }
  }, [registrosInvima]);

  const handleSaveChanges = () => {
    const apiUrl = registrosInvima && registrosInvima.length > 0
      ? `http://127.0.0.1:5000/equipos/registros-invima/${registrosInvima[0].id}`
      : `http://127.0.0.1:5000/equipos/registros-invima/${registrosInvima[0].id}`;
  
    const method = registrosInvima && registrosInvima.length > 0 ? 'PUT' : 'POST';
  
    const formDataToSend = new FormData();
    formDataToSend.append("numero_registro", formData.numero_registro);
    formDataToSend.append("vigencia", formData.vigencia);
    formDataToSend.append("fecha", formData.fecha);
    formDataToSend.append("evidencia_documento", formData.evidencia_documento);
    formDataToSend.append("evidencia_fotografica", formData.evidencia_fotografica);
    formDataToSend.append("evidencia_textual", formData.evidencia_textual);
    formDataToSend.append("id_equipo", id_equipo);
  
    fetch(apiUrl, {
      method: method,
      body: formDataToSend,
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
    const { name, value, type } = e.target;
    
    // Si es un input de tipo file, guarda el archivo en el estado
    const inputValue = type === "file" ? e.target.files[0] : value;
  
    setFormData({
      ...formData,
      [name]: inputValue,
    });
  };

  return (
    <form className="form-container">
      {registrosInvima && registrosInvima.length > 0 ? (
        <div>
          <div className="form-group">
            <label>Número de Registro:</label>
            <input
              type="text"
              name="numero_registro"
              value={formData.numero_registro}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Vigencia:</label>
            <input
              type="text"
              name="vigencia"
              value={formData.vigencia}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Fecha:</label>
            <input
              type="text"
              name="fecha"
              value={formData.fecha}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Documentos de evidencia:</label>
            <input
              type="file"
              name="evidencia_documento"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Evidencia fotográfica:</label>
            <input
              type="file"
              name="evidencia_fotografica"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Evidencia Textual:</label>
            <textarea
              name="evidencia_textual"
              value={formData.evidencia_textual}
              onChange={handleInputChange}
              rows="4"
              cols="50"
            />
          </div>
        </div>
      ) : (
        <div>
          <p>No hay datos disponibles.</p>
          <div className="form-group">
            <label>Número de Registro:</label>
            <input
              type="text"
              name="numero_registro"
              value={formData.numero_registro}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Vigencia:</label>
            <input
              type="text"
              name="vigencia"
              value={formData.vigencia}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Fecha:</label>
            <input
              type="text"
              name="fecha"
              value={formData.fecha}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Documentos de evidencia:</label>
           <button>Descargar documento de evidencia</button>   
          </div>
          <div className="form-group">
            <label>Evidencia fotográfica:</label>
            <button>Descargar Evidencia fotografica</button>
          </div>
          <div className="form-group">
            <label>Evidencia Textual:</label>
            <textarea
              name="evidencia_textual"
              value={formData.evidencia_textual}
              onChange={handleInputChange}
              rows="4"
              cols="50"
            />
          </div>
        </div>

      )}
      <div className="button-container">
        <button type="button" onClick={handleSaveChanges}>Guardar</button>
      </div>
    </form>
  );
};

export default FormularioRegistroInvima
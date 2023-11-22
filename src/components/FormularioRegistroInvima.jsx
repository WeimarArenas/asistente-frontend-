import React, { useState, useEffect } from "react";

function FormularioRegistroInvima({ registrosInvima, id_equipo }) {
  const [formData, setFormData] = useState({
    numero_registro: "",
    vigencia: "",
    fecha: "",
    evidencia_documento: "",
    evidencia_fotografica: "",
    evidencia_textual: "",
  });

  useEffect(() => {
    if (registrosInvima && registrosInvima.length > 0) {
      // Si hay datos existentes, establecer el formulario con esos datos
      const registro = registrosInvima[0];
      setFormData({
        numero_registro: registro.numero_registro,
        vigencia: registro.vigencia,
        fecha: registro.fecha,
        evidencia_documento: registro.evidencia_documento,
        evidencia_fotografica: registro.evidencia_fotografica,
        evidencia_textual: registro.evidencia_textual,
      });
    } else {
      // Si no hay datos, establecer el formulario con valores predeterminados
      setFormData({
        numero_registro: "",
        vigencia: "",
        fecha: "",
        evidencia_documento: "",
        evidencia_fotografica: "",
        evidencia_textual: "",
      });
    }
  }, [registrosInvima]);

  const handleSaveChanges = () => {
    const apiUrl = registrosInvima && registrosInvima.length > 0
      ? `http://127.0.0.1:5000/equipos/registros-invima/${registrosInvima[0].id}`
      : 'http://127.0.0.1:5000/equipos/registros-invima';

    const method = registrosInvima && registrosInvima.length > 0 ? 'PUT' : 'POST';

    fetch(apiUrl, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        id_equipo: id_equipo,
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
              type="text"
              name="evidencia_documento"
              value={formData.evidencia_documento}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Evidencia fotográfica:</label>
            <input
              type="text"
              name="evidencia_fotografica"
              value={formData.evidencia_fotografica}
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
            <input
              type="text"
              name="evidencia_documento"
              value={formData.evidencia_documento}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Evidencia fotográfica:</label>
            <input
              type="text"
              name="evidencia_fotografica"
              value={formData.evidencia_fotografica}
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

      )}
      <div className="button-container">
        <button type="button" onClick={handleSaveChanges}>Guardar</button>
      </div>
    </form>
  );
};

export default FormularioRegistroInvima
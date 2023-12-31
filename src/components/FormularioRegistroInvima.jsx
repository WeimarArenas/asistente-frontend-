import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FormatFecha } from '../assets/FormatDate'

function FormularioRegistroInvima({ registrosInvima, id_equipo, onCloseFormulario }) {
  const [formData, setFormData] = useState({
    numero_registro: "",
    vigencia: "",
    fecha: "",
    evidencia_documento: null,
    evidencia_fotografica: null,
    evidencia_textual: "",
  });

  const notifySuccess = () => {
    toast.success("Guardado con Exito!!", {
      position: toast.POSITION.TOP_CENTER
    });
  };

  const notifyError = () => {
    toast.error("Debe de llenar todos los datos del formulario", {
      position: toast.POSITION.TOP_CENTER
    });
  };

  useEffect(() => {
    if (registrosInvima && registrosInvima.length > 0) {
      const registro = registrosInvima[0];
      setFormData({
        numero_registro: registro.numero_registro,
        vigencia: registro.vigencia,
        fecha: registro.fecha,
        evidencia_documento: registro.evidencia_documento,
        evidencia_fotografica: registro.evidencia_fotografica,
        evidencia_textual: registro.evidencia_textual,
        id_equipo: id_equipo
      });
    } else {
      setFormData({
        numero_registro: "",
        vigencia: "",
        fecha: "",
        evidencia_documento: null,
        evidencia_fotografica: null,
        evidencia_textual: "",
        id_equipo: id_equipo
      });
    }
  }, [registrosInvima]);

  const handleInputChange = (e) => {
    const { name, type } = e.target;

    // Si es un input de tipo file, guarda el archivo en el estado
    const inputValue = type === "file" ? e.target.files[0] : e.target.value;

    setFormData({
      ...formData,
      [name]: inputValue,
    });
  };

  const handleSaveChanges = () => {
    const apiUrl = registrosInvima && registrosInvima.length > 0
      ? `http://127.0.0.1:5000/equipos/registros-invima`
      : `http://127.0.0.1:5000/equipos/registros-invima`;

    const method = registrosInvima && registrosInvima.length > 0 ? 'POST' : 'POST';

    const formDataToSend = new FormData();
    formDataToSend.append("numero_registro", formData.numero_registro);
    formDataToSend.append("vigencia", FormatFecha(formData.vigencia));
  formDataToSend.append("fecha", FormatFecha(formData.fecha));
    formDataToSend.append("evidencia_textual", formData.evidencia_textual);
    formDataToSend.append("id_equipo", id_equipo);

    if (formData.evidencia_documento) {
      formDataToSend.append("evidencia_documento", formData.evidencia_documento);
    }

    if (formData.evidencia_fotografica) {
      formDataToSend.append("evidencia_fotografica", formData.evidencia_fotografica);
    }

    fetch(apiUrl, {
      method: method,
      body: formDataToSend,
    })
      .then(response => response.json())
      .then(data => {
        console.log('Respuesta del servidor:', data);
        notifySuccess();
        setTimeout(() => {
          onCloseFormulario();
        }, 1700);
      })
      .catch(error => {
        console.error('Error al enviar la solicitud:', error);
        notifyError();
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
              type="date"
              name="vigencia"
              value={FormatFecha(formData.vigencia)}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Fecha:</label>
            <input
              type="date"
              name="fecha"
              value={FormatFecha(formData.fecha)}
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
              type="date"
              name="vigencia"
              value={FormatFecha(formData.vigencia)}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Fecha:</label>
            <input
              type="date"
              name="fecha"
              value={FormatFecha(formData.fecha)}
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

      )}
      <div className="button-container">
        <button type="button" onClick={handleSaveChanges}>Guardar</button>
        <ToastContainer />
      </div>
    </form>
  );
};

export default FormularioRegistroInvima
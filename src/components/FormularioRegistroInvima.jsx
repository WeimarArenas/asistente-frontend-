import React from "react";

function FormularioRegistroInvima ({ registrosInvima, editableFields, handleChangeEditable, handleSaveChanges }) {
    const registro = registrosInvima ? registrosInvima[0] : null;
  
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
                onChange={handleChangeEditable}
              />
            </div>
            <div className="form-group">
              <label>Vigencia:</label>
              <input
                type="text"
                name="vigencia"
                value={editableFields.vigencia || registro.vigencia}
                onChange={handleChangeEditable}
              />
            </div>
            <div className="form-group">
              <label>Fecha:</label>
              <input
                type="text"
                name="fecha"
                value={editableFields.fecha || registro.fecha}
                onChange={handleChangeEditable}
              />
            </div>
            <div className="form-group">
              <label>Documentos de evidencia:</label>
              <input
                type="text"
                name="evidencia_documento"
                value={editableFields.evidencia_documento || registro.evidencia_documento}
                onChange={handleChangeEditable}
              />
            </div>
            <div className="form-group">
              <label>Evidencia fotográfica:</label>
              <input
                type="text"
                name="evidencia_fotografica"
                value={editableFields.evidencia_fotografica || registro.evidencia_fotografica}
                onChange={handleChangeEditable}
              />
            </div>
            <div className="form-group">
              <label>Evidencia Textual:</label>
              <textarea
                name="evidencia_textual"
                value={editableFields.evidencia_textual || registro.evidencia_textual}
                onChange={handleChangeEditable}
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
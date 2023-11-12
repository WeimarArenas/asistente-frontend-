import React from 'react';

const ModalEventosEquipo = ({ eventosEquipo, editableFieldsEventos, handleChangeEditableEventos, handleSaveChanges, handleCloseModal }) => {
    const renderFormEventosEquipos = () => {

        // para obtener la fecha actual
        const obtenerFechaActual = () => {
            const fechaActual = new Date();
            const year = fechaActual.getFullYear();
            const month = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // Añade un cero inicial si es necesario
            const day = fechaActual.getDate().toString().padStart(2, '0'); // Añade un cero inicial si es necesario
            const fechaFormateada = `${year}-${month}-${day}`;

            return fechaFormateada;
        };
        const registro = eventosEquipo ? eventosEquipo[0] : null;

        const mostrarTitulo = registro == null;

        return (
            <div>
                {mostrarTitulo && (
                    <div className="form-title">
                        <h3>El equipo no cuenta con eventos</h3>
                        <p>Puede generar un nuevo evento a continuación:</p>
                    </div>
                )}
                <form className="form-container">
                    {registro ? (
                        <div>
                            <div className="form-group">
                                <label>Estado del Evento:</label>
                                <input
                                    type="text"
                                    name="estado_evento"
                                    value={editableFieldsEventos.estado_evento || registro.estado_evento}
                                    onChange={handleChangeEditableEventos}
                                />
                            </div>
                            <div className="form-group">
                                <label>Evidencia Documento:</label>
                                <input
                                    type="text"
                                    name="evidencia_documento"
                                    value={editableFieldsEventos.evidencia_documento || registro.evidencia_documento}
                                    onChange={handleChangeEditableEventos}
                                />
                            </div>
                            <div className="form-group">
                                <label>Evidencia Fotográfica:</label>
                                <input
                                    type="text"
                                    name="evidencia_fotografica"
                                    value={editableFieldsEventos.evidencia_fotografica || registro.evidencia_fotografica}
                                    onChange={handleChangeEditableEventos}
                                />
                            </div>
                            <div className="form-group">
                                <label>Evidencia Textual:</label>
                                <input
                                    type="text"
                                    name="evidencia_textual"
                                    value={editableFieldsEventos.evidencia_textual || registro.evidencia_textual}
                                    onChange={handleChangeEditableEventos}
                                />
                            </div>
                            <div className="form-group">
                                <label>Fecha:</label>
                                <input
                                    type="text"
                                    name="fecha"
                                    value={editableFieldsEventos.fecha || registro.fecha}
                                    onChange={handleChangeEditableEventos}
                                />
                            </div>
                            <div className="form-group">
                                <label>Tipo de Evento:</label>
                                <input
                                    type="text"
                                    name="tipo_evento"
                                    value={editableFieldsEventos.tipo_evento || registro.tipo_evento}
                                    onChange={handleChangeEditableEventos}
                                />
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="form-group">
                                <label>Estado del Evento:</label>
                                <input
                                    type="text"
                                    name="estado_evento"
                                    value={editableFieldsEventos.estado_evento}
                                    onChange={handleChangeEditableEventos}
                                />
                            </div>
                            <div className="form-group">
                                <label>Evidencia Documento:</label>
                                <input
                                    type="text"
                                    name="evidencia_documento"
                                    value={editableFieldsEventos.evidencia_documento}
                                    onChange={handleChangeEditableEventos}
                                />
                            </div>
                            <div className="form-group">
                                <label>Evidencia Fotográfica:</label>
                                <input
                                    type="text"
                                    name="evidencia_fotografica"
                                    value={editableFieldsEventos.evidencia_fotografica}
                                    onChange={handleChangeEditableEventos}
                                />
                            </div>
                            <div className="form-group">
                                <label>Evidencia Textual:</label>
                                <input
                                    type="text"
                                    name="evidencia_textual"
                                    value={editableFieldsEventos.evidencia_textual}
                                    onChange={handleChangeEditableEventos}
                                />
                            </div>
                            <div className="form-group">
                                <label>Fecha:</label>
                                <input
                                    type="text"
                                    name="fecha"
                                    value={obtenerFechaActual()}
                                    onChange={handleChangeEditableEventos}
                                />
                            </div>
                            <div className="form-group">
                                <label>Tipo de Evento:</label>
                                <input
                                    type="text"
                                    name="tipo_evento"
                                    value={editableFieldsEventos.tipo_evento}
                                    onChange={handleChangeEditableEventos}
                                />
                            </div>
                        </div>
                    )}
                    <div className="button-container">
                        <button type="button" onClick={handleSaveChanges}>Guardar</button>
                    </div>
                </form>
            </div>
        );
    };

    return (
        <div className='modalEventos'>
            <div>
                {renderFormEventosEquipos()}
            </div>
            <button onClick={handleCloseModal}>Cerrar eventos</button>
        </div>
    );
};

export default ModalEventosEquipo;

import React, { useState } from 'react';

const ModalEventosEquipo = ({ eventosEquipo, editableFieldsEventos, handleChangeEditableEventos, handleSaveChanges, handleCloseModal }) => {
	const [nivel, setNivel] = useState("level");
	const NivelDropdown = () => {
		return (
			<select
				name="nivel"
				value={nivel}
				onChange={(e) => setNivel(e.target.value)}
			>
				<option value=""></option>
				<option value="leve">Level</option>
				<option value="moderado">Moderado</option>
				<option value="severo">Severo</option>
			</select>
		);
	};

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
			<div className='form'>
				{mostrarTitulo && (
					<div className="form-title">
						<h3>El equipo no cuenta con eventos</h3>
						<p>Puede generar un nuevo evento a continuación:</p>
					</div>
				)}
				<form className="form">
					{registro ? (
						<div>
							<div className="form-group">
								<label>Tipo de Evento:</label>
								<NivelDropdown />
							</div>
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
						</div>
					) : (
						<div>
							<div className="form-group">
								<label>Tipo de Evento:</label>
								<NivelDropdown />
							</div>
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
						</div>
					)}
					<div className="button-container">
						<button type="button" onClick={handleSaveChanges} 
						style={ {backgroundColor: "#4CAF50", fontWeight: "600"}}
						>Guardar</button>
					</div>
				</form>
			</div>
		);
	};

	return (
		<div className='modalInteriorFormularioEventos'>
			<div>
				{renderFormEventosEquipos()}
			</div>
		</div>
	);
};

export default ModalEventosEquipo;

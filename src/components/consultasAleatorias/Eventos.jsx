import React, { useState } from 'react';

const Eventos = ({ eventosEquipo }) => {
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

		return (
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
									value={registro.estado_evento}
								/>
							</div>
							<div className="form-group">
								<label>Evidencia Documento:</label>
								<input
									type="file"
									name="evidencia_documento"
									value={registro.evidencia_documento}
								/>
							</div>
							<div className="form-group">
								<label>Evidencia Fotográfica:</label>
								<input
									type="file"
									name="evidencia_fotografica"
									value={registro.evidencia_fotografica}
								/>
							</div>
							<div className="form-group">
								<label>Evidencia Textual:</label>
								<input
									type="text"
									name="evidencia_textual"
									value={registro.evidencia_textual}
								/>
							</div>
							<div className="form-group">
								<label>Fecha:</label>
								<input
									type="text"
									name="fecha"
									value={registro.fecha}
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
									value="Sin eventos"
									
								/>
							</div>
							<div className="form-group">
								<label>Evidencia Documento:</label>
								<input
									type="file"
									name="evidencia_documento"
									
								/>
							</div>
							<div className="form-group">
								<label>Evidencia Fotográfica:</label>
								<input
									type="file"
									name="evidencia_fotografica"
									
								/>
							</div>
							<div className="form-group">
								<label>Evidencia Textual:</label>
								<input
									type="text"
									name="evidencia_textual"
									value="Sin evidencia"
								/>
							</div>
							<div className="form-group">
								<label>Fecha:</label>
								<input
									type="text"
									name="fecha"
									value={obtenerFechaActual()}
								/>
							</div>
						</div>
					)}
					<div className="button-container">
						<button type="button">Guardar</button>
					</div>
				</form>
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

export default Eventos;

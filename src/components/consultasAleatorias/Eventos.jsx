import React, { useState, useEffect } from 'react';

const ModalEventosEquipo = ({ eventosEquipo, id_equipo }) => {
	const obtenerFechaActual = () => {
		const fechaActual = new Date();
		const year = fechaActual.getFullYear();
		const month = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
		const day = fechaActual.getDate().toString().padStart(2, '0');
		const fechaFormateada = `${year}-${month}-${day}`;
		return fechaFormateada;
	};

	const [nivel, setNivel] = useState("level");
	const [formData, setFormData] = useState({
		estado_evento: "",
		evidencia_documento: null,
		evidencia_fotografica: null,
		evidencia_textual: "",
		fecha: obtenerFechaActual(),
		id_equipo: id_equipo,
	});

	useEffect(() => {
		if (eventosEquipo && eventosEquipo.length > 0) {
			const registro = eventosEquipo[0];
			setFormData({
				estado_evento: registro.estado_evento || "",
				evidencia_documento: null,
				evidencia_fotografica: null,
				evidencia_textual: registro.evidencia_textual || "",
				fecha: registro.fecha || obtenerFechaActual(),
				id_equipo: id_equipo,
			});
			setNivel(registro.tipo_evento || "leve");
		} else {
			setFormData({
				estado_evento: "",
				evidencia_documento: null,
				evidencia_fotografica: null,
				evidencia_textual: "",
				fecha: obtenerFechaActual(),
				id_equipo: id_equipo,
			});
			setNivel("level");
		}
	}, [eventosEquipo, id_equipo]);

	const NivelDropdown = () => {
		return (
			<select
				name="nivel"
				value={nivel}
				onChange={(e) => setNivel(e.target.value)}
			>
				<option value="leve">Level</option>
				<option value="moderado">Moderado</option>
				<option value="severo">Severo</option>
			</select>
		);
	};

	const handleFileChange = (e) => {
		const fieldName = e.target.name;
		const file = e.target.files[0];
		setFormData((prevData) => ({
			...prevData,
			[fieldName]: file,
		}));
	};

	const handleInputChange = (e) => {
		const fieldName = e.target.name;
		const value = e.target.value;
		setFormData((prevData) => ({
			...prevData,
			[fieldName]: value,
		}));
	};

	const handleGuardarClick = async () => {
		try {
			const url = 'http://127.0.0.1:5000/equipos/eventos';

			const formDataToSend = new FormData();
			formDataToSend.append('estado_evento', formData.estado_evento);
			formDataToSend.append('evidencia_documento', formData.evidencia_documento);
			formDataToSend.append('evidencia_fotografica', formData.evidencia_fotografica);
			formDataToSend.append('evidencia_textual', formData.evidencia_textual);
			formDataToSend.append('fecha', formData.fecha);
			formDataToSend.append('tipo_evento', nivel);
			formDataToSend.append("id_equipo", id_equipo);

			console.log('Datos del formulario:', formDataToSend);

			const response = await fetch(url, {
				method: 'POST',
				body: formDataToSend,
			});

			if (response.ok) {
				console.log('Datos enviados exitosamente');
				// Puedes realizar acciones adicionales después de enviar los datos, si es necesario
			} else {
				console.error('Error al enviar datos al servidor');
			}
		} catch (error) {
			console.error('Error en la solicitud:', error);
		}
	};

	const renderFormEventosEquipos = () => {
		const mostrarTitulo = !eventosEquipo || eventosEquipo.length === 0;

		return (
			<div className='form'>
				{mostrarTitulo && (
					<div className="form-title">
						<h3>El equipo no cuenta con eventos</h3>
						<p>Puede generar un nuevo evento a continuación:</p>
					</div>
				)}
				<form className="form">
					<div className="form-group">
						<label>Tipo de Evento:</label>
						<NivelDropdown />
					</div>
					<div className="form-group">
						<label>Estado del Evento:</label>
						<input
							type="text"
							name="estado_evento"
							value={formData.estado_evento}
							onChange={handleInputChange}
						/>
					</div>
					<div className="form-group">
						<label>Evidencia Documento:</label>
						<input
							type="file"
							name="evidencia_documento"
							onChange={handleFileChange}
						/>
					</div>
					<div className="form-group">
						<label>Evidencia Fotográfica:</label>
						<input
							type="file"
							name="evidencia_fotografica"
							onChange={handleFileChange}
						/>
					</div>
					<div className="form-group">
						<label>Evidencia Textual:</label>
						<input
							type="text"
							name="evidencia_textual"
							value={formData.evidencia_textual}
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
					<div className="button-container">
						<button
							type="button"
							style={{ backgroundColor: "#4CAF50", fontWeight: "600" }}
							onClick={handleGuardarClick}
						>
							Guardar
						</button>
					</div>
				</form>
			</div>
		);
	};

	return (
		<div className='modalInteriorFormularioEventos'>
			<div>{renderFormEventosEquipos()}</div>
		</div>
	);
};

export default ModalEventosEquipo;

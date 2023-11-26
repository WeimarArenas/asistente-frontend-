import React, { useState, useEffect } from "react";

const Mantenimientos = ({ mantenimientos, id_equipo }) => {
	const [tipoMantenimiento, setTipoMantenimiento] = useState("Tipo mantenimiento");
	const [formData, setFormData] = useState({
		estado: "",
		fecha: "",
		evidencia_documento: null,
		evidencia_fotografica: null,
		evidencia_textual: "",
	});

	const TipoMantenimiento = () => {
		return (
			<select
				name="tipoMantenimiento"
				value={tipoMantenimiento}
				onChange={(e) => setTipoMantenimiento(e.target.value)}
			>
				<option value=""></option>
				<option value="Preventivo">Preventivo</option>
				<option value="Predictivo">Predictivo</option>
				<option value="Correctivo">Correctivo</option>
			</select>
		);
	};

	useEffect(() => {
		if (mantenimientos && mantenimientos.length > 0) {
			const mantenimiento = mantenimientos[0];
			setFormData({
				estado: mantenimiento.numero_registro,
				fecha: mantenimiento.fecha,
				evidencia_documento: mantenimiento.evidencia_documento,
				evidencia_fotografica: mantenimiento.evidencia_fotografica,
				evidencia_textual: mantenimiento.evidencia_textual,
			});
		} else {
			setFormData({
				estado: "",
				fecha: "",
				evidencia_documento: null,
				evidencia_fotografica: null,
				evidencia_textual: "",
			})
		}
	}, [mantenimientos]);

	const handleSaveChanges = (e) => {
		e.preventDefault();

		const apiUrl = mantenimientos && mantenimientos.length > 0
			? `http://127.0.0.1:5000/equipos/mantenimientos`
			: `http://127.0.0.1:5000/equipos/mantenimientos`;

		const method = mantenimientos && mantenimientos.length > 0 ? 'PUT' : 'POST';

		const formDataToSend = new FormData();
		formDataToSend.append("tipo_mantenimiento", tipoMantenimiento);
		formDataToSend.append("estado", formData.estado);
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
		const inputValue = type === "file" ? e.target.files[0] : value;

		setFormData({
			...formData,
			[name]: inputValue,
		});
	};

	return (
		<div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "auto", padding: "20px" }}>
			<form className="form-container" onSubmit={handleSaveChanges}>
				{mantenimientos && mantenimientos.length > 0 ? (
					<div>
						<div className="form-group">
							<label style={{ display: "block" }}>Tipo de mantenimiento:</label>
							<TipoMantenimiento />
						</div>
						<div className="form-group">
							<label>Estado:</label>
							<input
								type="text"
								name="estado"
								value={formData.estado}
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
							<label style={{ display: "block" }}>Tipo de mantenimiento:</label>
							<TipoMantenimiento />
						</div>
						<div className="form-group">
							<label>Estado:</label>
							<input
								type="text"
								name="estado"
								value={formData.estado}
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
				)}
				<div className="button-container">
					<button type="submit">Guardar</button>
				</div>
			</form>
		</div>
	);
};

export default Mantenimientos;
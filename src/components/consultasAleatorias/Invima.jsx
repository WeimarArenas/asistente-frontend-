import React from "react";

function Invima({ registrosInvima }) {
	//const registro = registrosInvima ? registrosInvima[0] : null;
	const registro = registrosInvima[0]

	return (
		<form className="form-container">
			{registro ? (
				<div>
					<div className="form-group">
						<label>Número de Registro:</label>
						<input
							type="text"
							name="numero_registro"
							value={registro.numero_registro}
						/>
					</div>
					<div className="form-group">
						<label>Vigencia:</label>
						<input
							type="text"
							name="vigencia"
							value={registro.vigencia}
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
					<div className="form-group">
						<label>Documentos de evidencia:</label>
						<input
							type="text"
							name="evidencia_documento"
							value={registro.evidencia_documento}
 
						/>
					</div>
					<div className="form-group">
						<label>Evidencia fotográfica:</label>
						<input
							type="text"
							name="evidencia_fotografica"
							value={registro.evidencia_fotografica}
 
						/>
					</div>
					<div className="form-group">
						<label>Evidencia Textual:</label>
						<textarea
							name="evidencia_textual"
							value={registro.evidencia_textual}
							rows="4"
							cols="50"
						/>
					</div>
				</div>
			) : <div>
			<div className="form-group">
				<label>Número de Registro:</label>
				<input
					type="text"
					name="numero_registro"
					value="Numero Registro"
				/>
			</div>
			<div className="form-group">
				<label>Vigencia:</label>
				<input
					type="text"
					name="vigencia"
					value="Vigencia"
				/>
			</div>
			<div className="form-group">
				<label>Fecha:</label>
				<input
					type="text"
					name="fecha"
					value="Fecha"
				/>
			</div>
			<div className="form-group">
				<label>Documentos de evidencia:</label>
				<input
					type="text"
					name="evidencia_documento"
					value="Evidencia Documento"

				/>
			</div>
			<div className="form-group">
				<label>Evidencia fotográfica:</label>
				<input
					type="text"
					name="evidencia_fotografica"
					value="Evidencia Fotografica"

				/>
			</div>
			<div className="form-group">
				<label>Evidencia Textual:</label>
				<textarea
					name="evidencia_textual"
					value="Evidencia Textual"
					rows="4"
					cols="50"
				/>
			</div>
		</div>}
			<div className="button-container">
				<button type="button">Guardar</button>
			</div>
		</form>
	);
};

export default Invima;
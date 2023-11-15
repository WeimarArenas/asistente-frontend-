import React, { useState, useEffect } from "react";
import Header from "../components/Header";

import '../styles/consultasAleatorias.css'

function ConsultasAleatorias() {
	const [equipos, setEquipos] = useState([]);
	const [consultaAleatoria, setConsultaAleatoria] = useState([]);
	const [resultadosConsulta, setResultadosConsulta] = useState([]);
	const [tipoConsultaAleatoria, setTipoConsultaAleatoria] = useState("");

	const [registroInvima, setRegistroInvima] = useState(null);
	const [mantenimientos, setMantenimientos] = useState(null);
	const [calibraciones, setCalibraciones] = useState(null)
	const [eventos, setEventos] = useState(null)

	const arrayTypoConsultas = ["registros_invima", "mantenimientos", "eventos", "calibraciones"]

	const handleGenerarTipoConsultaAleatoria = () => {
		const tipoAleatorio =
			arrayTypoConsultas[
			Math.floor(Math.random() * arrayTypoConsultas.length)
			];
		setTipoConsultaAleatoria(tipoAleatorio);
	};

	useEffect(() => {
		// Realizar la consulta de todos los equipos al cargar el componente
		fetch("http://127.0.0.1:5000/equipos")
			.then((response) => response.json())
			.then((data) => setEquipos(data.equipos))
			.catch((error) => console.error("Error:", error));
	}, []);

	const generarNumerosAleatorios = (cantidad, rangoInicio, rangoFin) => {
		const numerosAleatorios = [];
		while (numerosAleatorios.length < cantidad) {
			const numeroAleatorio = Math.floor(
				Math.random() * (rangoFin - rangoInicio + 1) + rangoInicio
			);
			if (!numerosAleatorios.includes(numeroAleatorio)) {
				numerosAleatorios.push(numeroAleatorio);
			}
		}
		return numerosAleatorios;
	};

	const handleGenerarConsulta = () => {
		// Generar hasta 3 números aleatorios entre 1 y 2000
		const idsAleatorios = generarNumerosAleatorios(3, 1, 2000);

		// Almacenar los IDs generados en el estado
		setConsultaAleatoria(idsAleatorios);

		// Filtrar los equipos por los IDs generados
		const resultadosFiltrados = equipos.filter((equipo) =>
			idsAleatorios.includes(equipo.id)
		);

		// Almacenar los resultados filtrados en el estado
		setResultadosConsulta(resultadosFiltrados);
	};

	const handleRealizarConsulta = (idEquipo) => {
		let endpoint;

		switch (tipoConsultaAleatoria) {
			case "registros_invima":
				endpoint = `http://127.0.0.1:5000/equipos/registros-invima/${idEquipo}`;
				break;
			case "mantenimientos":
				endpoint = `http://127.0.0.1:5000/equipos/mantenimientos/${idEquipo}`;
				break;
			case "eventos":
				endpoint = `http://127.0.0.1:5000/equipos/eventos/${idEquipo}`;
				break;
			case "calibraciones":
				endpoint = `http://127.0.0.1:5000/equipos/calibraciones/${idEquipo}`;
				break;
			default:
				break;
		}

		// Verificar que se haya seleccionado un tipo de consulta aleatorio
		if (tipoConsultaAleatoria) {
			// Realizar la solicitud HTTP según el tipo de consulta
			fetch(endpoint)
				.then(response => response.json())
				.then(data => {
					// Puedes hacer algo con los resultados, por ejemplo, mostrarlos en un modal
					console.log(`Resultados de la consulta ${tipoConsultaAleatoria}:`, data[tipoConsultaAleatoria][0]);

					switch (tipoConsultaAleatoria) {
						case "registros_invima":
							setRegistroInvima(data[tipoConsultaAleatoria]);
							setEventos(null);
							setCalibraciones(null);
							setMantenimientos(null);
							break;
						case "eventos":
							setEventos(data[tipoConsultaAleatoria]);
							setRegistroInvima(null);
							setCalibraciones(null);
							setMantenimientos(null);
							break;
						case "calibraciones":
							setCalibraciones(data[tipoConsultaAleatoria]);
							setRegistroInvima(null);
							setEventos(null);
							setMantenimientos(null);
							break;
						case "mantenimientos":
							setMantenimientos(data[tipoConsultaAleatoria]);
							setRegistroInvima(null);
							setEventos(null);
							setCalibraciones(null);
							break;
						default:
							break;
					}
				})
				.catch(error => console.error('Error:', error));
		} else {
			console.error('Tipo de consulta aleatoria no seleccionado.');
		}
	};


	return (
		<div>
			<Header />
			<div className="consultasAleatoriasContainer">
				<button className="consultasAletaroriasButton" onClick={() => {
					handleGenerarConsulta();
					handleGenerarTipoConsultaAleatoria()
				}}>Generar Consulta</button>
				{consultaAleatoria.length > 0 && (
					<div>
						{resultadosConsulta.length > 0 ? (
							<table>
								<thead>
									<tr>
										<th>Nombre</th>
										<th>Marca</th>
										<th>Modelo</th>
										<th>Fecha Ingreso</th>
										<th>Propietario</th>
										<th>Riesgo</th>
										<th>Serie</th>
										<th>Tipo Consulta</th>
									</tr>
								</thead>
								<tbody>
									{resultadosConsulta.map((equipo) => (
										<tr key={equipo.id}>
											<td>{equipo.nombre}</td>
											<td>{equipo.marca}</td>
											<td>{equipo.modelo}</td>
											<td>{equipo.fecha_ingreso}</td>
											<td>{equipo.propietario}</td>
											<td>{equipo.riesgo}</td>
											<td>{equipo.serie}</td>
											<td>
												<button onClick={() => handleRealizarConsulta(equipo.id)}>
													{tipoConsultaAleatoria}
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						) : (
							<p>No hay resultados para mostrar.</p>
						)}
					</div>
				)}

				{/* Aca se debe de mostrar una tabla con los datos del equipo, 
					la tabla debe de variar en campos dependiendo del tipo de consulta */}
				{tipoConsultaAleatoria && (
					<div>
						<h2>Datos de Consulta {tipoConsultaAleatoria}</h2>
						{tipoConsultaAleatoria === "registros_invima" && registroInvima && (
							<React.Fragment>
								{registroInvima.length > 0 ? (
									<table>
										<thead>
											<tr>
												<th>Evidencia Documento</th>
												<th>Evidencia Fotográfica</th>
												<th>Evidencia Textual</th>
												<th>Fecha</th>
												<th>Número de Registro</th>
												<th>Vigencia</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>{registroInvima.evidencia_documento}</td>
												<td>{registroInvima.evidencia_fotografica}</td>
												<td>{registroInvima.evidencia_textual}</td>
												<td>{registroInvima.fecha}</td>
												<td>{registroInvima.numero_registro}</td>
												<td>{registroInvima.vigencia}</td>
											</tr>
										</tbody>
									</table>
								) : (
									<p>No hay datos de registro invima para ese equipo que se puedan mostrar.</p>
								)}
							</React.Fragment>
						)}
						{tipoConsultaAleatoria === "eventos" && eventos && (
							<React.Fragment>
								{eventos.length > 0 ? (
									<table>
										<thead>
											<tr>
												<th>Estado del Evento</th>
												<th>Evidencia Documento</th>
												<th>Evidencia Fotográfica</th>
												<th>Evidencia Textual</th>
												<th>Fecha</th>
												<th>Tipo de Evento</th>
											</tr>
										</thead>
										<tbody>
											{/* Mapea los eventos y muestra las filas correspondientes */}
											{eventos.map((evento) => (
												<tr key={evento.id}>
													<td>{evento.estado_evento}</td>
													<td>{evento.evidencia_documento}</td>
													<td>{evento.evidencia_fotografica}</td>
													<td>{evento.evidencia_textual}</td>
													<td>{evento.fecha}</td>
													<td>{evento.tipo_evento}</td>
												</tr>
											))}
										</tbody>
									</table>
								) : (
									<p>No hay datos de eventos para ese equipo para mostrar.</p>
								)}
							</React.Fragment>
						)}
						{tipoConsultaAleatoria === "calibraciones" && calibraciones && (
							<React.Fragment>
								{calibraciones.length > 0 ? (
									<table>
										<thead>
											<tr>
												<th>Estado</th>
												<th>Evidencia Documento</th>
												<th>Evidencia Fotográfica</th>
												<th>Evidencia Textual</th>
												<th>Fecha</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>{calibraciones.estado}</td>
												<td>{calibraciones.evidencia_documento}</td>
												<td>{calibraciones.evidencia_fotografica}</td>
												<td>{calibraciones.evidencia_textual}</td>
												<td>{calibraciones.fecha}</td>
											</tr>
										</tbody>
									</table>
								) : (<p>No hay datos de calibraciones de ese equipo para mostrar.</p>)}
							</React.Fragment>
						)}
						{tipoConsultaAleatoria === "mantenimientos" && mantenimientos && (
							<React.Fragment>
								{mantenimientos.length > 0 ? (
									<table>
										<thead>
											<tr>
												<th>Estado</th>
												<th>Evidencia Documento</th>
												<th>Evidencia Fotográfica</th>
												<th>Evidencia Textual</th>
												<th>Fecha</th>
												<th>Tipo de Mantenimiento</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>{mantenimientos.estado}</td>
												<td>{mantenimientos.evidencia_documento}</td>
												<td>{mantenimientos.evidencia_fotografica}</td>
												<td>{mantenimientos.evidencia_textual}</td>
												<td>{mantenimientos.fecha}</td>
												<td>{mantenimientos.tipo_mantenimiento}</td>
											</tr>
										</tbody>
									</table>
								) : (
									<p>No hay datos de mantenimientos de ese equipo.</p>
								)}
							</React.Fragment>
						)}
					</div>
				)};
			</div>
		</div>

	)
};

export default ConsultasAleatorias;

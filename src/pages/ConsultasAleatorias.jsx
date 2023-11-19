import React, { useState, useEffect } from "react";
import Header from "../components/Header";

import Invima from "../components/consultasAleatorias/Invima";

import '../styles/consultasAleatorias.css'
import Eventos from "../components/consultasAleatorias/Eventos";
import Calibracion from "../components/consultasAleatorias/Calibracion";
import Mantenimiento from "../components/consultasAleatorias/Mantenimiento";

function ConsultasAleatorias() {
	const [equipos, setEquipos] = useState([]);
	const [consultaAleatoria, setConsultaAleatoria] = useState([]);
	const [resultadosConsulta, setResultadosConsulta] = useState([]);
	const [tipoConsultaAleatoria, setTipoConsultaAleatoria] = useState("");

	const [registroInvima, setRegistroInvima] = useState(null);
	const [mantenimientos, setMantenimientos] = useState(null);
	const [calibraciones, setCalibraciones] = useState(null)
	const [eventos, setEventos] = useState(null)

	const [showModalInvima, setShowModalInvima] = useState(false);
	const [showModalEvento, setShowModalEvento] = useState(false);
	const [showModalCalibracion, setShowModalCalibracion] = useState(false);
	const [showModalMantenimiento, setShowModalMantenimiento] = useState(false);

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

	const handleRealizarConsulta = (equipo) => {
		let endpoint;

		switch (tipoConsultaAleatoria) {
			case "registros_invima":
				endpoint = `http://127.0.0.1:5000/equipos/registros-invima/${equipo.id}`;
				break;
			case "mantenimientos":
				endpoint = `http://127.0.0.1:5000/equipos/mantenimientos/${equipo.id}`;
				break;
			case "eventos":
				endpoint = `http://127.0.0.1:5000/equipos/eventos/${equipo.id}`;
				break;
			case "calibraciones":
				endpoint = `http://127.0.0.1:5000/equipos/calibraciones/${equipo.id}`;
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
					console.log(`Cantidad de datos ${data[tipoConsultaAleatoria]}`)

					switch (tipoConsultaAleatoria) {
						case "registros_invima":
							setRegistroInvima(data[tipoConsultaAleatoria]);
							setEventos(null);
							setCalibraciones(null);
							setMantenimientos(null);
							setShowModalEvento(false);
							setShowModalCalibracion(false);
							setShowModalInvima(true);

							break;
						case "eventos":
							setEventos(data[tipoConsultaAleatoria]);
							setRegistroInvima(null);
							setCalibraciones(null);
							setMantenimientos(null);
							setShowModalInvima(false);
							setShowModalCalibracion(false);
							setShowModalEvento(true);
							break;
						case "calibraciones":
							setCalibraciones(data[tipoConsultaAleatoria]);
							setRegistroInvima(null);
							setEventos(null);
							setMantenimientos(null);
							setShowModalEvento(false);
							setShowModalInvima(false);
							setShowModalCalibracion(true);
							break;
						case "mantenimientos":
							setMantenimientos(data[tipoConsultaAleatoria]);
							setRegistroInvima(null);
							setEventos(null);
							setCalibraciones(null);
							setShowModalEvento(false);
							setShowModalMantenimiento(false);
							setShowModalInvima(false);
							setShowModalMantenimiento(true);
							break;
						default:
							break;
					}
				})
				.catch(error => console.error('Error:', error));
		} else {
			console.error('Tipo de consulta aleatoria no seleccionado.');
		}
	}

	console.log("Datos de registroInvima:", registroInvima);
	console.log("Datos de eventos:", eventos);
	console.log("Datos de calibraciones:", calibraciones);
	console.log("Datos de mantenimientos:", mantenimientos);

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
							<table class="mi-tabla">
								<thead>
									<tr>
										<th>Area Equipo</th>
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
											<td>{equipo.nombre_area}</td>
											<td>{equipo.nombre}</td>
											<td>{equipo.marca}</td>
											<td>{equipo.modelo}</td>
											<td>{equipo.fecha_ingreso}</td>
											<td>{equipo.propietario}</td>
											<td>{equipo.riesgo}</td>
											<td>{equipo.serie}</td>
											<td>
												<button onClick={() => handleRealizarConsulta(equipo)}>
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
						{tipoConsultaAleatoria === "registros_invima" && showModalInvima &&
							<div className="ConsultaAleatoriaModalInvima">
								<Invima registrosInvima={registroInvima} />
							</div>
						}
						{tipoConsultaAleatoria === "eventos" && showModalEvento && (
						<div>
							<Eventos eventosEquipo={eventos}/>
						</div>)}
						{tipoConsultaAleatoria === "calibraciones" && showModalCalibracion && (
							<div className="ConsultaAleatoriaModalInvima">
								<Calibracion calibraciones={calibraciones}/>
							</div>
						)}
						{tipoConsultaAleatoria === "mantenimientos" && showModalMantenimiento && (
							<div className="ConsultaAleatoriaModalInvima">
								<Mantenimiento mantenimientos={mantenimientos}/>
							</div>
						)}
					</div>
				)}

				{(showModalInvima || showModalEvento || showModalCalibracion || showModalMantenimiento) && 
				(
					<div className="cerrarModales">
						<button onClick={() => {
							setShowModalInvima(false); 
							setShowModalEvento(false);
							setShowModalCalibracion(false);
							setShowModalMantenimiento(false);
						}}
							>Cerrar</button>
						</div>
				)}
			</div>
		</div>
	)
};

export default ConsultasAleatorias;

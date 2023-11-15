import React, { useState, useEffect } from "react";
import Header from "../components/Header";

import '../styles/consultasAleatorias.css'

function ConsultasAleatorias() {
	const [equipos, setEquipos] = useState([]);
	const [consultaAleatoria, setConsultaAleatoria] = useState([]);
	const [resultadosConsulta, setResultadosConsulta] = useState([]);
	const [tipoConsultaAleatoria, setTipoConsultaAleatoria] = useState("");

	const arrayTypoConsultas = ["registros_invima", "mantenimiento", "eventos", "calibraciones"]

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
			</div>
		</div>
	);
}

export default ConsultasAleatorias;

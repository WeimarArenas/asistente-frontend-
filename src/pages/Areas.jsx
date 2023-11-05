import React, { useState } from 'react';
// impor del componente
import Header from '../components/Header';
// import de los estilos
import '../styles/areas.css'

function Areas() {
	const [areas, setAreas] = useState([]);
	const [showModal, setShowModal] = useState(false);

	// componentes para los equipos por areas
	const [selectedEquipo, setSelectedEquipo] = useState(null);

	// esta se usará para ir consultando los datos de la tabla que trae los equipos que pertenececen a un area
	const [query, setQuery] = useState('');

	//Para que la busqueda pueda darse sin necesidad de tomar en cuenta mayusculas y minusculas
	const filteredEquipos = selectedEquipo && selectedEquipo.length > 0 ? selectedEquipo.filter(equipo => {
		return equipo.nombre.toLowerCase().includes(query.toLowerCase());
	}) : [];

	// espacio de busqueda que estará leyendo cada letra ingresada y filtrando los datos
	const handleSearchChange = (e) => {
		setQuery(e.target.value);
	};


	const handleConsultarAreas = () => {
		fetch('http://127.0.0.1:5000/areas')
			.then(response => response.json())
			.then(data => setAreas(data.areas))
			.catch(error => console.error('Error:', error));

		setShowModal(true);
	};

	const handleAreaClick = (id) => {
		fetch(`http://127.0.0.1:5000/areas/equipos/${id}`)
			.then(response => response.json())
			.then(data => {
				setSelectedEquipo(data.equipos);
			})
			.catch(error => console.error('Error:', error));

		setShowModal(false);
	};

	return (
		<div>
			<Header />
			<div className="containerButton">
				<button onClick={handleConsultarAreas}>Consultar áreas</button>
			</div>

			{showModal && (
				<div className="modal">
					<ul className='modalAreasList'>
						{areas.map(area => (
							<li className='modalAreasItems' key={area.id} onClick={() => handleAreaClick(area.id)}>
								{area.nombre_area}
							</li>
						))}
					</ul>
					<div className='modalButtonOut'>
						<button onClick={() => setShowModal(false)}>Salir</button>
					</div>
				</div>
			)}

			<div className='containerBarraBusqueda'>
				<input
					type="text"
					placeholder="Buscar por nombre"
					value={query}
					onChange={handleSearchChange}
					/>
			</div>

			{selectedEquipo && selectedEquipo.length > 0 && (
				<div className="table-container">
					<table>
						<thead>
							<tr>
								<th>Nombre</th>
								<th>Marca</th>
								<th>Modelo</th>
								<th>Serie</th>
								<th>Propietario</th>
								<th>Fecha de Fabricación</th>
								<th>Fecha de Ingreso</th>
								<th>Condición de Ingreso</th>
								<th>Riesgo</th>
							</tr>
						</thead>
						<tbody>
							{filteredEquipos.map(equipo => (
								<tr key={equipo.id}>
									<td>{equipo.nombre}</td>
									<td>{equipo.marca}</td>
									<td>{equipo.modelo}</td>
									<td>{equipo.serie}</td>
									<td>{equipo.propietario}</td>
									<td>{equipo.fecha_fabricacion}</td>
									<td>{equipo.fecha_ingreso}</td>
									<td>{equipo.condicion_ingreso}</td>
									<td>{equipo.riesgo}</td>
								</tr>
							))}

						</tbody>
					</table>
				</div>
			)}

		</div>
	);
}

export default Areas;

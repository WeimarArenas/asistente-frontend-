import React, { useState } from 'react';
// impor del componente
import Header from '../components/Header';
// import de los estilos
import '../styles/areas.css'

function Areas() {
	const [areas, setAreas] = useState([]);
	const [showModal, setShowModal] = useState(false);

	// modal de informacion de cada equipo consultado
	const [showModalEquipo, setShowModalEquipo] = useState(false);
	const [selectedEquipoInfo, setSelectedEquipoInfo] = useState(null);


	// componentes para los equipos por areas
	const [selectedEquipo, setSelectedEquipo] = useState(null);

	// esta se usará para ir consultando los datos de la tabla que trae los equipos que pertenececen a un area
	const [query, setQuery] = useState('');

	//Para que la busqueda pueda darse sin necesidad de tomar en cuenta mayusculas y minusculas
	const filteredEquipos = selectedEquipo && selectedEquipo.length > 0 ? selectedEquipo.filter(equipo => {
		return equipo.nombre.toLowerCase().includes(query.toLowerCase());
	}) : [];

	// almacenar el estado de la consulta actual de las 4 posibles consultas que se le hacen al equipo
	const [selectedConsulta, setSelectedConsulta] = useState(null);

	// Si el tipo de consulta es para registro invima
	const [registrosInvima, setRegistrosInvima] = useState(null);
	const [showTablaRegistrosInvima, setShowTablaRegistrosInvima] = useState(false);

	// logica para el form del invima
	const [editableFields, setEditableFields] = useState({
  	numero_registro: "",
  	vigencia: "",
  	fecha: ""
	});

	const handleChangeEditable = (e) => {
  	const { name, value } = e.target;
  	setEditableFields({ ...editableFields, [name]: value });
	};

	const handleSaveChanges = () => {
  	// Aquí puedes implementar la lógica para guardar los cambios
  	// Por ejemplo, puedes hacer una petición al servidor para actualizar los datos.
	};

	// formulario invima
	const renderFormularioRegistrosInvima = () => {
		const registro = registrosInvima ? registrosInvima[0] : null; // Verificar si registrosInvima está definido
	
		return (
			<form>
				{registro && (
					<div>
						<div>
							<label>Número de Registro:</label>
							<input
								type="text"
								name="numero_registro"
								value={editableFields.numero_registro || registro.numero_registro}
								onChange={handleChangeEditable}
							/>
						</div>
						<div>
							<label>Vigencia:</label>
							<input
								type="text"
								name="vigencia"
								value={editableFields.vigencia || registro.vigencia}
								onChange={handleChangeEditable}
							/>
						</div>
						<div>
							<label>Fecha:</label>
							<input
								type="text"
								name="fecha"
								value={editableFields.fecha || registro.fecha}
								onChange={handleChangeEditable}
							/>
						</div>
					</div>
				)}
				<button type="button" onClick={handleSaveChanges}>Guardar</button>
			</form>
		);
	};
	

	// espacio de busqueda que estará leyendo cada letra ingresada y filtrando los datos
	const handleSearchChange = (e) => {
		setQuery(e.target.value);
	};

	// controlar la partura del modal que muestra la informacion del equipo consultado del area
	const openModal = (equipoInfo) => {
		setShowModalEquipo(true);
		setSelectedEquipoInfo(equipoInfo);
	};

	const closeModal = () => {
		setShowModalEquipo(false);
		setSelectedEquipoInfo(null);
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
				console.log(data)
			})
			.catch(error => console.error('Error:', error));

		setShowModal(false);
	};

	// hangler de los 4 tipos de consultas posibles
	const handleConsultaClick = (tipoConsulta) => {
		setSelectedConsulta(tipoConsulta);

		// Hacer la solicitud HTTP según el tipo de consulta
		const idEquipo = selectedEquipoInfo.id; // Obtener el ID del equipo
		let endpoint;

		switch (tipoConsulta) {
			case "invima":
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
		};

		fetch(endpoint)
			.then(response => response.json())
			.then(data => {
				switch (tipoConsulta) {
					case "invima":
						setRegistrosInvima(data.registros_invima);
						setShowTablaRegistrosInvima(true);
						break;
					// ... (otros casos)
					default:
						break;
				}
			})
			.catch(error => console.error('Error:', error));
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
								<tr key={equipo.id} onClick={() => openModal(equipo)}>
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

			{/* Aca va el modal que mostrará la informacion que puede consultar de cada equipo */}
			{showModalEquipo && (
				<div className="modalConsultasEquipo">
					<div className="modal-content">
						{selectedEquipoInfo && (
							<div className='modal-content-consultas'>
								<div className='modal-content-consulta-tittle'>
									<p>Nombre Equipo: {selectedEquipoInfo.nombre}</p>
								</div>
								<div className='modal-content-consulta-buttons'>
									<button onClick={() => handleConsultaClick("invima")}>Revisar registro invima</button>
									<button onClick={() => handleConsultaClick("mantenimientos")}>Mantenimientos</button>
									<button onClick={() => handleConsultaClick("eventos")}>Eventos</button>
									<button onClick={() => handleConsultaClick("calibraciones")}>Calibraciones</button>
								</div>
								{/* Agrega más campos de información según tus necesidades */}
							</div>
						)}
						<div className='modal-content-consulta-button-close'>
							<button onClick={closeModal}>Cerrar Modal</button>
						</div>
					</div>
				</div>
			)}

			{/* Aca iran los modales para los 4 tipos de consultas*/}
			{showTablaRegistrosInvima && (
        <div className="modalFormularioRegistrosInvima">
          <div className="modal-content">
            <div className="modal-content-consultas">
              <h2>Registros Invima</h2>
              {renderFormularioRegistrosInvima(registrosInvima ? registrosInvima[0] : null)}
            </div>
            <div className='modal-content-consulta-button-close'>
              <button onClick={() => setShowTablaRegistrosInvima(false)}>Cerrar Formulario</button>
            </div>
          </div>
        </div>
      )}

		</div>
	);
}

export default Areas;

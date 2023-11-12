import React, { useState } from 'react';

// importo los componentes
import Header from '../components/Header';
import ModalAreas from '../components/ModalAreas';
import TablaEquiposAreas from '../components/TablaEquiposAreas';

// import de los estilos
import '../styles/areas.css'
import FormularioRegistroInvima from '../components/FormularioRegistroInvima';
import ModalEventosEquipo from '../components/ModalEventosEquipo';

function Areas() {
  const [areas, setAreas] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // modal de informacion de cada equipo consultado
  const [showModalEquipo, setShowModalEquipo] = useState(false);
  const [selectedEquipoId, setSelectedEquipoId] = useState(null);

  // Guardo los equipos consultados por areas
  const [equipoByArea, setEquipoByArea] = useState(null)

  // Si el tipo de consulta es para registro invima
  const [registrosInvima, setRegistrosInvima] = useState(null);
  const [showTablaRegistrosInvima, setShowTablaRegistrosInvima] = useState(false);


  // Si el tipo de consulta es para eventos
  const [eventosEquipo, setEventosEquipos] = useState(null)
  const [showModalEventosEquipo, setShowModalEventosEquipo] = useState(false);

  // opciones
  const [confirmacionVigencia, setConfirmacionVigencia] = useState(null);
  const [generarEventoEquipo, setGenerarEventoEquipo] = useState(null);

  // Edicion del form de registro invima
  const [editableFields, setEditableFields] = useState({
    numero_registro: "",
    vigencia: "",
    fecha: "",
    evidencia_textual: "El equipo no cuenta con evidencia textual, por favor inserte una",
    evidencia_documento: "No se dispone de documentos",
    evidencia_fotografica: "No se dispone evidencias fotograficas"
  });

  // edicion del form de eventos de equipo
  const [editableFieldsEventos, setEditableFieldsEventos] = useState({
    fecha: Date.now
  })

  const handleChangeEditable = (e) => {
    const { name, value } = e.target;
    setEditableFields({ ...editableFields, [name]: value });
  };

  const handleChangeEditableEventos = (e) => {
    const { name, value } = e.target;
    setEditableFieldsEventos({ ...editableFieldsEventos, [name]: value });
  };

  const handleSaveChanges = () => {
  };

  // render formulario de registro invima
  const renderFormularioRegistrosInvima = () => {
    const registro = registrosInvima ? registrosInvima[0] : null; // Verificar si registrosInvima está definido

    if (registro == null) {
      return (
        <div>
          <p>El equipo no cuenta con eventos</p>
        </div>
      )
    }

    return (
      <FormularioRegistroInvima
        registrosInvima={registrosInvima}
        editableFields={editableFields}
        handleChangeEditable={handleChangeEditable}
        handleSaveChanges={handleSaveChanges}
      />
    );
  };

  // render form de eventos de los equipos
  const renderModalEventosEquipo = () => {


    return (
      <ModalEventosEquipo
        eventosEquipo={eventosEquipo}
        editableFieldsEventos={editableFieldsEventos}
        handleChangeEditableEventos={handleChangeEditableEventos}
        handleSaveChanges={handleSaveChanges}
        handleCloseModal={() => setShowModalEventosEquipo(false)}
      />
    );
  };

  // controlar la partura del modal que muestra la informacion del equipo consultado del area
  const openModal = (equipoId) => {
    setShowModalEquipo(true);
    console.log(equipoId)
    setSelectedEquipoId(equipoId);
  };

  const closeModal = () => {
    setShowModalEquipo(false);
    setSelectedEquipoId(null);
  };

  const handleEquipoClick = (equipoId) => {
    openModal(equipoId);
    // Puedes realizar otras acciones según sea necesario
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
        setEquipoByArea(data.equipos);
        console.log(data)
      })
      .catch(error => console.error('Error:', error));

    setShowModal(false);
  };

  // hangler de los 4 tipos de consultas posibles
  const handleConsultaClick = (tipoConsulta) => {

    // Hacer la solicitud HTTP según el tipo de consulta
    const idEquipo = selectedEquipoId.id; // Obtener el ID del equipo
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
          case "eventos":
            setEventosEquipos(data.eventos);
            setShowModalEventosEquipo(true)
            break;
          // ... (otros casos)
          default:
            break;
        }
      })
      .catch(error => console.error('Error:', error));
  };

  const handleChange = (e) => {
    setConfirmacionVigencia(prevValue => !prevValue); // Cambia el valor de true a false y viceversa

    // Agregar la llamada a handleConsultaClick si confirmacionVigencia es false
    if (confirmacionVigencia) {
      handleConsultaClick("invima");
    }
  };

  return (
    <div>
      <Header />
      <div className="containerButton">
        <button onClick={handleConsultarAreas}>Consultar áreas</button>
      </div>

      {showModal && <ModalAreas areas={areas} handleAreaClick={handleAreaClick} setShowModal={setShowModal} />}

      {/* Tabla que muestra los datos de los equipos por areas */}
      {equipoByArea && equipoByArea.length > 0 && (<TablaEquiposAreas filteredEquipos={equipoByArea} onEquipoClick={handleEquipoClick} />)}

      {/* Aca va el modal que mostrará la informacion que puede consultar del equipo seleccionado */}
      {showModalEquipo && (
        <div className="modalConsultasEquipo">
          <div className="modal-content">
            {selectedEquipoId && (
              <div className='modal-content-consultas'>
                <div className='modal-content-consulta-tittle'>
                  <p>Nombre Equipo: {selectedEquipoId.nombre}</p>
                </div>
                <div className='modal-content-consulta-buttons'>
                  <button onClick={() => {
                    setShowTablaRegistrosInvima(true);
                    handleConsultaClick("invima");
                  }}>Registro Invima</button>

                  <button onClick={() => {
                    handleConsultaClick("mantenimientos");
                  }}>Mantenimientos</button>
                  <button onClick={() => {
                    setShowModalEventosEquipo(true);
                    handleConsultaClick("eventos")
                  }}>Eventos</button>
                  <button onClick={() => handleConsultaClick("calibraciones")}>Calibraciones</button>
                </div>
              </div>
            )}
            <div className='modal-content-consulta-button-close'>
              <button onClick={closeModal}>Cerrar</button>
            </div>
          </div>
        </div>
      )}

      {/* Para mostrar el modal de la consulta de registro invima */}
      {showTablaRegistrosInvima && (
        <div className="modalFormularioRegistrosInvima">
          <div className="modal-content">
            <div className="modal-content-consultas">
              <div className='modal-content-consultas-title'>
                <h2>Registros Invima</h2>
              </div>
              <div>
                <p>Esta vigente</p>
                <label>
                  <input
                    type="radio"
                    value="si"
                    checked={confirmacionVigencia === true}
                    onChange={handleChange}
                  />
                  Sí
                </label>
                <label>
                  <input
                    type="radio"
                    value="no"
                    checked={confirmacionVigencia === false}
                    onChange={handleChange}
                  />
                  No
                </label>
                {confirmacionVigencia === true && renderFormularioRegistrosInvima()}
              </div>
              {confirmacionVigencia === false && <p>Todo está actualizado</p>}
            </div>
            <div className='modal-content-consulta-button-close'>
              <button onClick={() => {
                setShowTablaRegistrosInvima(false);
                setConfirmacionVigencia(null);
              }}>Cerrar Formulario</button>
            </div>
          </div>
        </div>
      )}

      {/* Para mostrar el modal de la consulta de eventos */}
      {showModalEventosEquipo && (
        <div className="modalFormularioRegistrosInvima">
          <div>
            <label>
              <input
                type="radio"
                checked={generarEventoEquipo === false}
                onChange={handleChange}
              />
              Conocer Eventos
            </label>
            <label>
              <input
                type="radio"
                value="no"
                checked={generarEventoEquipo === false}
                onChange={handleChange}
              />
              Generar evento
            </label>
            {generarEventoEquipo === false && renderModalEventosEquipo()}
          </div>
          {generarEventoEquipo === true && <p>Todo está actualizado</p>}
        </div>
      )}
    </div>
  );
}

export default Areas;

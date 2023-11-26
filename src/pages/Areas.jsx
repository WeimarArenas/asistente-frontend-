import React, { useState, useEffect } from 'react';

// importo los componentes
import Header from '../components/Header';
import ModalAreas from '../components/ModalAreas';
import TablaEquiposAreas from '../components/TablaEquiposAreas';
import FormularioRegistroInvima from '../components/FormularioRegistroInvima';
import ModalEventosEquipo from '../components/ModalEventosEquipo';
import Mantenimientos from '../components/Matenimientos';
import Calibraciones from '../components/Calibraciones';

// import de los estilos
import '../styles/areas.css'

function Areas() {
  const [areas, setAreas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalEquipo, setShowModalEquipo] = useState(false);
  const [selectedEquipoId, setSelectedEquipoId] = useState(null);
  const [equipoByArea, setEquipoByArea] = useState(null);

  const [tipoConsulta, setTipoConsulta] = useState(null);
  const [confirmacionVigencia, setConfirmacionVigencia] = useState(null);
  const [generarEventoEquipo, setGenerarEventoEquipo] = useState(null);

  const [registrosInvima, setRegistrosInvima] = useState(null);
  const [showTablaRegistrosInvima, setShowTablaRegistrosInvima] = useState(false);
  const [eventosEquipo, setEventosEquipos] = useState(null);
  const [showModalEventosEquipo, setShowModalEventosEquipo] = useState(false);

  const [dataMantenimeintos, setDataMantenimiento] = useState(null);
  const [showModalMantenimientos, setShowModalMantenimientos] = useState(false);

  const [dataCalibraciones, setDataCalibraciones] = useState(null);
  const [showModalCalibraciones, setShowModalCalibraciones] = useState(false);


  // render formulario de registro invima
  const renderFormularioRegistrosInvima = () => {
    return (
      <FormularioRegistroInvima
        registrosInvima={registrosInvima}
        id_equipo={selectedEquipoId.id}
      />
    );
  };

  // render form de eventos de los equipos
  const renderModalEventosEquipo = () => {


    return (
      <ModalEventosEquipo
        eventosEquipo={eventosEquipo}
        id_equipo={selectedEquipoId.id}
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
          case "mantenimientos":
            setDataMantenimiento(data.mantenimientos);
            showModalMantenimientos(true)
            break;
          case "calibraciones":
            setDataCalibraciones(data.eventos);
            showModalCalibraciones(true)
            break;
          default:
            break;
        }
      })
      .catch(error => console.error('Error:', error));
  };

  const handleChange = () => {
    setConfirmacionVigencia(prevValue => !prevValue);

    if (confirmacionVigencia) {
      handleConsultaClick("invima");
    } else {
      console.log("No")
    }
  };

  useEffect(() => {
    if (selectedEquipoId) {
      handleConsultaClick();
    }
  }, [tipoConsulta, selectedEquipoId]);

  return (
    <div>
      <Header />
      <div className="containerButton">
        <button onClick={handleConsultarAreas}>Consultar áreas</button>
      </div>

      {showModal && <ModalAreas areas={areas} handleAreaClick={handleAreaClick} setShowModal={setShowModal} />}
      {equipoByArea && equipoByArea.length > 0 && (
        <TablaEquiposAreas filteredEquipos={equipoByArea} onEquipoClick={handleEquipoClick} />
      )}

      {/* Aca va el modal que mostrará la informacion que puede consultar del equipo seleccionado */}
      {showModalEquipo && (
        <div className="modalConsultasEquipo">
          <div className="modal-content">
            {selectedEquipoId && (
              <div className='modal-content-consultas'>
                <div className='modal-content-consulta-tittle'>
                  <p>Nombre Equipo: {selectedEquipoId.nombre}</p>
                  <p>Serie Equipo: {selectedEquipoId.serie}</p>
                </div>
                <div className='modal-content-consulta-buttons'>
                  <button onClick={() => {
                    setShowTablaRegistrosInvima(true);
                    handleConsultaClick("invima");
                  }}>Registro Invima</button>

                  <button onClick={() => {
                    handleConsultaClick("mantenimientos");
                    setShowModalMantenimientos(true)
                  }}>Mantenimientos</button>
                  <button onClick={() => {
                    setShowModalEventosEquipo(true);
                    handleConsultaClick("eventos")
                    setGenerarEventoEquipo(true)
                  }}>Eventos</button>
                  <button onClick={() => {
                    setShowModalCalibraciones(true)
                    handleConsultaClick("calibraciones")
                    }}>Calibraciones</button>
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
                    checked={confirmacionVigencia === false}
                    onChange={handleChange}
                  />
                  Sí
                </label>
                <label>
                  <input
                    type="radio"
                    value="no"
                    checked={confirmacionVigencia === true}
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
        <div className="modalFormularioEventos">
          <p className='modalFormularioEventosTittle'>Eventos: {selectedEquipoId.nombre}</p>
          <p>Serie: {selectedEquipoId.serie}</p>
          <div className='modalesEventos'>
            {generarEventoEquipo === true && renderModalEventosEquipo()}
          </div>
          <div className='cerrarConsultaEvento'>
            <button onClick={() => {
              setShowModalEventosEquipo(false);
              setEventosEquipos(false);
              setGenerarEventoEquipo(null)
            }}>Cerrar Formulario</button>
          </div>
        </div>
      )}

      {/* Modal para el formulario y consultas de mantenimientos */}
      {showModalMantenimientos && (
        <div className='modalMantenimientos'>
          <div>
            <Mantenimientos 
              mantenimientos={dataMantenimeintos} 
              id_equipo={selectedEquipoId.id}
            />
          </div>
          <div className='modalMnatenimimientosButtonContainer'>
            <button onClick={() => {setShowModalMantenimientos(false)}}>Cerrar</button>
          </div>
        </div>
      )}

      {/*Modal de formulario de calibraciones */}
      {showModalCalibraciones && (
        <div className='modalMantenimientos'>
          <Calibraciones calibraciones={dataCalibraciones} />
          <div className='modalMnatenimimientosButtonContainer'>
          <button onClick={() => {
            setShowModalCalibraciones(false)
          }}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Areas;
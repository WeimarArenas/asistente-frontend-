import React from "react";

function ModalAreas({areas, handleAreaClick, setShowModal}){
    return(
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
    );
};

export default ModalAreas;
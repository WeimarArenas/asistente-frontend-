import React, { useState } from "react";

const Mantenimientos = ({ mantenimientos, onSaveChanges }) => {
    const [tipoMantenimiento, setTipoMantenimiento] = useState("");
    const [estado, setEstado] = useState("");
    const [fecha, setFecha] = useState("");
    const [evidenciaFotografica, setEvidenciaFotografica] = useState("");
    const [evidenciaTextual, setEvidenciaTextual] = useState("");
    const [evidenciaDocumento, setEvidenciaDocumento] = useState("");

    const handleSave = () => {
        onSaveChanges({
            tipo_mantenimiento: "",
            estado: "",
            fecha: "",
            evidencia_fotografica: "",
            evidencia_textual: "",
            evidencia_documento: "",
            id_equipo: "",
        });
    };
    return (
        <div>
            <h2>Mantenimientos</h2>
            {mantenimientos && mantenimientos.length > 0 ? (
                mantenimientos.map((mantenimiento) => (
                    <div key={mantenimiento.id}>
                        <p>Estado: {mantenimiento.estado}</p>
                        <p>Tipo de mantenimiento: {mantenimiento.tipo_mantenimiento}</p>
                        <p>Fecha: {new Date(mantenimiento.fecha).toLocaleDateString()}</p>
                        <p>Evidencia textual: {mantenimiento.evidencia_textual}</p>
                        <p>Evidencia documento: {mantenimiento.evidencia_documento}</p>
                        <p>Evidencia fotográfica: {mantenimiento.evidencia_fotografica}</p>
                    </div>
                ))
            ) : (
                <div>
                    <h3>No hay mantenimientos registrados</h3>
                    <h4>Ingrese un nuevo mantenimiento</h4>
                    {/* Formulario para ingresar nuevos datos */}
                    <label>Tipo de mantenimiento:</label>
                    <input
                        type="text"
                        value={tipoMantenimiento}
                        onChange={(e) => setTipoMantenimiento(e.target.value)}
                    />
                    <label>Estado:</label>
                    <input
                        type="text"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                    />
                    <label>Fecha:</label>
                    <input
                        type="text"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                    />
                    <label>Evidencia fotográfica:</label>
                    <input
                        type="text"
                        value={evidenciaFotografica}
                        onChange={(e) => setEvidenciaFotografica(e.target.value)}
                    />
                    <label>Evidencia textual:</label>
                    <input
                        type="text"
                        value={evidenciaTextual}
                        onChange={(e) => setEvidenciaTextual(e.target.value)}
                    />
                    <label>Evidencia documento:</label>
                    <input
                        type="text"
                        value={evidenciaDocumento}
                        onChange={(e) => setEvidenciaDocumento(e.target.value)}
                    />
                    <button onClick={handleSave}>Guardar</button>
                </div>
            )}
        </div>
    )
};

export default Mantenimientos
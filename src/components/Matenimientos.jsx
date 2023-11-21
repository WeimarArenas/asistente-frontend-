import React, { useState } from "react";

const Mantenimientos = ({ mantenimientos, onSaveChanges }) => {
    const [tipoMantenimiento, setTipoMantenimiento] = useState("Tipo mantenimiento");
    const [estado, setEstado] = useState("");
    const [fecha, setFecha] = useState("");
    const [evidenciaFotografica, setEvidenciaFotografica] = useState("");
    const [evidenciaTextual, setEvidenciaTextual] = useState("");
    const [evidenciaDocumento, setEvidenciaDocumento] = useState("");

    const TipoMantenimiento = () => {
        return (
            <select
                name="tipoMantenimiento"
                value={tipoMantenimiento}
                onChange={(e) => setTipoMantenimiento(e.target.value)}
            >
                <option value=""></option>
                <option value="Preventivo">Preventivo</option>
                <option value="Predictivo">Predictivo</option>
                <option value="Correctivo">Correctivo</option>
            </select>
        );
    };

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
        <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "auto", padding: "20px" }}>
            <h2>Mantenimientos</h2>
            {mantenimientos && mantenimientos.length > 0 ? (
                mantenimientos.map((mantenimiento) => (
                    <div key={mantenimiento.id} style={{ marginBottom: "15px", border: "1px solid #ccc", padding: "10px" }}>
                        <p><strong>Estado:</strong> {mantenimiento.estado}</p>
                        <p><strong>Tipo de mantenimiento:</strong> {mantenimiento.tipo_mantenimiento}</p>
                        <p><strong>Fecha:</strong> {new Date(mantenimiento.fecha).toLocaleDateString()}</p>
                        <p><strong>Evidencia textual:</strong> {mantenimiento.evidencia_textual}</p>
                        <p><strong>Evidencia documento:</strong> {mantenimiento.evidencia_documento}</p>
                        <p><strong>Evidencia fotográfica:</strong> {mantenimiento.evidencia_fotografica}</p>
                    </div>
                ))
            ) : (
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                    <h3>No hay mantenimientos registrados</h3>
                    <h4>Ingrese un nuevo mantenimiento</h4>
                    <label style={{ display: "block" }}>Tipo de mantenimiento:</label>
                    <TipoMantenimiento />
                    <label style={{ display: "block" }}>Estado:</label>
                    <input
                        type="text"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                        style={{ width: "100%", padding: "8px", margin: "5px 0", boxSizing: "border-box" }}
                    />
                    <label style={{ display: "block" }}>Fecha:</label>
                    <input
                        type="text"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        style={{ width: "100%", padding: "8px", margin: "5px 0", boxSizing: "border-box" }}
                    />
                    <label style={{ display: "block" }}>Evidencia fotográfica:</label>
                    <input
                        type="text"
                        value={evidenciaFotografica}
                        onChange={(e) => setEvidenciaFotografica(e.target.value)}
                        style={{ width: "100%", padding: "8px", margin: "5px 0", boxSizing: "border-box" }}
                    />
                    <label style={{ display: "block" }}>Evidencia textual:</label>
                    <input
                        type="text"
                        value={evidenciaTextual}
                        onChange={(e) => setEvidenciaTextual(e.target.value)}
                        style={{ width: "100%", padding: "8px", margin: "5px 0", boxSizing: "border-box" }}
                    />
                    <label style={{ display: "block" }}>Evidencia documento:</label>
                    <input
                        type="text"
                        value={evidenciaDocumento}
                        onChange={(e) => setEvidenciaDocumento(e.target.value)}
                        style={{ width: "100%", padding: "8px", margin: "5px 0", boxSizing: "border-box" }}
                    />
                    <button style={{ padding: "10px 20px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px", fontWeight: "600" }} onClick={handleSave}>
                        Guardar
                    </button>
                </div>
            )}
        </div>
    )
};

export default Mantenimientos
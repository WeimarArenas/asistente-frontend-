import React, { useState, useEffect } from 'react';
import '../styles/modalCalibraciones.css'

const Calibraciones = ({ calibraciones }) => {
    const [estado, setEstado] = useState("");
    const [evidenciaDocumento, setEvidenciaDocumento] = useState("");
    const [evidenciaFotografica, setEvidenciaFotografica] = useState("");
    const [evidenciaTextual, setEvidenciaTextual] = useState("");
    const [fecha, setFecha] = useState("");

    useEffect(() => {

        if (calibraciones && calibraciones.length > 0) {
            const ultimaCalibracion = calibraciones[calibraciones.length - 1];
            setEstado(ultimaCalibracion.estado);
            setEvidenciaDocumento(ultimaCalibracion.evidencia_documento);
            setEvidenciaFotografica(ultimaCalibracion.evidencia_fotografica);
            setEvidenciaTextual(ultimaCalibracion.evidencia_textual);
            setFecha(ultimaCalibracion.fecha);
        } else {
            setEstado("");
            setEvidenciaDocumento("");
            setEvidenciaFotografica("");
            setEvidenciaTextual("");
            setFecha("");
        }
    }, [calibraciones]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos enviados:", {
            estado,
            evidenciaDocumento,
            evidenciaFotografica,
            evidenciaTextual,
            fecha,
        });
    };

    return (
        <div className="calibraciones-container">
            <h2>Calibraciones</h2>
            <form onSubmit={handleSubmit} className="calibraciones-form">
                <label className="form-label">Estado:</label>
                <input type="text" value={estado} onChange={(e) => setEstado(e.target.value)} className="form-input" />

                <label className="form-label">Evidencia Documento:</label>
                <input type="text" value={evidenciaDocumento} onChange={(e) => setEvidenciaDocumento(e.target.value)} className="form-input" />

                <label className="form-label">Evidencia Fotográfica:</label>
                <input type="text" value={evidenciaFotografica} onChange={(e) => setEvidenciaFotografica(e.target.value)} className="form-input" />

                <label className="form-label">Evidencia Textual:</label>
                <input type="text" value={evidenciaTextual} onChange={(e) => setEvidenciaTextual(e.target.value)} className="form-input" />

                <label className="form-label">Fecha:</label>
                <input type="text" value={fecha} onChange={(e) => setFecha(e.target.value)} className="form-input" />

                <button type="submit" className="form-button">Guardar</button>
            </form>
        </div>
    );
};

export default Calibraciones;

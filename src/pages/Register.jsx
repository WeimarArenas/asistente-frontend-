import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Estilos del formulario
import '../styles/register.css'

function Register() {
    const navigate = useNavigate();

    // Estados para los campos del formulario
    const [nombre, setNombre] = useState("");
    const [clave, setClave] = useState("");
    const [correo, setCorreo] = useState("");

    // Estado para controlar la visibilidad del modal de éxito
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Función para manejar el registro
    const handleRegister = async () => {

        // validar que los campos del formular no esten vacios
        if (!nombre || !clave || !correo) {
            console.error("Todos los campos son obligatorios");
            return;
        }

        // Construir el objeto de usuario a enviar al servidor
        const newUser = {
            nombre: nombre,
            clave: clave,
            correo: correo
        };


        try {
            // Realizar la solicitud al servidor para registrar el usuario
            const response = await fetch('http://127.0.0.1:5000/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });

            // Verificar si el registro fue exitoso
            if (response.ok) {
                // Mostrar el modal de éxito
                setShowSuccessModal(true);

                // Ocultar el modal después de 2 segundos
                setTimeout(() => {
                    setShowSuccessModal(false);
                    // Redirigir al usuario a otra página (puedes personalizar según tus necesidades)
                    navigate("/");
                }, 2000);
            } else {
                // Manejar errores en el registro (puedes personalizar según tus necesidades)
                console.error("Error en el registro");
            }
        } catch (error) {
            console.error("Error al intentar registrar el usuario:", error);
        }
    };

    // Efecto para limpiar el formulario cuando se oculta el modal de éxito
    useEffect(() => {
        if (!showSuccessModal) {
            setNombre("");
            setClave("");
            setCorreo("");
        }
    }, [showSuccessModal]);

    return (
        <div className="containerCardRegister">
            <div className="cardRegister">
                <div className="cardRegisterInput">
                    <div className="cardRegisterInputUser">
                        <p style={{ marginBottom: "12px" }}>Nombre</p>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
                    <div className="cardRegisterInputPassword">
                        <p style={{ marginBottom: "12px" }}>Contraseña</p>
                        <input
                            type="password"
                            value={clave}
                            onChange={(e) => setClave(e.target.value)}
                        />
                    </div>
                    <div className="cardRegisterInputCorreo">
                        <p style={{ marginBottom: "12px" }}>Correo</p>
                        <input
                            type="email"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                        />
                    </div>
                </div>
                <div className="cardRegisterButtons">
                    <button className="cardRegisterButtonUser" onClick={handleRegister}>
                        Registrar Usuario
                    </button>
                </div>
            </div>
            <button className="cardRegisterButtonBack" onClick={() => navigate("/")}>
                Regresar
            </button>

            {showSuccessModal && (
                <div className="successModal">
                    <p>¡Registro exitoso!</p>
                </div>
            )}
        </div>
    );
}

export default Register;

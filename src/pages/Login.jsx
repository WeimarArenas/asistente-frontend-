import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// importo los estilos css
import '../styles/login.css';

function Login() {
    const navigate = useNavigate();
    const [verificado, setVerificado] = useState(false);
    const [correo, setCorreo] = useState('');
    const [clave, setClave] = useState('');
    const [ingresoIntentado, setIngresoIntentado] = useState(false);

    const notifySuccess = () => {
        toast.success("¡Inicio de sesión exitoso!", {
            position: toast.POSITION.TOP_CENTER
        });
    };

    const notifyError = () => {
        toast.error("Error al iniciar sesión. Usuario no verificado.", {
            position: toast.POSITION.TOP_CENTER
        });
    };

    const handleLogin = async () => {
        // Supongamos que response es la respuesta de la API
        const response = await fetch(`http://127.0.0.1:5000/usuarios/${correo}/${clave}`);
        const data = await response.json();

        // Verificar si el usuario está verificado
        const usuario = data.usuario && data.usuario.length > 0 ? data.usuario[0] : null;
        const usuarioVerificado = usuario && usuario.verificado === 1;

        setVerificado(!usuarioVerificado);
        setIngresoIntentado(true);

        if (usuarioVerificado) {
            notifySuccess();
            setTimeout(() => {
                navigate("/Home");
            }, 1500);
        } else {
            // Usuario no verificado, mostrar un mensaje o tomar otra acción
            setVerificado(false);
            notifyError();
        }
    }

    return (
        <div className="containerCardLogin">
            <div className="cardLogin">
                <div className="cardLoginInput">
                    <div className="cardLoginInputUser">
                        <p style={{ marginBottom: "12px" }} >Correo</p>
                        <input
                            type="email"
                            style={{
                                borderRadius: "10px",
                                padding: "10px",
                                outline: "none",
                                border: "none"
                            }}
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                        />
                    </div>
                    <div className="cardLoginInputPassword">
                        <p style={{ marginBottom: "12px" }} >Contraseña</p>
                        <input
                            type="password"
                            style={{
                                borderRadius: "10px",
                                padding: "10px",
                                outline: "none",
                                border: "none"
                            }}
                            value={clave}
                            onChange={(e) => setClave(e.target.value)}
                        />
                    </div>
                </div>
                <div className="cardLoginButton">
                    <button className="cardLoginButtonLogin" onClick={() => { handleLogin(); }}>
                        Ingresar
                    </button>

                </div>
            </div>
            <div>
                <div className="mensajeVerificacion">
                    {ingresoIntentado && verificado === false && (
                        <div>
                            <p style={{ color: 'red', textAlign: 'center' }}>
                                Usuario no verificado. No se puede acceder.
                            </p>
                            <ToastContainer />
                        </div>
                    )}
                </div>
                <div style={{ background: '#ededed', width: '80%' }}>
                    <div className="cardRegister1">
                        <p>Si no posee una cuenta puede registrarse</p>
                        <button>
                            <Link to="/Register" className="linkRegister">Registrar usuario</Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

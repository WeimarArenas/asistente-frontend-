import { Link } from "react-router-dom";

// importo los estilos css
import '../styles/login.css'

function Login() {
    return (
        <div className="containerCardLogin">
            <div className="cardLogin">
                <div className="cardLoginInput">
                    <div className="cardLoginInputUser">
                        <p style={{marginBottom: "12px"}} >Usuario</p>
                        <input type="text" 
                        style={{ 
                            borderRadius: "10px",
                            padding: "10px",
                            outline: "none",
                            border: "none"
                        }}/>
                    </div>
                    <div className="cardLoginInputPassword">
                        <p style={{marginBottom: "12px"}} >Contraseña</p>
                        <input type="password"
                        style={{ 
                            borderRadius: "10px",
                            padding: "10px",
                            outline: "none",
                            border: "none"
                        }}/>
                    </div>
                </div>
                <div className="cardLoginButton">
                    <button className="cardLoginButtonLogin">
                        <Link to="/home" className="cardLoginButtonLoginText" style={{
                            textDecoration: "none", color: "black", fontSize: "15px", fontWeight: "600"
                            }}>Ingresar</Link>
                    </button>
                </div>
            </div>
        </div>
    )
};

export default Login;

import Header from "../components/Header";

// importacion de los estilos
import "../styles/home.css"

// import de la imagen
import almaMater from '../images/ImagenHome.png'

function Home() {
    return (
        <div className="container">
            <Header />
            <div className="homeContainer">
                <h1 className="homeTittle">Hospital Alma Máter de Antioquia</h1>
            </div>
                <figure className="homeContainerImg">
                    <img src={almaMater} alt="Logo Hospital Alma Máter de Antioquia" />
                </figure>
            <p></p>
        </div>
    )
};

export default Home;
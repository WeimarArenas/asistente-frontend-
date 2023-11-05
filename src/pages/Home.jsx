import Header from "../components/Header";
import "../styles/home.css"

function Home(){
    return(
        <div className="container">
            <Header />
            <div className="homeContainer">
                <h1 className="homeTittle">Home</h1>
            </div>
            <p></p>
        </div>
    )
};

export default Home;
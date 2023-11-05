import { Link, useRouteError } from "react-router-dom";

const NotFound = () => {
    const error = useRouteError();
    console.log(error)
    return (
        <div>
            <h1>Pagina no encontrada</h1>
            <p>Error 404</p>
            <p>{error.statusText || error.message}</p>
            <Link to="/">Volver al Login</Link>
        </div>
    )
};

export default NotFound;
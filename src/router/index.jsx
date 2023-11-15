import { createBrowserRouter } from "react-router-dom";

import Login from '../pages/Login'
import Home from '../pages/Home'
import NotFound from "../pages/NoFound";
import Areas from "../pages/Areas";
import Register from "../pages/Register";
import ConsultasAleatorias from "../pages/ConsultasAleatorias";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />,
        errorElement: <NotFound />,
    },
    {
        path: '/Register',
        element: <Register />
    },
    {
        path: '/home',
        element: <Home />
    },
    {
        path: '/areas',
        element: <Areas />
    },
    {
        path: '/consulta-aleatoria',
        element: <ConsultasAleatorias />
    }
])
import { createBrowserRouter } from "react-router-dom";

import Login from '../pages/Login'
import Home from '../pages/Home'
import NotFound from "../pages/NoFound";
import Areas from "../pages/Areas";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />,
        errorElement: <NotFound />,
    },
    {
        path: '/home',
        element: <Home />
    },
    {
        path: '/areas',
        element: <Areas />
    }
])
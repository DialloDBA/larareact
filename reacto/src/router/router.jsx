import { createBrowserRouter } from "react-router-dom";
import Contact from "../views/pages/contact/index";
import About from "../views/pages/about/index";
import Home from "../views/index.jsx";
import FrontLayout from '../components/FrontLayout/index.jsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <FrontLayout />,
        children: [
            {
                path : '/',
                element : <Home />
            },
            {
                path: 'contact',  // Chemin relatif
                element: <Contact />
            },
            {
                path: 'about',  // Chemin relatif
                element: <About />
            }
        ]
    },
    
]);

export default router;

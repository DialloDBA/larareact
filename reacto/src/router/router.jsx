import { createBrowserRouter } from "react-router-dom";
import Contact from "../views/pages/contact/index";
import About from "../views/pages/about/index";
import Home from "../views/index.jsx";
import FrontLayout from '../components/FrontLayout/index.jsx'
import AdminLayout from "../components/AdminLayout/index.jsx"
import Admin from '../views/admin/index.jsx';
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
    {
        path : '/admin',
        element : <AdminLayout />,
        children : [
            {
                path :'/admin/',
                element : <Admin />
            }
        ]
    }
    
]);

export default router;

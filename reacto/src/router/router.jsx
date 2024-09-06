import { createBrowserRouter } from "react-router-dom";
import Contact from "../views/pages/contact/index";
import About from "../views/pages/about/index";
import Home from "../views/index.jsx";
import FrontLayout from '../components/FrontLayout/index.jsx'
import AdminLayout from "../components/AdminLayout/index.jsx"
import Admin from '../views/admin/index.jsx';
import Categories from "../components/categories/list.jsx";
import Single from "../components/categories/single.jsx";
import Cats from "../views/admin/categories/index.jsx";
import CreateCats from "../views/admin/categories/create.jsx";
import ShowSingleCat from "../views/admin/categories/show.jsx";

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
                path: 'categories',  // Chemin relatif
                element: <Categories />
            },
            {
                path: 'categories/:slug',  // Chemin relatif
                element: <Single key="showSingleCatx" />
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
            },
            {
                path :'/admin/categories',
                element : <Cats key="listeCats"/>
            },
            {
                path :'/admin/categories/create',
                element : <CreateCats key="CreateCats" />
            },
            {
                path :'/admin/categories/:slug',
                element : <ShowSingleCat key="showCats" />
            }
        ]
    }
    
]);

export default router;

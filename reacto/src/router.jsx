import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./views/Login.jsx";
import Signup from "./views/Signup.jsx";
import Users from "./views/Users.jsx";
import NotFound from "./views/errors/NotFound.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import Dashboard from "./views/Dashboard.jsx";
import UserForm from "./views/UserForm.jsx";


const router = createBrowserRouter([
    
    
    {
        path : "/",
        element : <DefaultLayout />,
        children : [
            {
                path : '/',
                element : <Navigate to="/users" />
            },
            {
                path : '/dashboard',
                element : <Dashboard />
            },
            {
                path : '/users',
                element : <Users key="users"/>
            },
            {
                path : '/users/create',
                element : <UserForm key="userCreate" />
            },
            {
                path : '/users/:id/edit',
                element : <UserForm key="updateUser" />
            },
        ]
    },
    {
        path : "/",
        element : <GuestLayout />,
        children : [
            {
                path : '/login',
                element : <Login />
            },
            {
                path : '/signup',
                element : <Signup />
            },
        ]
    },
    {
        path : "*",
        element : <NotFound />
    }
])

export default router;
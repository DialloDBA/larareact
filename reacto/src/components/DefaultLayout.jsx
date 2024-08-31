import React from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider.jsx'

function DefaultLayout() {

    const { user, token } = useStateContext();
    if (!token) {
        return <Navigate to="/login" />
    }
    const onLogout = (event)=>{
        event.preventDefault();
        console.log("logout")
    }
    return (
        <div id='defaultLayout'>
            <aside>
                <Link to="/dashboard" >Dashboard</Link>
                <Link to="/dashboard" >Users</Link>
            </aside>
            <div className='content'>
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                        {user.name}
                        <a href="#" className='btn-logout' onClick={onLogout}>Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default DefaultLayout
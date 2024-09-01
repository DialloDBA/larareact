import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider.jsx'

function GuestLayout() {
    const { token } = useStateContext();
    if (token) {
        return <Navigate to="/" />
    }
    return (
        <div>
            <div>
                <div className='login-signup-form animated fadeInDown'>
                    <div className='form'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GuestLayout  
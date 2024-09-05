import React, { useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuthStateContext } from '../../contexts/AuthContextProvider'

export default function index() {
  const { user, token } = useAuthStateContext();

  if((!user) || !token){
    return <Navigate to="/" />;
  }
  useEffect(()=>{
    console.log("hola");
  },[]);

  return (
    <div>
      <h1>Admin Layout </h1>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

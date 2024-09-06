import React, { useEffect, useState } from 'react'
import { Outlet, Navigate, Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStateContext } from '../../contexts/AuthContextProvider'
import Header from '../AdminLayout/header.jsx';
import Nav from '../AdminLayout/menu.jsx';
import axiosClient from '../../axios/axiosClient.js';

export default function index() {
  const { user, token,isActive,setActiveMenu,setToken,setUser,alertype,setAlertype,setNotification } = useAuthStateContext();
  const navigate = useNavigate();
  if ((!user) || !token) {
    setNotification(`Vous devez etre connecté(e) pour acceder a cette page`);
    setAlertype("danger");
    return <Navigate to="/" />;
  }

  const logout = (e) => {
    e.preventDefault();
    axiosClient.post('/logout', user)
      .then(() => {
        setToken('');
        setUser('');
        setNotification(`Vous vous êtes deconnecté(e)`);
        setAlertype("danger");
        navigate('/',user);
      })
      .catch((err) => {
        console.log(err);
      })
  }
  
  useEffect(() => {
    // Ajouter la feuille de style
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://getbootstrap.com/docs/5.2/examples/dashboard/dashboard.css';
    document.head.appendChild(link);

    // Ajouter les scripts
    const script1 = document.createElement("script");
    script1.src = "https://cdn.jsdelivr.net/npm/feather-icons@4.28.0/dist/feather.min.js";
    document.body.appendChild(script1);


    // Nettoyage lors du démontage du composant
    return () => {
      if (link.parentNode) {
        document.head.removeChild(link);
      }
      if (script1.parentNode) {
        document.body.removeChild(script1);
      }
    };
  }, []);



  return (
    <>
      <>
        <Header logout={logout}/>
        <div className="container-fluid">
          <div className="row">
            
            <Nav active={isActive} setActiveMenu={setActiveMenu} />
            <Outlet />
          </div>
        </div>
      </>

      <Outlet />
    </>
  )
}

import { createContext, useContext, useState } from "react";

// Créer le contexte Auth
const AuthStateContext = createContext({
  user: null,
  token: null,
  notification: null,
  alertype: null,
  isActive: null,
  setUser: () => { },
  setToken: () => { },
  setNotification: () => { },
  setAlertype: () => { },
  setActiveMenu: () => { },
});

// Le Provider du contexte Auth
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem('USER_ACCESS_TOKEN'));
  const [notification, _setNotification] = useState('');
  const [alertype, _setAlertype] = useState("success");
  const [isActive,setIsActive] = useState(false);

  const setAlertype = (type) => {
    if (type) {
      _setAlertype(type)
    }
  }
  const setNotification = (message) => {
    _setNotification(message);
    setTimeout(() => {
      _setNotification('');
      _setAlertype("success");
    }, 5000);

  }
  const setActiveMenu = (currentUrl,path) => {
    if (path==currentUrl) {
      setIsActive(true);
    }
  }
  // Fonction pour mettre à jour le token et gérer le stockage local
  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("USER_ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("USER_ACCESS_TOKEN");
    }
  };

  return (
    <AuthStateContext.Provider value={{
      user,
      setUser,
      token,
      setToken,
      notification,
      setNotification,
      alertype,
      setAlertype,
      isActive,
      setActiveMenu,
    }}>
      {children}
    </AuthStateContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte Auth
export const useAuthStateContext = () => {
  return useContext(AuthStateContext);
};

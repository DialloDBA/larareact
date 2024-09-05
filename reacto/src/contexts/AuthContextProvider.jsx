import { createContext, useContext, useState } from "react";

// Créer le contexte Auth
const AuthStateContext = createContext({
  user: null,
  setUser: () => {},
  token: '',
  setToken: () => {},
});

// Le Provider du contexte Auth
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem('USER_ACCESS_TOKEN'));

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
      setToken
    }}>
      {children}
    </AuthStateContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte Auth
export const useAuthStateContext = () => {
  return useContext(AuthStateContext);
};

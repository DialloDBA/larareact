import { createContext, useContext, useState } from "react";

// Créer le contexte Auth
const AuthStateContext = createContext({
  defaultLang: null,
  user: null,
  token: null,
  notification: null,
  alertype: null,
  isActive: null,
  setDefaultLang : ()=>{},
  setUser: () => { },
  setToken: () => { },
  setNotification: () => { },
  setAlertype: () => { },
  setActiveMenu: () => { },
  __lang : ()=>{}
});

// Le Provider du contexte Auth
export const AuthContextProvider = ({ children }) => {
  const [defaultLang, _setDefaultLang] = useState(((navigator.language).split('-'))[0]);
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
  const __lang = async (...params) => {
    let lang;
    let key;

    // Vérifier si un seul paramètre est passé (la langue seulement)
    if (params.length === 1) {
        key = params[0];
    } else if (params.length === 2) {
        lang = params[0];
        key = params[1];
    }

    // Si la langue n'est pas définie, utiliser la langue par défaut (langue du navigateur)
    if (!lang) {
        lang = (navigator.language.split('-'))[0];
    }
    try {
        // Importer le fichier de traduction correspondant à la langue
        const translations = await import(`../lang/${lang}.js`);

        // Récupérer la traduction correspondante à la clé
        let message = translations.default[key];
        // Retourner la traduction si trouvée, sinon retourner la clé
        if(message){
          return message ;
        }else{
          return key;
        }
    } catch (error) {
        console.error(`Erreur lors du chargement des traductions pour la langue ${lang}:`, error);
        return key; // Retourne la clé si une erreur survient
    }
};


  const setDefaultLang = (lang) => {
    if (lang) {
      _setDefaultLang(lang)
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
      defaultLang,
      setDefaultLang,
      __lang
    }}>
      {children}
    </AuthStateContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte Auth
export const useAuthStateContext = () => {
  return useContext(AuthStateContext);
};

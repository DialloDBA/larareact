import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuthStateContext } from '../../../../contexts/AuthContextProvider';

const ToastMessage = () => {
  const [showToast, setShowToast] = useState(false);
  const {notification} = useAuthStateContext();
  useEffect(() => {
    // Afficher le toast après 1 seconde pour la démo
    if(notification){
      setShowToast(true);
    }
    const showTimer = setTimeout(() => {
      setShowToast(true);
    }, 1000);

    // Masquer le toast après 5 secondes (5000 ms)
    const hideTimer = setTimeout(() => {
      setShowToast(false);
    }, 6000); // Afficher pendant 5 secondes après 1 seconde de délai initial
    // Nettoyage des timers lors de la destruction du composant
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div
      aria-live="assertive"
      aria-atomic="true"
      className="bg-dark position-relative bd-example-toasts"
    >
      <div className="toast-container p-3 " id="toastPlacement">
        <div className={`toast ${showToast ? 'show' : 'hide'}`} role="alert">
          <div className="toast-header">
            <img src="https://avatars.githubusercontent.com/u/101409767?v=4&size=30" className="rounded me-2" alt="..." />
            <strong className="me-auto">Notification</strong>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowToast(false)}
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body bg-success text-white rounded-bottom" >
            {notification}.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToastMessage;

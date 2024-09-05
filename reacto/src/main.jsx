import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router/router.jsx'; 
import {AuthContextProvider} from './contexts/AuthContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
    <RouterProvider router={router} />
    </AuthContextProvider>
  </StrictMode>,
);

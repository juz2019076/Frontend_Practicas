import { PersonalPage } from './pages/dashboard/PersonalPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { PracticantesPage } from './pages/dashboard/PracticantesPage';
import { RegistrosPage } from './pages/dashboard/RegistrosPage';
import { LoginPage } from './pages/dashboard/LoginPage';  // Importar LoginPage
import { UpdatePage } from './pages/dashboard/UpdatePage';  // Importar UpdatePage

const routes = [
  {
    path: '/dashboard',
    element: <DashboardPage />,
  },
  {
    path: '/practicantes',  // Nueva ruta
    element: <PracticantesPage />,  // Componente de la nueva vista
  },
  {
    path: '/personal',  // Nueva ruta
    element: <PersonalPage />,  // Componente de la nueva vista
  },
  {
    path: '/registros',  // Nueva ruta para RegistrosPage
    element: <RegistrosPage />,  // Componente de la nueva vista
  },
  {
    path: '/login',  // Nueva ruta para LoginPage
    element: <LoginPage />,  // Componente de la nueva vista
  },
  {
    path: '/update',  // Nueva ruta para UpdatePage
    element: <UpdatePage />,  // Componente de la nueva vista
  },

  // otras rutas
];

export default routes;

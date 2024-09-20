import { PersonalPage } from './pages/dashboard/PersonalPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { PracticantesPage } from './pages/dashboard/PracticantesPage';  // Importar la nueva vista

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
  // otras rutas
];

export default routes;

import { PersonalPage } from './pages/vistas/PersonalPage';
import { PracticantesPage } from './pages/vistas/PracticantesPage';
import { Home } from "./pages/home/Home.jsx"
import { AuthPage } from "./pages/auth";
import Register from "./components/Register";
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { UpdatePage } from './pages/vistas/UpdatePage';
import { LoginPage } from './pages/vistas/LoginPage';
import { RegistrosPage } from './pages/vistas/RegistrosPage';
import { LogVistaPage } from './pages/vistas/LogVistaPage';


const routes = [
  { path: '/', element: <AuthPage /> },
  { path: '/register', element: <Register /> },
  { path: "/home", element: <Home /> },
  { path: '/practicantes', element: <PracticantesPage /> },
  { path: '/personal', element: <PersonalPage /> },
  { path: '/empresa', element: <DashboardPage /> },
  { path: '/registro', element: <RegistrosPage /> },
  { path: '/logUpdate', element: <UpdatePage /> },
  { path: '/logLogin', element: <LoginPage /> },
  { path: '/logVista', element: <LogVistaPage />}

]

export default routes;

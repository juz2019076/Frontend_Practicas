import { PersonalPage } from './pages/vistas/PersonalPage';
import { PracticantesPage } from './pages/vistas/PracticantesPage';
import { Home } from "./pages/home/Home.jsx"
import { AuthPage } from "./pages/auth";
import Register from "./components/Register";
import { DashboardPage } from './pages/dashboard/DashboardPage';


const routes = [
  { path: '/', element: <AuthPage /> },
  { path: '/register', element: <Register /> },
  { path: "/home", element: <Home /> },
  { path: '/practicantes',element: <PracticantesPage />},
  { path: '/personal',  element: <PersonalPage />},
  { path: '/empresa', element: <DashboardPage/>}
]

export default routes;

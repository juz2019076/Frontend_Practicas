import { HomePage } from "./pages/home";
import { AuthPage } from "./pages/auth";
import  Register  from "./components/Register";
import { Navbar } from './components/complements/Navbar';

const routes = [
    { path: '/auth', element: <AuthPage /> },
    { path: '/register', element: <Register /> },
    { path: "/", element: <HomePage /> }
]

export default routes;

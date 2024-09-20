import { Home } from "./pages/home/Home.jsx"
import { AuthPage } from "./pages/auth";
import  Register  from "./components/Register";

const routes = [
    { path: '/', element: <AuthPage /> },
    { path: '/register', element: <Register /> },
    { path: "/home", element: <Home/> }
]

export default routes;

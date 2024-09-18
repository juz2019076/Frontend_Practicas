import { Dashboard } from "./pages/dashboard";
import { Home } from "./pages/home/Home.jsx"
import { AuthPage } from "./pages/auth";

const routes = [
    {path: '/', element: <AuthPage/>},
    {path: "/home", element: <Home/>}
]

export default routes
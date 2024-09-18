import { DashboardPage } from "./pages/dashboard";
import { AuthPage } from "./pages/auth";

const routes = [
    {path: '/', element: <AuthPage/>},
    {path: "/home", element: <DashboardPage/>}
]

export default routes
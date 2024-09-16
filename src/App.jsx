import { useRoutes } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import routes from "./routes.jsx"

export const App = () => {
  let element = useRoutes(routes);
  return (
    <>
      {element}
      <Toaster position="botton-right" reverseOrder={false}/>
    </>
  );
};

export default App
// App.jsx
import { useRoutes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import routes from "./routes.jsx";  // Aquí es correcto

export const App = () => {
  let element = useRoutes(routes); // Aquí también está bien
  return (
    <>
      {element}
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};

export default App;

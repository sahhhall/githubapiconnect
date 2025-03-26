import { RouterProvider } from "react-router";
import { routes } from "./router/routers";

const App = () => {
  return <RouterProvider router={routes} />;
};

export default App;

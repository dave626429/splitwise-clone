import Layout from "./components/layout/Layout";
import { RouterProvider } from "react-router-dom";
import router from "./router";

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

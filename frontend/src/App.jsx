import Layout from "./components/layout/Layout";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { store } from "./store";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;

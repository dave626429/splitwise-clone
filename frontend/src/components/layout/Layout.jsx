import Login from "../../pages/login/Login";
import Main from "../main/Main";
import Sidebar from "../sidebar/Sidebar";

export default function Layout() {
  return <Login />;

  return (
    <div id="app-layout" className=" relative flex w-screen h-screen ">
      <Sidebar />
      <Main />
    </div>
  );
}

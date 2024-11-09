import Logo from "../logo/Logo";
import Navigation from "../navigation/Navigation";

export default function Sidebar() {
  return (
    <aside
      id="app-sidebar"
      className=" flex flex-col items-center max-sm:hidden lg:w-[248px] sm:w-[100px] "
    >
      <Logo />
      <Navigation />
    </aside>
  );
}

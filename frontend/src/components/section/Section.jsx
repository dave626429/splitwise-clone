import { Outlet } from "react-router-dom";

export default function Section() {
  return (
    <section className="flex flex-1 w-full">
      <Outlet />
    </section>
  );
}

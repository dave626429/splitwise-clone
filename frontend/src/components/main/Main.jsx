import Header from "../header/Header";
import MobileNav from "../mobilenav/MobileNav";
import Section from "../section/Section";

export default function Main() {
  return (
    <main className="flex-1 flex flex-col bg-g-2">
      <Header />
      <Section />
      <MobileNav />
    </main>
  );
}

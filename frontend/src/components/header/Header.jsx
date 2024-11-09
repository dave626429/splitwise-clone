import ProfileLink from "../profilelink/ProfileLink";

export default function Header() {
  return (
    <header className="bg-white flex items-center justify-between sm:justify-end lg:px-[40px] sm:p-[24px] max-sm:p-[18px] max-sm:p-[14px] sm:h-[94px] border-b">
      <img src="/src/assets/logo.svg" alt="" className="h-[24px] sm:hidden" />
      <ProfileLink />
    </header>
  );
}

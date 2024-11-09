import logo from "../../assets/logo.svg";
import mobileLogo from "../../assets/poolball.svg";

export default function Logo() {
  return (
    <div
      id="app-logo-section"
      className="h-[94px] flex items-center justify-center w-full lg:border-b max-lg:border-r"
    >
      <img
        className="max-xs:w-[100px] max-sm:w-[120px] w-[130px] max-lg:hidden"
        src={logo}
        alt="logo"
      />
      <img className="lg:hidden color" src={mobileLogo} alt="logo" />
    </div>
  );
}

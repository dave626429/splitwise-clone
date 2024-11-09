import profilePlaceholder from "../../assets/profileplaceholder.svg";

export default function ProfileLink() {
  return (
    <div
      id="header-profile-link"
      className="flex items-center sm:w-[150px] w-auto justify-between"
    >
      <img src={profilePlaceholder} alt="profile link" />
      <div className="max-sm:hidden">
        <p className="text-[14px] font-medium text-[#676E7E]">Davinder Singh</p>
        <p className="text-[12px] font-medium text-p">Dave626429</p>
      </div>
    </div>
  );
}

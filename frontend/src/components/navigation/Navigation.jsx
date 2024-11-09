import DashboardIcon from "../../assets/dashboard.svg?react";
import EventLogsIcon from "../../assets/eventlogs.svg?react";
import FriendsIcon from "../../assets/friends.svg?react";
import GroupsIcon from "../../assets/groups.svg?react";
import LogoutIcon from "../../assets/logout.svg?react";
import SettingsIcon from "../../assets/settings.svg?react";
import NavLink from "../navlink/NavLink";

export default function Navigation() {
  return (
    <nav className="flex flex-col items-center sm:justify-between flex-1 py-[40px] w-full border-e">
      {/* Nav upper sec */}
      <div className="app-nav-upper-sec flex flex-col gap-y-[8px]">
        <NavLink to="/dashboard" label="Dashboard" icon={DashboardIcon} />
        <NavLink to="/eventlogs" label="Event Logs" icon={EventLogsIcon} />
        <NavLink to="/friends" label="Friends" icon={FriendsIcon} />
        <NavLink to="/groups" label="Groups" icon={GroupsIcon} />
      </div>

      {/* Nav bottom sec */}
      <div className="app-nav-bottom-sec flex flex-col gap-y-[8px]">
        <NavLink to="/settings" label="Settings" icon={SettingsIcon} />
        <NavLink to="/logout" label="Logout" icon={LogoutIcon} />
      </div>
    </nav>
  );
}

import NavLink from "../navlink/NavLink";
import DashboardIcon from "../../assets/dashboard.svg?react";
import EventLogsIcon from "../../assets/eventlogs.svg?react";
import GroupsIcon from "../../assets/groups.svg?react";
import FriendsIcon from "../../assets/friends.svg?react";
import LogoutIcon from "../../assets/logout.svg?react";
import SettingsIcon from "../../assets/settings.svg?react";

export default function MobileNav() {
  return (
    <nav className="flex p-[18px] sm:hidden justify-between">
      <NavLink to="/dashboard" label="Dashboard" icon={DashboardIcon} />
      <NavLink to="/eventlogs" label="Event Logs" icon={EventLogsIcon} />
      <NavLink to="/friends" label="Friends" icon={FriendsIcon} />
      <NavLink to="/groups" label="Groups" icon={GroupsIcon} />
      <NavLink to="/settings" label="Settings" icon={SettingsIcon} />
      <NavLink to="/logout" label="Logout" icon={LogoutIcon} />
    </nav>
  );
}

import React, { memo } from "react";
import { NavLink as RRDNavLink } from "react-router-dom";

function NavLink(props) {
  const { to, label, icon: Icon } = props;
  return (
    <RRDNavLink
      id="app-nav-link-dashboard"
      className="relative sm:w-[50px] sm:h-[50px] lg:w-[200px] flex max-lg:justify-center items-center"
      to={to}
    >
      {({ isActive }) => (
        <>
          <div
            className={`${
              isActive ? "bg-red-500" : "bg-transparent"
            } absolute sm:top-0 sm:left-[-25px] sm:w-[5px] sm:h-full w-full h-[5px] bottom-[-18px] sm:rounded-r max-sm:rounded-t`}
          />
          <div className="flex lg:ml-[20px]">
            <div
              id={`${label}-icon`}
              className={`flex justify-center items-center w-[24px] aspect-square`}
            >
              <Icon
                className={`${
                  isActive
                    ? "fill-red-500 stroke-red-500 w-full"
                    : "stroke-g-1 fill-g-1"
                } stroke-[1.5px]  w-[20px]`}
              />
            </div>
            <div
              className={`${
                isActive && "text-red-500 font-semibold"
              } ml-[14px] max-lg:hidden text-p mt-[2px]`}
            >
              {label}
            </div>
          </div>
        </>
      )}
    </RRDNavLink>
  );
}

export default NavLink;

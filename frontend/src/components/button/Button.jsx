import React, { memo } from "react";

function Button(props) {
  const { className = "", label = "BUTTON", ...rest } = props;
  return (
    <button
      className={`md:h-[46px] h-[30px] md:text-[16px] text-[12px] md:px-[33px] px-[14px] rounded-1 font-semibold ${className}`}
      {...rest}
    >
      {label}
    </button>
  );
}

export default memo(Button);

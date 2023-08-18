import React from "react";

const DivButton = ({ className, handleClick, children }) => {
  const handleButtonClick = (e) => {
    e.stopPropagation();
    handleClick(e);
  };

  return (
    <span
      role="button"
      tabIndex={0}
      className={className}
      onClick={handleButtonClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === "Space") {
          return;
        }
      }}
    >
      {children}
    </span>
  );
};

export default DivButton;

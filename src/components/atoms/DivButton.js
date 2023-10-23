import React from "react";

const DivButton = ({
  className,
  handleClick,
  children,
  onMouseEnter,
  onMouseLeave,
  isDisabled,
}) => {
  const handleButtonClick = (e) => {
    e.stopPropagation();
    handleClick(e);
  };

  if (isDisabled) {
    return <div className={`${className} cursor-not-allowed`}>{children}</div>;
  }

  return (
    <div
      role="button"
      tabIndex={0}
      className={className}
      onClick={handleButtonClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === "Space") {
          return;
        }
      }}
    >
      {children}
    </div>
  );
};

export default DivButton;

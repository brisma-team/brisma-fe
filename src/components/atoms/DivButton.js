const DivButton = ({ className, handleClick, children }) => {
  return (
    <span
      role="button"
      tabIndex={0}
      className={className}
      onClick={handleClick}
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

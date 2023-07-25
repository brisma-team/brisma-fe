const DivButton = ({ classname, tabIdx, handleClick, children }) => {
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      console.log("Enter key pressed!");
    }
  };
  return (
    <div className={classname} onClick={handleClick}>
      {children}
    </div>
  );
};

export default DivButton;

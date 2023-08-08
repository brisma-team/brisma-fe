import Textfield from "@atlaskit/textfield";

const TextInput = ({
  onChange,
  placeholder,
  icon,
  value,
  className,
  style,
  isDisabled,
  handleClick,
  onKeyDown,
}) => {
  return (
    <Textfield
      placeholder={placeholder}
      onChange={onChange}
      elemAfterInput={
        icon && (
          <button className="justify-center" onClick={handleClick}>
            {icon}
          </button>
        )
      }
      onKeyDown={onKeyDown}
      value={value}
      className={className}
      style={style}
      isDisabled={isDisabled}
    />
  );
};

export default TextInput;

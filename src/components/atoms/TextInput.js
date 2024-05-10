import Textfield from "@atlaskit/textfield";
import ButtonIcon from "./ButtonIcon";

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
  isNumber,
  maxLength,
}) => {
  return (
    <Textfield
      placeholder={placeholder}
      onChange={onChange}
      elemAfterInput={
        icon && value && <ButtonIcon handleClick={handleClick} icon={icon} />
      }
      onKeyDown={onKeyDown}
      value={value}
      className={className}
      style={style}
      isDisabled={isDisabled}
      type={isNumber ? "number" : "text"}
      maxLength={maxLength}
    />
  );
};

export default TextInput;

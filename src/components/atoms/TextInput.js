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
}) => {
  return (
    <Textfield
      placeholder={placeholder}
      onChange={onChange}
      elemAfterInput={
        icon && <ButtonIcon handleClick={handleClick} icon={icon} />
      }
      onKeyDown={onKeyDown}
      value={value}
      className={className}
      style={style}
      isDisabled={isDisabled}
      type={isNumber ? "number" : "text"}
    />
  );
};

export default TextInput;

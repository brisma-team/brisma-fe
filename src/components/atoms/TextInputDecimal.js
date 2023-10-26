import Textfield from "@atlaskit/textfield";
import ButtonIcon from "./ButtonIcon";
import { useState } from "react";
import { convertIntegerToDecimal } from "@/helpers";

const TextInputDecimal = ({
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
  const [numberValue, setNumberValue] = useState(value);

  const handleChange = (e) => {
    const format = convertIntegerToDecimal(e.target.value);

    setNumberValue(format.decimal);

    onChange(format.integer);
  };

  return (
    <Textfield
      placeholder={placeholder}
      onChange={handleChange}
      elemAfterInput={
        icon && <ButtonIcon handleClick={handleClick} icon={icon} />
      }
      onKeyDown={onKeyDown}
      value={numberValue}
      className={className}
      style={style}
      isDisabled={isDisabled}
      type="text"
    />
  );
};

export default TextInputDecimal;
import Textfield from "@atlaskit/textfield";
import ButtonIcon from "./ButtonIcon";
import { useState, useEffect } from "react";

const TextInputFloat = ({
  onChange,
  placeholder,
  icon,
  value,
  className,
  style,
  isDisabled,
  handleClick,
  onKeyDown,
  maxLength,
  maxNumber,
}) => {
  const [numberValue, setNumberValue] = useState("");

  useEffect(() => {
    if (typeof value === "undefined" || value === null || value === "") {
      setNumberValue("");
    } else {
      setNumberValue(value.toString());
    }
  }, [value]);

  const handleChange = (e) => {
    const inputValue = e.target.value;

    // Regular expression to allow only valid float numbers
    const floatRegex = /^-?\d*(\.\d*)?$/;

    if (floatRegex.test(inputValue)) {
      let formattedValue = inputValue;

      // If there's a maxNumber and the input value exceeds it, set it to maxNumber
      if (maxNumber && !isNaN(parseFloat(inputValue))) {
        const inputNumber = parseFloat(inputValue);
        if (inputNumber > maxNumber) {
          formattedValue = maxNumber.toString();
        }
      }

      setNumberValue(formattedValue);
      onChange(formattedValue);
    }
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
      maxLength={maxLength}
    />
  );
};

export default TextInputFloat;

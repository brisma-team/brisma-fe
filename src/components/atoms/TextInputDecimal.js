import Textfield from "@atlaskit/textfield";
import ButtonIcon from "./ButtonIcon";
import { useState } from "react";
import { convertIntegerToDecimal } from "@/helpers";
import { useEffect } from "react";

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
  maxLength,
  maxNumber,
  withoutSeparation,
}) => {
  const [numberValue, setNumberValue] = useState("");

  useEffect(() => {
    if (typeof value == "undefined") {
      setNumberValue(undefined);
    } else if (withoutSeparation) {
      setNumberValue(convertIntegerToDecimal(value).integer);
    } else {
      setNumberValue(convertIntegerToDecimal(value).decimal);
    }
  }, [value]);

  useEffect(() => {
    console.log("numberValue => ", numberValue);
  }, [numberValue]);

  const handleChange = (e) => {
    const format = convertIntegerToDecimal(e.target.value);

    if (maxNumber) {
      if (isNaN(parseInt(e.target.value))) {
        setNumberValue(0);
        onChange(0);
      } else if (withoutSeparation && parseInt(e.target.value) > maxNumber) {
        setNumberValue(maxNumber);
        onChange(maxNumber);
      } else if (parseInt(e.target.value) > maxNumber) {
        setNumberValue(maxNumber);
        onChange(maxNumber);
      } else {
        setNumberValue(format.integer);
        onChange(format?.integer);
      }
    } else {
      setNumberValue(format.decimal);
      onChange(format?.decimal);
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
      maxLength={maxLength && maxLength}
    />
  );
};

export default TextInputDecimal;

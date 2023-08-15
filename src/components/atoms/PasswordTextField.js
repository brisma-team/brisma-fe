import Textfield from "@atlaskit/textfield";
import ButtonIcon from "./ButtonIcon";
import { useState } from "react";
import { IconEye, IconEyeOff } from "../icons";

const PasswordTextField = ({
  placeholder,
  handleChange,
  isDisabled,
  value,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Textfield
      placeholder={placeholder}
      isDisabled={isDisabled}
      type={showPassword ? "text" : "password"}
      value={value}
      onChange={handleChange}
      label="Password"
      elemAfterInput={
        <ButtonIcon
          handleClick={toggleShowPassword}
          icon={
            showPassword ? (
              <IconEye label="Hide Password" />
            ) : (
              <IconEyeOff label="Show Password" />
            )
          }
        />
      }
    />
  );
};

export default PasswordTextField;

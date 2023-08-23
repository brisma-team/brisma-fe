import Textfield from "@atlaskit/textfield";
import ButtonIcon from "./ButtonIcon";
import { useState } from "react";
import { IconEye, IconEyeOff } from "../icons";

const PasswordTextField = ({
  id,
  placeholder,
  handleChange,
  isDisabled,
  value,
  props,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Textfield
      {...props}
      id={id}
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
              <div className="mx-1">
                <IconEye label="Hide Password" size="small" />
              </div>
            ) : (
              <div className="mx-1">
                <IconEyeOff label="Show Password" size="small" />
              </div>
            )
          }
        />
      }
    />
  );
};

export default PasswordTextField;

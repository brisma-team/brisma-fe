import { Checkbox } from "@atlaskit/checkbox";
import { useEffect, useState } from "react";

const CustomCheckbox = ({
  value,
  handleChange,
  label,
  className,
  isDisabled,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(value);
  }, [value]);

  return (
    <Checkbox
      isChecked={Boolean(isChecked)}
      onChange={handleChange}
      label={label}
      className={className}
      isDisabled={isDisabled}
      testId="test"
    />
  );
};

export default CustomCheckbox;

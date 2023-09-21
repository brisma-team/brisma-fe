import SelectInput from "@atlaskit/select";
import { useState } from "react";

const Select = ({
  placeholder,
  optionValue,
  isSearchable,
  isMulti,
  style,
  onChange,
  value,
  isDisabled,
  positionAbsolute,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={positionAbsolute && open ? "z-50 absolute" : ""}>
      <SelectInput
        onChange={onChange}
        options={optionValue}
        isSearchable={isSearchable}
        isMulti={isMulti}
        placeholder={placeholder}
        className={style && style}
        value={value && value}
        isDisabled={isDisabled}
        onMenuOpen={handleOpen}
        onMenuClose={handleClose}
      />
    </div>
  );
};

export default Select;

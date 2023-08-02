import { Controller } from "react-hook-form";
import Select from "react-select";
import { IconClose } from "../icons";

const ReactSelect = ({
  control,
  options,
  handleChange,
  handleInputChange,
  handleClick,
  isSearchable,
  placeholder,
  value,
  customIcon,
  isDisabled,
  handleMenuOpen,
  handleMenuClose,
}) => {
  const DropdownIndicator = (props) => {
    return (
      <button {...props.innerProps} onClick={props.selectProps.onIconCLick}>
        <IconClose />
      </button>
    );
  };

  return (
    <Controller
      control={control}
      name="pn"
      render={({ field: { onBlur } }) => (
        <Select
          options={options}
          onChange={(e) => {
            handleChange(e);
          }}
          onBlur={onBlur}
          value={value}
          onInputChange={handleInputChange}
          isSearchable={isSearchable}
          placeholder={placeholder}
          components={customIcon && { DropdownIndicator }}
          onIconCLick={handleClick}
          isDisabled={isDisabled}
          onMenuOpen={handleMenuOpen}
          onMenuClose={handleMenuClose}
        />
      )}
    />
  );
};

export default ReactSelect;

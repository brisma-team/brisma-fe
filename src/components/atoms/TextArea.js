import TextArea from "@atlaskit/textarea";

const TextAreaField = ({
  maxHeight,
  handleChange,
  value,
  placeholder,
  isDisabled,
  resize,
  handleClick,
}) => {
  return (
    <TextArea
      maxHeight={maxHeight}
      onChange={handleChange}
      value={value}
      isDisabled={isDisabled}
      placeholder={placeholder}
      resize={resize}
      onClick={handleClick}
    />
  );
};

export default TextAreaField;

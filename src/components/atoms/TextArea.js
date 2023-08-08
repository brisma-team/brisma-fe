import TextArea from "@atlaskit/textarea";

const TextAreaField = ({ maxHeight, handleChange, value, isDisabled }) => {
  return (
    <TextArea
      maxHeight={maxHeight}
      onChange={handleChange}
      value={value}
      isDisabled={isDisabled}
    />
  );
};

export default TextAreaField;

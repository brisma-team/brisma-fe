import TextArea from "@atlaskit/textarea";

const TextAreaField = ({ maxHeight, handleChange, value }) => {
  return (
    <TextArea maxHeight={maxHeight} onChange={handleChange} value={value} />
  );
};

export default TextAreaField;

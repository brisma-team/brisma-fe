import Textfield from "@atlaskit/textfield";

const TextInput = ({
  onChange,
  placeholder,
  icon,
  value,
  className,
  style,
}) => {
  return (
    <Textfield
      placeholder={placeholder}
      onChange={onChange}
      elemAfterInput={
        icon && <button className="justify-center">{icon}</button>
      }
      value={value}
      className={className}
      style={style}
    />
  );
};

export default TextInput;

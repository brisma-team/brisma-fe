import Textfield from "@atlaskit/textfield";

const TextInput = ({ onChange, placeholder, icon }) => {
  return (
    <Textfield
      placeholder={placeholder}
      onChange={onChange}
      elemAfterInput={
        icon && <button className="justify-center">{icon}</button>
      }
    />
  );
};

export default TextInput;

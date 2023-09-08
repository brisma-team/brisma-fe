import Lozenge from "@atlaskit/lozenge";

const LozengeField = ({ appreance, isBold, children }) => {
  // appreance : default, success, removed, inprogress, new, moved
  return (
    <Lozenge appearance={appreance} isBold={isBold}>
      {children}
    </Lozenge>
  );
};

export default LozengeField;

import { useState } from "react";
import { InlineEditableTextfield } from "@atlaskit/inline-edit";

const InlineEditText = () => {
  const [editValue, setEditValue] = useState("");

  return (
    <div className="w-full">
      <InlineEditableTextfield
        testId="editable-text-field"
        defaultValue={editValue}
        onConfirm={(value) => setEditValue(value)}
        placeholder=""
        hideActionButtons
      />
    </div>
  );
};

export default InlineEditText;

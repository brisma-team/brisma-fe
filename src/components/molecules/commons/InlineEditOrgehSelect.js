import { useState } from "react";
import { Box, xcss } from "@atlaskit/primitives";
import {
  fontSize as getFontSize,
  gridSize as getGridSize,
} from "@atlaskit/theme/constants";
import InlineEdit from "@atlaskit/inline-edit";
import OrgehSelect from "./OrgehSelect";

const fontSize = getFontSize();
const gridSize = getGridSize();
const minRows = 2;
const textAreaLineHeightFactor = 2.5;

const readViewContainerStyles = xcss({
  minHeight: `${gridSize * textAreaLineHeightFactor * minRows}px`,
  padding: "space.150",
  lineHeight: `${(gridSize * textAreaLineHeightFactor) / fontSize}`,
  wordBreak: "break-word",
});

const InlineEditOrgehSelect = ({
  placeholder,
  handleConfirm,
  value,
  isDisabled,
  handleMenuOpen,
  handleMenuClose,
}) => {
  const [editValue, setEditValue] = useState(value);

  const handleChange = (e) => {
    if (e?.value) {
      setEditValue(e?.value);
    } else {
      setEditValue("");
    }
  };

  return (
    <div className="inline-edit-orgeh-select">
      <InlineEdit
        defaultValue={editValue}
        editView={(fieldProps) => (
          <OrgehSelect
            fieldsProps={fieldProps}
            handleChange={handleChange}
            selectedValue={value}
            handleMenuOpen={handleMenuOpen}
            handleMenuClose={handleMenuClose}
          />
        )}
        readView={() =>
          !editValue || editValue === "" || editValue?.label === "" ? (
            <div
              className="flex items-center pl-3"
              style={{ color: "#ccc", minHeight: "40px" }}
            >
              {placeholder}
            </div>
          ) : (
            <Box xcss={readViewContainerStyles}>{editValue?.label}</Box>
          )
        }
        isEditing={!isDisabled}
        onConfirm={handleConfirm}
        readViewFitContainerWidth
        hideActionButtons
      />
    </div>
  );
};

export default InlineEditOrgehSelect;

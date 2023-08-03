import { useState } from "react";

import { Box, xcss } from "@atlaskit/primitives";
// import TextArea from "@atlaskit/textarea";
import Textfield from "@atlaskit/textfield";
import {
  fontSize as getFontSize,
  gridSize as getGridSize,
} from "@atlaskit/theme/constants";

import InlineEdit from "@atlaskit/inline-edit";

const containerStyles = xcss({
  width: "100%",
});

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

const InlineEditField = ({ isDisabled, value, placeholder, handleConfirm }) => {
  const [editValue, setEditValue] = useState(value);
  const handleChange = (e) => {
    setEditValue(e.target.value);
  };

  return (
    <Box xcss={containerStyles}>
      <InlineEdit
        defaultValue={editValue}
        editView={({ ...fieldProps }, ref) => (
          <Textfield
            {...fieldProps}
            ref={ref}
            isDisabled={isDisabled}
            value={editValue}
            placeholder={placeholder}
            onChange={handleChange}
          />
        )}
        readView={() => <Box xcss={readViewContainerStyles}>{editValue}</Box>}
        onConfirm={() => handleConfirm(editValue)}
        readViewFitContainerWidth
        hideActionButtons
      />
    </Box>
  );
};

export default InlineEditField;

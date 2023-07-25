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

const InlineEditField = () => {
  const [editValue, setEditValue] = useState("");

  return (
    <Box xcss={containerStyles}>
      <InlineEdit
        defaultValue={editValue}
        editView={({ ...fieldProps }, ref) => (
          <Textfield {...fieldProps} ref={ref} />
        )}
        readView={() => <Box xcss={readViewContainerStyles}>{editValue}</Box>}
        onConfirm={setEditValue}
        readViewFitContainerWidth
        hideActionButtons
      />
    </Box>
  );
};

export default InlineEditField;

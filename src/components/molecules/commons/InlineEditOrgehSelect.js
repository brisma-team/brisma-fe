import { useState } from "react";
import { Box, xcss } from "@atlaskit/primitives";
import {
  fontSize as getFontSize,
  gridSize as getGridSize,
} from "@atlaskit/theme/constants";

import InlineEdit from "@atlaskit/inline-edit";
import OrgehSelect from "./OrgehSelect";
import { useEffect } from "react";

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

const InlineEditOrgehSelect = ({
  placeholder,
  handleConfirm,
  value,
  control,
}) => {
  const [editValue, setEditValue] = useState(value);

  const handleChange = (e) => {
    setEditValue(e.value);
  };

  useEffect(() => {
    console.log("editValue => ", editValue);
  }, []);

  return (
    <Box xcss={containerStyles}>
      <InlineEdit
        defaultValue={editValue}
        editView={() => (
          // { errorMessage, ...fieldProps }, ref
          <OrgehSelect
            handleChange={handleChange}
            control={control}
            selectedValue={value}
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
        onConfirm={handleConfirm}
        readViewFitContainerWidth
        hideActionButtons
      />
    </Box>
  );
};

export default InlineEditOrgehSelect;

import React from "react";
import Button from "@atlaskit/button";
import Tooltip from "@atlaskit/tooltip";
import EditIcon from "@atlaskit/icon/glyph/edit";

const UpdateButton = ({ href }) => {
  return (
    <Tooltip content="Update">
      <Button
        iconBefore={<EditIcon />}
        appearance="warning"
        href={href}
        shouldFitContainer
      />
    </Tooltip>
  );
};

export default UpdateButton;

import React from "react";

import Button from "@atlaskit/button";
import EditorDoneIcon from "@atlaskit/icon/glyph/editor/done";

const SaveButton = () => {
  return (
    <Button iconBefore={<EditorDoneIcon />} appearance="primary">
      Simpan
    </Button>
  );
};

export default SaveButton;

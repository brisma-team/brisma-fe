import React from "react";

import Button from "@atlaskit/button";
import EditorDoneIcon from "@atlaskit/icon/glyph/editor/done";

export default function SaveButton() {
  return (
    <Button iconBefore={<EditorDoneIcon />} appearance="primary">
      Simpan
    </Button>
  );
}

import React from "react";
import Button from "@atlaskit/button";
import ArrowLeftIcon from "@atlaskit/icon/glyph/arrow-left";

const BackButton = ({ href }) => {
  return (
    <div className="bg-slate-100 rounded hover:">
      <Button href={href} iconBefore={<ArrowLeftIcon />} shouldFitContainer>
        Back
      </Button>
    </div>
  );
};

export default BackButton;

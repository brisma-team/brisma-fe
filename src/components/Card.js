import React from "react";
import { N800 } from "@atlaskit/theme/colors";
import { token } from "@atlaskit/tokens";

const Card = ({ children }) => {
  return (
    <div
      className="py-2 w-auto rounded flex flex-col items-center"
      style={{
        color: token("color.text", N800),
        backgroundColor: token("elevation.surface.overlay", "#fff"),
        borderRadius: "10px",
        boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
      }}
    >
      {children}
    </div>
  );
};

export default Card;

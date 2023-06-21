import React from "react";
import { N800 } from "@atlaskit/theme/colors";
import { token } from "@atlaskit/tokens";

export default function Card({ children }) {
  return (
    <div
      className="py-2 w-auto rounded flex flex-col items-center"
      style={{
        color: token("color.text", N800),
        backgroundColodr: token("elevation.surface.overlay", "#fff"),
        boxShadow: token(
          "elevation.shadow.overlay",
          "0px 4px 8px rgba(9, 30, 66, 0.25), 0px 0px 1px rgba(9, 30, 66, 0.31)"
        ),
      }}
    >
      {children}
    </div>
  );
}

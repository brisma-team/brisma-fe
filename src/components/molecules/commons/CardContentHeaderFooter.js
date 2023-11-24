import { N800 } from "@atlaskit/theme/colors";
import { token } from "@atlaskit/tokens";

const CardContentHeaderFooter = ({ header, footer, children }) => {
  return (
    <div
      className="w-full h-full rounded flex flex-col items-center"
      style={{
        color: token("color.text", N800),
        borderRadius: "10px",
        boxShadow: "0px 0px 4px 0px rgba(0.25, 0.25, 0.25, 0.25)",
      }}
    >
      {header ? (
        <div className="w-full h-full border-b-2 border-neutral-200">
          {header || ""}
        </div>
      ) : (
        ""
      )}
      <div className="w-full h-full border-neutral-200">{children}</div>
      {footer ? (
        <div className="w-full h-full border-t-2 border-neutral-200">
          {footer}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CardContentHeaderFooter;

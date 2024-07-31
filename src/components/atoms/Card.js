import { N800 } from "@atlaskit/theme/colors";
import { token } from "@atlaskit/tokens";

const Card = ({ children, hoverBorderColor, withCenter = false }) => {
  return (
    <div
      className={`py-2 w-full rounded flex flex-col ${
        withCenter && `items-center`
      } h-full bg-white`}
      style={{
        color: token("color.text", N800),
        borderRadius: "10px",
        boxShadow: "0px 0px 4px 0px rgba(0.25, 0.25, 0.25, 0.25)",
        border: `1px solid transparent`,
        transition: `border-color 0.3s ease`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = hoverBorderColor;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "transparent";
      }}
    >
      {children}
    </div>
  );
};

export default Card;

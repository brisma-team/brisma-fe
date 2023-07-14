import { N800 } from "@atlaskit/theme/colors";
import { token } from "@atlaskit/tokens";

const Card = ({ children }) => {
  return (
    <div
      className="py-2 w-full rounded flex flex-col items-center h-full"
      style={{
        color: token("color.text", N800),
        borderRadius: "10px",
        boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
      }}
    >
      {children}
    </div>
  );
};

export default Card;

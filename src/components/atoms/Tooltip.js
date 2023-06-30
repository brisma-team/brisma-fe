import Tooltip from "@atlaskit/tooltip";

const TooltipField = ({ children, text }) => {
  return <Tooltip content={text}>{children}</Tooltip>;
};

export default TooltipField;

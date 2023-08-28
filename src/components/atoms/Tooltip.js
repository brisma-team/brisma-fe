import styled from "@emotion/styled";
import { token } from "@atlaskit/tokens";

import Tooltip, { TooltipPrimitive } from "@atlaskit/tooltip";
import Link from "next/link";

const InlineDialog = styled(TooltipPrimitive)`
  background: white;
  border-radius: ${token("border.radius", "4px")};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  box-sizing: content-box;
  padding: ${token("space.100", "8px")} ${token("space.150", "12px")};
`;

const TooltipField = ({ textButton, content }) => (
  <Tooltip component={InlineDialog} content={content}>
    {(tooltipProps) => (
      <Link href={"#"} {...tooltipProps}>
        {textButton}
      </Link>
    )}
  </Tooltip>
);

export default TooltipField;

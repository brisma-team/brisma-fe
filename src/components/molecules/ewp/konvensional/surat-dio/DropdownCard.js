import React, { useState } from "react";
import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from "@atlaskit/dropdown-menu";
import Button from "@atlaskit/button/standard-button";
import { IconMore } from "@/components/icons";

const DropdownCard = ({ handleClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu
      trigger={({ triggerRef, ...props }) => (
        <Button
          {...props}
          ref={triggerRef}
          iconBefore={<IconMore label="more" />}
        />
      )}
      isOpen={isOpen}
      onOpenChange={(e) => (setIsOpen(e.isOpen), e.event.stopPropagation())}
    >
      <DropdownItemGroup>
        <DropdownItem onClick={handleClick}>Workflow Approval</DropdownItem>
      </DropdownItemGroup>
    </DropdownMenu>
  );
};

export default DropdownCard;

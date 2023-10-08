import React, { useState } from "react";
import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from "@atlaskit/dropdown-menu";
import Button from "@atlaskit/button/standard-button";
import { IconMore } from "@/components/icons";

const DropdownCard = ({ action }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeDropdown = () => {
    setIsOpen(false);
  };

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
        {action?.map((v, i) => {
          return (
            <DropdownItem onClick={() => (closeDropdown(), v.action)} key={i}>
              {v.label}
            </DropdownItem>
          );
        })}
      </DropdownItemGroup>
    </DropdownMenu>
  );
};

export default DropdownCard;

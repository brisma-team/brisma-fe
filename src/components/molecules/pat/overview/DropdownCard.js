import React, { useState } from "react";
import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from "@atlaskit/dropdown-menu";
import Button from "@atlaskit/button/standard-button";
import { IconMore } from "@/components/icons";

const DropdownCard = () => {
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
        <DropdownItem onClick={closeDropdown}>Change Initiator</DropdownItem>
        <DropdownItem onClick={closeDropdown}>
          Reset Approval PAT RAO
        </DropdownItem>
        <DropdownItem onClick={closeDropdown}>
          Reset Approval PAT HOA
        </DropdownItem>
        <DropdownItem onClick={closeDropdown}>Riwayat Dokumen</DropdownItem>
      </DropdownItemGroup>
    </DropdownMenu>
  );
};

export default DropdownCard;

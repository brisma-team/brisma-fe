import React, { useState } from "react";
import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from "@atlaskit/dropdown-menu";
import Image from "next/image";
import { ImageMore } from "@/helpers/imagesUrl";

const DropdownCard = ({ actions }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <DropdownMenu
      trigger={({ triggerRef, isSelected, testId, ...props }) => (
        <div
          ref={triggerRef}
          {...props}
          role="button"
          tabIndex={0}
          className="h-full flex items-center"
        >
          <Image src={ImageMore} alt="" height={22} width={22} />
        </div>
      )}
      isOpen={isOpen}
      onOpenChange={(e) => (setIsOpen(e.isOpen), e.event.stopPropagation())}
    >
      <DropdownItemGroup>
        {actions?.map((v, i) => {
          return (
            <DropdownItem
              onClick={() => (closeDropdown(), v?.action())}
              isDisabled={v?.isDisabled}
              key={i}
            >
              <p
                className={`${v?.isDisabled && `text-gray-300`} font-semibold`}
              >
                {v.label}
              </p>
            </DropdownItem>
          );
        })}
      </DropdownItemGroup>
    </DropdownMenu>
  );
};

export default DropdownCard;

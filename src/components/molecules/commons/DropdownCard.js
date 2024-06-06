import React, { useState } from "react";
import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from "@atlaskit/dropdown-menu";
// import Image from "next/image";
// import { ImageMore } from "@/helpers/imagesUrl";
import { IconList } from "@/components/icons";

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
          className="h-full flex text-atlasian-blue-dark hover:text-atlasian-blue-light items-center hover:border-atlasian-blue-light border-2 rounded-full border-atlasian-blue-dark p-1"
        >
          <IconList size="small" />
          {/* <Image src={ImageMore} alt="" height={22} width={22} /> */}
        </div>
      )}
      isOpen={isOpen}
      onOpenChange={(e) => (setIsOpen(e.isOpen), e.event.stopPropagation())}
    >
      <DropdownItemGroup>
        {actions?.map((v, i) => {
          return (
            <DropdownItem
              onClick={(e) => (closeDropdown(), v?.action(e))}
              isDisabled={v?.isDisabled}
              key={i}
            >
              <span
                className={`${v?.isDisabled && `text-gray-300`} font-semibold`}
              >
                {v.label}
              </span>
            </DropdownItem>
          );
        })}
      </DropdownItemGroup>
    </DropdownMenu>
  );
};

export default DropdownCard;

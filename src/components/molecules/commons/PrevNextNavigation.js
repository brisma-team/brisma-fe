import { useState, useRef } from "react";
import {
  IconAlignCenter,
  IconArrowLeft,
  IconArrowRight,
} from "@/components/icons";
import Button from "@atlaskit/button";
import { DropdownFilter } from "@/components/atoms";

const PrevNextNavigation = ({ baseUrl, routes }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef(null);

  return (
    <div className="my-3 w-24">
      <div className="flex justify-between w-24">
        <div className="rounded-full overflow-hidden border-4 border-atlasian-blue-light w-7 h-7">
          <Button
            shouldFitContainer
            iconBefore={<IconArrowLeft primaryColor="#0C66E4" size="medium" />}
            className="bottom-1.5"
          />
        </div>
        <div
          className="rounded-full border-4 border-atlasian-blue-light w-7 h-7"
          ref={ref}
        >
          <Button
            shouldFitContainer
            iconBefore={
              <IconAlignCenter primaryColor="#0C66E4" size="medium" />
            }
            className="bottom-1.5"
            onClick={() => setShowDropdown(!showDropdown)}
          />
          {showDropdown && (
            <div
              className="mt-2 flex flex-col w-40"
              style={{ marginLeft: "-70px" }}
            >
              <DropdownFilter
                show={showDropdown}
                onClickOutside={() => setShowDropdown(false)}
                callbackRef={ref}
                baseUrl={baseUrl}
                routes={routes}
              />
            </div>
          )}
        </div>
        <div className="rounded-full overflow-hidden border-4 border-atlasian-blue-light w-7 h-7">
          <Button
            shouldFitContainer
            iconBefore={<IconArrowRight primaryColor="#0C66E4" size="medium" />}
            className="bottom-1.5"
          />
        </div>
      </div>
    </div>
  );
};

export default PrevNextNavigation;

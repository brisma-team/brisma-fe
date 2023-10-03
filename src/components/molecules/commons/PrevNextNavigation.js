import { useState, useRef } from "react";
import {
  IconAlignCenter,
  IconArrowLeft,
  IconArrowRight,
} from "@/components/icons";
import Button from "@atlaskit/button";
import { DropdownFilter, LinkIcon } from "@/components/atoms";

const PrevNextNavigation = ({
  baseUrl,
  routes,
  prevUrl,
  nextUrl,
  marginLeft,
  widthDropdown,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef(null);

  return (
    <div className="my-3 w-24">
      <div className="flex justify-end gap-1.5">
        {prevUrl && (
          <div className="rounded-full overflow-hidden border-4 border-atlasian-blue-light w-7 h-7 flex justify-center items-center">
            <LinkIcon
              href={`${baseUrl}${prevUrl}`}
              icon={
                <div className="mt-1">
                  <IconArrowLeft primaryColor="#0C66E4" size="medium" />
                </div>
              }
            />
          </div>
        )}
        <div
          className={`rounded-full border-4 border-atlasian-blue-light w-7 h-7 ${
            !routes && `opacity-30`
          }`}
          ref={ref}
        >
          <Button
            shouldFitContainer
            iconBefore={
              <IconAlignCenter primaryColor="#0C66E4" size="medium" />
            }
            className="bottom-1.5"
            onClick={() => setShowDropdown(!showDropdown)}
            isDisabled={routes ? false : true}
          />
          {showDropdown && (
            <div
              className={`mt-2 flex flex-col ${
                widthDropdown || `w-48`
              } absolute`}
              style={{ marginLeft: marginLeft || "-90px" }}
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
        {nextUrl && (
          <div className="rounded-full overflow-hidden border-4 border-atlasian-blue-light w-7 h-7 flex justify-center items-center">
            <LinkIcon
              href={`${baseUrl}${nextUrl}`}
              icon={
                <div className="mt-1">
                  <IconArrowRight primaryColor="#0C66E4" size="medium" />
                </div>
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PrevNextNavigation;

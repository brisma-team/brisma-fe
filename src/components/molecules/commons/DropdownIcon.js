import { ButtonIcon, Card, DivButton } from "@/components/atoms";
import { IconSetting } from "@/components/icons";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

const DropdownIcon = ({ onClickOutside }) => {
  const ref = useRef(null);

  const [show, setShow] = useState(false);
  const handleClick = () => {
    console.log("test 123");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShow(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onClickOutside]);

  return (
    <div className="relative" ref={ref}>
      <ButtonIcon
        icon={<IconSetting size="medium" />}
        handleClick={(e) => (e.stopPropagation(), setShow(!show))}
      />
      {show && (
        <div className="rounded absolute bg-gray-100 z-20 top-7 w-32">
          <Card>
            <div className="px-2 flex flex-col">
              <DivButton className="my-0.5" handleClick={handleClick}>
                Change Initiator
              </DivButton>
              <DivButton className="my-0.5" handleClick={handleClick}>
                Create Workflow
              </DivButton>
              <DivButton className="my-0.5" handleClick={handleClick}>
                Reset Workflow
              </DivButton>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DropdownIcon;

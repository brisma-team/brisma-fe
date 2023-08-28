import { ButtonField } from "@/components/atoms";
import { IconPlus } from "@/components/icons";

const { Card } = require("flowbite-react");

const CardFormInput = ({
  title,
  children,
  isDataArray,
  icon,
  buttonBottom,
  buttonText,
  handleClickButtonBottom,
  className,
}) => {
  return (
    <div>
      <Card>
        <div className="w-full -mt-3">
          <div className="w-full px-2 mb-4">
            <p className={`font-semibold text-sm ${className}`}>{title}</p>
          </div>
          <div className={`${!isDataArray && `flex`}`}>
            {children}
            {icon && <div className="my-3 ml-2 flex items-center">{icon}</div>}
          </div>
          {buttonBottom && (
            <div className="flex w-full items-center gap-2">
              <div className="bg-none w-40 mt-3">
                <ButtonField
                  iconAfter={
                    <div className="text-brisma">
                      <IconPlus size="medium" />
                    </div>
                  }
                  text={`Tambah ${buttonText}`}
                  textColor={"brisma"}
                  handler={handleClickButtonBottom}
                />
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CardFormInput;

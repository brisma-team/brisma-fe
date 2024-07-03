import { CardContentHeaderFooter } from "@/components/molecules/commons";
import { ButtonIcon } from "@/components/atoms";
import Image from "next/image";
import { ImageEdit } from "@/helpers/imagesUrl";

const CardContentLanding = ({
  title,
  handleClickEdit,
  isDisabled,
  children,
}) => {
  return (
    <CardContentHeaderFooter
      header={
        <div className="flex justify-between items-center px-3 py-1">
          <p className="text-lg font-bold">{title || ""}</p>
          <ButtonIcon
            handleClick={handleClickEdit}
            icon={<Image alt="" src={ImageEdit} />}
            isDisabled={isDisabled}
          />
        </div>
      }
      headerHeight={"h-fit"}
    >
      {children}
    </CardContentHeaderFooter>
  );
};

export default CardContentLanding;

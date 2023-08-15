import { ImageCheck, ImageKliping } from "@/helpers/imagesUrl";
import Image from "next/image";

const ApprovalUkaItems = ({ title, text, data }) => {
  let allSigned = false,
    findApproval = -1;
  if (text !== "-") {
    if (title === "Maker" && text) {
      allSigned = true;
    } else {
      const checkSigned = text?.every((item) => item.is_signed === true);
      if (checkSigned && text?.length) allSigned = true;
    }
  }

  if (data?.statusApprover) {
    findApproval = text?.findIndex((v) => {
      return v?.pn === data?.statusApprover?.pn;
    });
  }

  return (
    <div className="my-3">
      <div className="w-full flex justify-between">
        <p className="text-brisma text-base font-semibold">{title}</p>
        {allSigned && (
          <div className="ml-2 flex items-center">
            <Image alt="" src={ImageCheck} />
          </div>
        )}
      </div>
      {!text || !text?.length ? (
        <div className="font-brisma text-base my-0.5">-</div>
      ) : Array.isArray(text) ? (
        text.map((v, i) => {
          return (
            <div
              key={i}
              className="font-brisma text-base my-0.5 flex justify-between"
            >
              <div className="text-base text-brisma w-full">{v.nama}</div>
              {findApproval !== -1 && i === findApproval && (
                <div className="ml-2 flex items-center">
                  <Image alt="" src={ImageKliping} />
                </div>
              )}
            </div>
          );
        })
      ) : (
        <div className="font-brisma text-base my-0.5">{text}</div>
      )}
    </div>
  );
};

export default ApprovalUkaItems;

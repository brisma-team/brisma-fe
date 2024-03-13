import { ImageCheck, ImageKliping } from "@/helpers/imagesUrl";
import Image from "next/image";

const ApprovalItems = ({ title, text, data }) => {
  let allSigned = false,
    findApproval = -1;

  if (["Maker", "P.I.C", "P.I.C Auditor", "Proposer"].includes(title) && text) {
    allSigned = true;
  } else if (title === "Signer" && text?.length) {
    allSigned = true;
  } else {
    const checkSigned =
      Array.isArray(text) && text.every((item) => item.is_signed === true);
    if (checkSigned && Array.isArray(text) && text.length) allSigned = true;
  }

  if (data?.on_approver) {
    findApproval = text?.findIndex((v) => {
      return v?.pn === data?.on_approver?.pn;
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

export default ApprovalItems;

import {
  DivButton,
  Card,
  TextAreaField,
  ButtonField,
} from "@/components/atoms";
import { convertDate } from "@/helpers";
import Image from "next/image";
import { ImageAvatar } from "@/helpers/imagesUrl";
import { useState } from "react";

const CardComment = ({ type, data }) => {
  return (
    <div className={`${type === "child" && `pl-12`}`}>
      <div className="flex items-center">
        <div>
          <Image src={ImageAvatar} alt="chat" />
        </div>
        <div className="w-full flex justify-between items-center pl-2">
          <div className={`text-xs font-medium`}>
            {`${data?.created_by?.pn} - ${data?.created_by?.fullName}`}
          </div>
          <div className={`text-xs font-medium`}>
            {convertDate(data?.created_at, "-", "d")}
          </div>
        </div>
      </div>
      <div className="my-2">
        <Card>
          <div className="py-1 px-4 w-full">
            <p className="text-justify text-xs font-semibold">
              {data?.deskripsi}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

const CardCommentDetail = ({
  data,
  handleSubmitCommentChild,
  handleCloseComment,
  isHideButton = false,
}) => {
  const [open, setOpen] = useState(false);
  const [commentTextChild, setCommentTextChild] = useState("");

  const handleSubmit = async (e, parent_id) => {
    await handleSubmitCommentChild(
      e,
      { parent_id, desc: commentTextChild },
      commentTextChild
    );
    setCommentTextChild("");
  };

  if (open) {
    return (
      <DivButton
        handleClick={(e) => {
          e.stopPropagation();
          setOpen(false);
        }}
      >
        <Card>
          <div className="px-4 py-1 my-1 w-full">
            <CardComment type={"parent"} data={data} />
            {data?.child_comment?.length
              ? data?.child_comment?.map((child, idx) => {
                  return <CardComment key={idx} type={"child"} data={child} />;
                })
              : ""}
            {!data?.is_closed && !isHideButton && (
              <div className="pl-12 mt-4">
                <TextAreaField
                  value={commentTextChild}
                  placeholder="Tanggapi komentar.."
                  handleChange={(e) => setCommentTextChild(e.target.value)}
                  handleClick={(e) => e.stopPropagation()}
                />
                <div className="w-full flex justify-end gap-3 mt-2">
                  <div
                    className={`w-36 ${
                      !commentTextChild
                        ? "bg-atlasian-gray-light"
                        : "bg-atlasian-blue-light"
                    } rounded flex items-center`}
                  >
                    <ButtonField
                      disabled={!commentTextChild}
                      text={"Tanggapi Comment"}
                      style={"font-semibold"}
                      handler={(e) => {
                        e.stopPropagation();
                        handleSubmit(e, data?.id);
                      }}
                      name="reply"
                    />
                  </div>
                  <div className="w-36 bg-atlasian-green rounded flex items-center">
                    <ButtonField
                      text={"Selesai"}
                      style={"font-semibold"}
                      handler={(e) =>
                        handleCloseComment(e, {
                          parent_id: data?.id,
                        })
                      }
                      name="done"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      </DivButton>
    );
  } else {
    return (
      <DivButton
        className="h-[3.375rem] px-3 bg-atlasian-green w-full rounded flex items-center"
        handleClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
      >
        <div>
          <Image src={ImageAvatar} alt="chat" />
        </div>
        <div className="w-full flex justify-between items-center pl-2">
          <div className="text-xs font-medium text-white">
            {`${data?.created_by?.pn} - ${data?.created_by?.fullName}`}
          </div>
          <div className="text-xs font-medium text-white">
            {convertDate(data?.created_at, "-", "d")}
          </div>
        </div>
      </DivButton>
    );
  }
};

export default CardCommentDetail;

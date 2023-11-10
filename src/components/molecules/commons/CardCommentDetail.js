import { useState } from "react";
import {
  DivButton,
  Card,
  TextAreaField,
  ButtonField,
} from "@/components/atoms";
import { convertDate } from "@/helpers";
import Image from "next/image";
import { ImageAvatar } from "@/helpers/imagesUrl";

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
  commentText,
  handleSubmitChild,
  handleSelectedParentComment,
  handleChangeTextComment,
}) => {
  const [open, setOpen] = useState(false);

  if (open) {
    return (
      <DivButton
        handleClick={(e) => {
          e.stopPropagation();
          setOpen(false);
          handleSelectedParentComment(data?.id);
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
            {!data?.is_closed && (
              <div className="pl-12 mt-4">
                <TextAreaField
                  value={commentText}
                  placeholder="Tanggapi komentar.."
                  resize="auto"
                  handleChange={handleChangeTextComment}
                  handleClick={(e) => e.stopPropagation()}
                />
                <div className="w-full flex justify-end gap-3 mt-2">
                  <div className="w-36 h-10 bg-atlasian-blue-light rounded flex items-center">
                    <ButtonField
                      text={"Tanggapi Comment"}
                      style={"font-semibold"}
                      handler={(e) =>
                        handleSubmitChild(e, {
                          parent_id: data[0]?.id,
                          pat_id: data[0]?.pat_id,
                        })
                      }
                      name="reply"
                    />
                  </div>
                  <div className="w-36 h-10 bg-atlasian-green rounded flex items-center">
                    <ButtonField
                      text={"Selesai"}
                      style={"font-semibold"}
                      handler={(e) =>
                        handleSubmitChild(e, {
                          parent_id: data[0]?.id,
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
          setOpen(!open);
          handleSelectedParentComment(data?.id);
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

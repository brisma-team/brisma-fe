import { useEffect } from "react";
import { ButtonField, Card, DivButton } from "@/components/atoms";
import Image from "next/image";
import { ImageAvatar } from "@/helpers/imagesUrl";
import { convertDate } from "@/helpers";

const CommentDetail = ({
  textColor,
  imageUrl,
  commentBy,
  commentAt,
  style,
}) => {
  return (
    <div className={`rounded flex items-center ${style && style} w-full mb-4`}>
      <div>
        <Image src={imageUrl} alt="chat" />
      </div>
      <div className="w-full flex justify-between items-center pl-2">
        <div className={`text-xs font-medium ${textColor && textColor}`}>
          {commentBy}
        </div>
        <div className={`text-xs font-medium ${textColor && textColor}`}>
          {commentAt}
        </div>
      </div>
    </div>
  );
};

const Comment = ({
  comment_by,
  comment_at,
  comment_description,
  image_url,
}) => {
  return (
    <div className="my-3">
      <Card>
        <div className="px-3 py-1 my-1">
          <CommentDetail
            style={"bg-white"}
            imageUrl={image_url}
            commentBy={comment_by}
            commentAt={comment_at}
          />
          <div className="my-2">
            <Card>
              <div className="py-1 px-4 w-full">
                <p className="text-justify text-xs font-semibold">
                  {comment_description}
                </p>
              </div>
            </Card>
          </div>
          <div className="w-full flex justify-end gap-3 mt-4">
            <div className="w-40 h-10 bg-atlasian-blue-light rounded flex items-center">
              <ButtonField text={"Tautkan Comment"} name={"tautkan"} />
            </div>
            <div className="w-40 h-10 bg-atlasian-green rounded flex items-center">
              <ButtonField text={"Resolve"} name={"resolve"} />
            </div>
          </div>
          <></>
        </div>
      </Card>
    </div>
  );
};

const CardComment = ({
  data,
  handleClick,
  handleClickOutside,
  callbackRef,
}) => {
  const ref = callbackRef;

  useEffect(() => {
    const clickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handleClickOutside && handleClickOutside();
      }
    };
    document.addEventListener("click", clickOutside, true);
    return () => {
      document.removeEventListener("click", clickOutside, true);
    };
  }, [handleClickOutside]);

  const commentItems = [];

  if (data?.length) {
    data.forEach((innerArray) => {
      innerArray.forEach((v, i) => {
        commentItems.push(
          <Comment
            key={i}
            image_url={ImageAvatar}
            comment_by={`${v.pn_create_by} - ${v.nama_create_by}`}
            comment_at={convertDate(v.create_at, "-", "d")}
            comment_description={v.deskripsi}
          />
        );
      });
    });
  }

  return (
    <DivButton className="w-full" handleClick={handleClick}>
      <div className="w-[29.18rem] max-h-[45.58rem] overflow-y-scroll overflow-x-hidden flex-shrink-0 absolute z-50 bg-white -my-2 -ml-2">
        <div className="px-2 pb-2">
          <Card>
            <div className="px-6">
              <div className="w-full">
                <p className="text-xl font-bold">Comments</p>
                <div className="rounded bg-atlasian-purple text-white mt-2 w-36 h-10 flex justify-center items-center">
                  <ButtonField text={"Tambah Comment"} />
                </div>
              </div>
              {commentItems}

              <div className="">
                <CommentDetail
                  style={"h-[3.375rem] px-3 bg-atlasian-green"}
                  textColor={"text-white"}
                  imageUrl={ImageAvatar}
                  commentBy={"7581702 - Eky Gunawan"}
                  commentAt={"22-Juni-2023"}
                />
                <CommentDetail
                  style={"h-[3.375rem] px-3 bg-atlasian-green"}
                  textColor={"text-white"}
                  imageUrl={ImageAvatar}
                  commentBy={"7581702 - Eky Gunawan"}
                  commentAt={"22-Juni-2023"}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DivButton>
  );
};

export default CardComment;

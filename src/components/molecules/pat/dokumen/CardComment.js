import { useEffect } from "react";
import { ButtonField, Card } from "@/components/atoms";
import Image from "next/image";
import { ImageAvatar } from "@/helpers/imagesUrl";

const Button = ({ bgColor, buttonText }) => {
  return (
    <div
      className={`rounded ${bgColor} text-white mt-2 w-36 h-10 flex justify-center items-center`}
    >
      <ButtonField text={buttonText} />
    </div>
  );
};

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
              <div className="py-1 px-4">
                <p className="text-justify text-xs font-semibold">
                  {comment_description}
                </p>
              </div>
            </Card>
          </div>
          <div className="w-full flex justify-end gap-3">
            <Button
              bgColor={"bg-atlasian-blue-light"}
              buttonText={"Tautkan Comment"}
            />
            <Button bgColor={"bg-atlasian-green"} buttonText={"Resolve"} />
          </div>
          <></>
        </div>
      </Card>
    </div>
  );
};

const CardComment = ({ show, onClickOutside, callbackRef }) => {
  const ref = callbackRef;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside && onClickOutside();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onClickOutside]);

  if (!show) return null;

  return (
    <div className="w-full">
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
              <Comment
                image_url={ImageAvatar}
                comment_by={"7581702 - Eky Gunawan"}
                comment_at={"22-Juni-2023"}
                comment_description={
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim non nulla quis aliquet. Nullam posuere dui sit amet orci fringilla, congue porttitor tellus malesuada. Proin aliquet laoreet lectus, vel dapibus mi congue ut. Aenean ornare efficitur iaculis"
                }
              />
              <Comment
                image_url={ImageAvatar}
                comment_by={"7581702 - Eky Gunawan"}
                comment_at={"22-Juni-2023"}
                comment_description={
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim non nulla quis aliquet. Nullam posuere dui sit amet orci fringilla, congue porttitor tellus malesuada. Proin aliquet laoreet lectus, vel dapibus mi congue ut. Aenean ornare efficitur iaculis"
                }
              />
              <Comment
                image_url={ImageAvatar}
                comment_by={"7581702 - Eky Gunawan"}
                comment_at={"22-Juni-2023"}
                comment_description={
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim non nulla quis aliquet. Nullam posuere dui sit amet orci fringilla, congue porttitor tellus malesuada. Proin aliquet laoreet lectus, vel dapibus mi congue ut. Aenean ornare efficitur iaculis"
                }
              />
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
    </div>
  );
};

export default CardComment;

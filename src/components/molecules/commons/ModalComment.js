import { ButtonField, Card, TextAreaField } from "@/components/atoms";
import { useEffect, useState } from "react";
import CardCommentDetail from "./CardCommentDetail";
import { errorSwal } from "@/helpers";

const ModalComment = ({
  data,
  show,
  handleClickOutside,
  callbackRef,
  handleSubmitParent,
  handleSubmitChild,
  handleSelectedParentComment,
}) => {
  const ref = callbackRef;
  const [newComment, setNewComment] = useState(false);
  const [commentTextParent, setCommentTextParent] = useState("");
  const [commentTextChild, setCommentTextChild] = useState("");

  useEffect(() => {
    const clickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        const isDivButtonClick = event.target.classList.contains("comment");

        if (!isDivButtonClick) {
          handleClickOutside && handleClickOutside(event);
        }
      }
    };
    document.addEventListener("click", clickOutside);
    return () => {
      document.removeEventListener("click", clickOutside);
    };
  }, [handleClickOutside]);

  const handleSubmitCommentParent = async (e) => {
    setNewComment(false);

    if (!commentTextParent) {
      errorSwal("Silahkan masukkan komentar Anda.");
      return;
    }

    await handleSubmitParent(e, commentTextParent);
    setCommentTextParent("");
  };

  const handleSubmitCommentChild = async (e) => {
    setNewComment(false);
    if (!commentTextChild) {
      errorSwal("Silakan masukkan komentar atau tanggapan Anda.");
      return;
    }

    await handleSubmitChild(e, commentTextChild);
    setCommentTextChild("");
  };

  const handleChangeTextComment = (e) => {
    setCommentTextChild(e.target.value);
  };

  if (!show) return;

  return (
    <div className="comment w-full -my-2">
      <div className="comment w-[29.18rem] max-h-[42.5rem] overflow-y-scroll overflow-x-hidden flex-shrink-0 absolute z-50 bg-white -my-2 -ml-2">
        <div className="comment ml-1.5" style={{ padding: "0.07rem" }}>
          <Card>
            <div className="comment px-4 w-full pb-2">
              <p className="comment text-xl font-bold">Comments</p>
              <div className="comment rounded bg-atlasian-purple text-white mt-2 w-36 h-10 flex justify-center items-center">
                <ButtonField
                  text={"Tambah Comment"}
                  handler={(e) => {
                    e.stopPropagation();
                    setNewComment(!newComment);
                  }}
                  style={"font-semibold"}
                />
              </div>
              {newComment && (
                <div className="comment w-full flex flex-col justify-end mt-3">
                  <TextAreaField
                    handleChange={(e) => setCommentTextParent(e.target.value)}
                    value={commentTextParent}
                    placeholder="Tambahkan komentar.."
                    handleClick={(e) => {
                      e.stopPropagation();
                    }}
                    resize="auto"
                  />
                  <div className="comment w-full flex justify-end mt-3">
                    <div className="comment w-36 h-10 bg-atlasian-blue-light rounded flex items-center">
                      <ButtonField
                        text={"Tautkan Comment"}
                        handler={handleSubmitCommentParent}
                        style={"font-semibold"}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div className="w-full py-1">
                {data?.length
                  ? data?.map((parent, idx) => {
                      return (
                        <div key={idx} className="py-2">
                          <CardCommentDetail
                            handleSubmitChild={handleSubmitCommentChild}
                            data={parent}
                            handleSelectedParentComment={
                              handleSelectedParentComment
                            }
                            commentText={commentTextChild}
                            handleChangeTextComment={handleChangeTextComment}
                          />
                        </div>
                      );
                    })
                  : ""}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ModalComment;

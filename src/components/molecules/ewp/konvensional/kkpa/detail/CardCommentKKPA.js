import { useEffect } from "react";
import {
  ButtonField,
  Card,
  DivButton,
  TextAreaField,
} from "@/components/atoms";
import Image from "next/image";
import { ImageAvatar } from "@/helpers/imagesUrl";
import { convertDate, usePostData, useUpdateData } from "@/helpers";
import { useState } from "react";
import { useCommentPAT } from "@/data/pat";
import { useRouter } from "next/router";

const CommentDetail = ({ mutate, babCode, data }) => {
  const [open, setOpen] = useState(false);
  const [commentTextChild, setCommentTextChild] = useState("");

  const handleSubmitChild = async (e, { parent_id, pat_id }) => {
    e.stopPropagation();
    switch (e.target.offsetParent.name) {
      case "reply":
        await usePostData(
          `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/comment`,
          {
            pat_id,
            ref_bab_pat_kode: babCode,
            deskripsi: commentTextChild,
            parent_comment_id: parent_id,
          }
        );
        setCommentTextChild("");
        break;
      case "done":
        await useUpdateData(
          `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/comment?parent=${parent_id}`,
          {}
        );
        break;
    }
    mutate();
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
            {data?.length &&
              data?.map((v, i) => {
                return (
                  <div key={i} className={`${v?.parent_comment_id && `pl-12`}`}>
                    <div className="flex items-center">
                      <div>
                        <Image src={ImageAvatar} alt="chat" />
                      </div>
                      <div className="w-full flex justify-between items-center pl-2">
                        <div className={`text-xs font-medium`}>
                          {`${v?.pn_create_by} - ${v?.nama_create_by}`}
                        </div>
                        <div className={`text-xs font-medium`}>
                          {convertDate(v?.create_at, "-", "d")}
                        </div>
                      </div>
                    </div>
                    <div className="my-2">
                      <Card>
                        <div className="py-1 px-4 w-full">
                          <p className="text-justify text-xs font-semibold">
                            {v?.deskripsi}
                          </p>
                        </div>
                      </Card>
                    </div>
                  </div>
                );
              })}
            {!data[0]?.is_closed && (
              <div className="pl-12 mt-4">
                <TextAreaField
                  value={commentTextChild}
                  placeholder="Tanggapi komentar.."
                  resize="auto"
                  handleChange={(e) => setCommentTextChild(e.target.value)}
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
        }}
      >
        <div>
          <Image src={ImageAvatar} alt="chat" />
        </div>
        <div className="w-full flex justify-between items-center pl-2">
          <div className="text-xs font-medium text-white">
            {`${data[0]?.pn_create_by} - ${data[0]?.nama_create_by}`}
          </div>
          <div className="text-xs font-medium text-white">
            {convertDate(data[0]?.create_at, "-", "d")}
          </div>
        </div>
      </DivButton>
    );
  }
};

const Comment = ({ mutate, babCode, data }) => {
  return (
    <div className="w-full py-1">
      {data?.length
        ? data?.map((v, i) => {
            return (
              <div key={i} className="py-2">
                <CommentDetail mutate={mutate} babCode={babCode} data={v} />
              </div>
            );
          })
        : ""}
    </div>
  );
};

const CardCommentKKPA = ({
  activeIndexBab,
  show,
  handleClickOutside,
  callbackRef,
}) => {
  const { id } = useRouter().query;
  const ref = callbackRef;
  const [newComment, setNewComment] = useState(false);
  const [commentTextParent, setCommentTextParent] = useState("");

  const { commentPAT, commentPATMutate } = useCommentPAT("list", {
    id,
    bab: activeIndexBab,
  });

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

  const handleSubmitParent = async (e) => {
    e.stopPropagation();
    const body = {
      pat_id: id,
      ref_bab_pat_kode: activeIndexBab.toString(),
      deskripsi: commentTextParent,
    };

    await usePostData(
      `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/comment`,
      body
    );

    commentPATMutate();
    setNewComment(false);
    setCommentTextParent("");
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
                        handler={handleSubmitParent}
                        style={"font-semibold"}
                      />
                    </div>
                  </div>
                </div>
              )}
              {commentPAT?.data?.length ? (
                <Comment
                  mutate={commentPATMutate}
                  babCode={activeIndexBab}
                  data={commentPAT?.data}
                />
              ) : (
                ""
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CardCommentKKPA;

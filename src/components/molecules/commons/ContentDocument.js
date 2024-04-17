import { Card, DivButton } from "@/components/atoms";
import ModalComment from "./ModalComment";
import Image from "next/image";
import { ImageChat } from "@/helpers/imagesUrl";
import { useRef } from "react";

const ContentDocument = ({
  dataDoc,
  dataComment,
  activeIndex,
  activeIndexComment,
  activeDivRef,
  isOpenCardComment,
  isLoadingComment,
  renderContent,
  handleIsOpenCardComment,
  handleSubmitCommentParent,
  handleSubmitCommentChild,
  handleCloseComment,
  handleClickComment,
  isHideButton = false,
}) => {
  const ref = useRef(null);

  return (
    <Card>
      <div className="overflow-y-scroll my-2 parent max-h-[40rem] flex flex-col">
        <ModalComment
          callbackRef={ref}
          isLoading={isLoadingComment}
          show={isOpenCardComment}
          activeIndexComment={activeIndexComment}
          handleClickOutside={() => handleIsOpenCardComment(false)}
          handleSubmitParent={handleSubmitCommentParent}
          handleSubmitChild={handleSubmitCommentChild}
          handleCloseComment={handleCloseComment}
          data={dataComment}
          isHideButton={isHideButton}
        />
        {dataDoc.map((v, i) => {
          return (
            <div
              key={i}
              className={`page-container-a4 shrink-0 ${
                i + 1 === activeIndex ? "active" : ""
              }`}
              tabIndex={i + 1 === activeIndex ? 0 : -1}
              ref={i + 1 === activeIndex ? activeDivRef : null}
            >
              {v.content && (
                <div className="px-4 h-full w-full relative page-content-a4">
                  <div className="flex justify-between">
                    <div className="font-bold text-xl">{v.title}</div>
                    <div className="flex items-center" ref={ref}>
                      <DivButton
                        handleClick={() =>
                          handleClickComment(v?.bab_id, v?.idx)
                        }
                      >
                        <Image src={ImageChat} alt="chat" />
                      </DivButton>
                    </div>
                  </div>
                  <div
                    className="mt-4"
                    dangerouslySetInnerHTML={{
                      __html: renderContent(v?.idx, v?.content),
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default ContentDocument;

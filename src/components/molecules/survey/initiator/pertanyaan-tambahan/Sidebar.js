import { ButtonIcon, LinkIcon } from "@/components/atoms";
import {
  ImagePreview,
  ImageGroup,
  ImageCheck,
  ImageAddCategory,
} from "@/helpers/imagesUrl";
import Image from "next/image";
import CardCategory from "./CardCategory";
import { useRouter } from "next/router";

const Sidebar = ({
  data,
  withoutButtonTop,
  isPreviewPage,
  isDisabledForm,
  isUnderChange,
  handleMutateData,
  handleAddCategory,
  handleUpdateCategory,
  handleDeleteCategory,
  handleOnEditCategory,
  handleChangeNameCategory,
  handleSaveKuesioner,
}) => {
  const { id } = useRouter().query;
  return (
    <div className="w-[31rem] minfixed min-h-screen border-x-2 border-slate-200 -mt-1.5 right-0">
      <div className="px-4 py-3 flex justify-between border-b-2 border-slate-200 bg-[#FAFBFC]">
        <p className="font-semibold text-base">Kategori</p>
        {withoutButtonTop ? (
          ""
        ) : !isDisabledForm ? (
          !isPreviewPage &&
          (data.length ? (
            <div className="flex gap-3 items-center">
              <LinkIcon
                icon={<Image src={ImagePreview} alt="" />}
                href={`/survey/initiator/overview/${id}/preview`}
              />
              <ButtonIcon
                icon={<Image src={ImageGroup} alt="" />}
                handleClick={async (e) => {
                  await handleAddCategory(e), handleMutateData();
                }}
              />
              <ButtonIcon
                icon={
                  <div className={!isUnderChange && `opacity-20`}>
                    <Image src={ImageCheck} alt="" />
                  </div>
                }
                handleClick={handleSaveKuesioner}
                isDisabled={!isUnderChange}
              />
            </div>
          ) : (
            <ButtonIcon
              icon={<Image src={ImageAddCategory} alt="" />}
              handleClick={async (e) => {
                await handleAddCategory(e), handleMutateData();
              }}
            />
          ))
        ) : (
          <LinkIcon
            icon={<Image src={ImagePreview} alt="" />}
            href={`/survey/initiator/overview/${id}/preview`}
          />
        )}
      </div>
      <div className="px-4 pt-4 flex flex-col gap-4">
        {data.length
          ? data.map((category, idx) => {
              return (
                <CardCategory
                  key={idx}
                  index={idx}
                  data={category}
                  isPreviewPage={isPreviewPage}
                  handleMutateData={handleMutateData}
                  handleUpdateCategory={handleUpdateCategory}
                  handleOnEditCategory={handleOnEditCategory}
                  handleChangeNameCategory={handleChangeNameCategory}
                  handleDeleteCategory={handleDeleteCategory}
                />
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default Sidebar;

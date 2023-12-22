import { ButtonIcon } from "@/components/atoms";
import {
  ImagePreview,
  ImageGroup,
  ImageCheck,
  ImageAddCategory,
} from "@/helpers/imagesUrl";
import Image from "next/image";
import CardCategory from "./CardCategory";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  resetDataCategory,
  setDataCategory,
} from "@/slices/reference/createTemplateReferenceSlice";

const Sidebar = ({
  data,
  isPreviewPage,
  isUnderChange,
  handleMutateData,
  handleAddCategory,
  handleUpdateCategory,
  handleDeleteCategory,
  handleOnEditCategory,
  handleChangeNameCategory,
  handleSaveKuesioner,
  handlePreview,
}) => {
  const dispatch = useDispatch();

  const dataCategory = useSelector(
    (state) => state.createTemplateReference.dataCategory
  );

  useEffect(() => {
    if (data?.data?.length) {
      const total_pertanyaan_all_kategori = data.data.reduce((acc, obj) => {
        return acc + obj.template_pertanyaan.length;
      }, 0);

      const mapping = data.data.map((category, idx) => {
        const { id, name } = category;
        const total_pertanyaan = category.template_pertanyaan
          ? category.template_pertanyaan.length
          : 0;

        return {
          idx: idx + 1,
          id,
          name,
          total_pertanyaan,
          total_pertanyaan_all_kategori,
          onEdit: false,
        };
      });

      dispatch(setDataCategory(mapping));
    } else {
      dispatch(resetDataCategory());
    }
  }, [data]);

  return (
    <div className="w-[31rem] minfixed min-h-screen border-x-2 border-slate-200 -mt-1.5 right-0">
      <div className="px-4 py-3 flex justify-between border-b-2 border-slate-200 bg-[#FAFBFC]">
        <p className="font-semibold text-base">Kategori</p>
        {!isPreviewPage &&
          (dataCategory.length ? (
            <div className="flex gap-3 items-center">
              <ButtonIcon
                icon={<Image src={ImagePreview} alt="" />}
                handleClick={handlePreview}
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
          ))}
      </div>
      <div className="px-4 pt-4 flex flex-col gap-4">
        {dataCategory.length
          ? dataCategory.map((category, idx) => {
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
        {/* <CardCategory /> */}
      </div>
    </div>
  );
};

export default Sidebar;

import { ButtonIcon, LinkIcon } from "@/components/atoms";
import {
  ImagePreview,
  ImageGroup,
  ImageCheck,
  ImageAddCategory,
} from "@/helpers/imagesUrl";
import Image from "next/image";
import CardCategory from "./CardCategory";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const Sidebar = ({
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
  const [dataCategory, setDataCategory] = useState([]);
  const payloadKuesioner = useSelector(
    (state) => state.penilaianSurvey.payloadKuesioner
  );

  useEffect(() => {
    if (payloadKuesioner?.length) {
      const total_pertanyaan_all_kategori = payloadKuesioner.reduce(
        (acc, obj) => {
          return acc + obj.pertanyaan.length;
        },
        0
      );

      const mapping = payloadKuesioner.map((category, idx) => {
        const { id, name } = category;
        const total_pertanyaan = category.pertanyaan
          ? category.pertanyaan.length
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

      setDataCategory(mapping);
    } else {
      setDataCategory([]);
    }
  }, [payloadKuesioner]);

  return (
    <div className="w-[31rem] minfixed min-h-screen border-x-2 border-slate-200 -mt-1.5 right-0">
      <div className="px-4 py-3 flex justify-between border-b-2 border-slate-200 bg-[#FAFBFC]">
        <p className="font-semibold text-base">Kategori</p>
        {!isDisabledForm ? (
          !isPreviewPage &&
          (dataCategory.length ? (
            <div className="flex gap-3 items-center">
              <LinkIcon
                icon={<Image src={ImagePreview} alt="" />}
                href={`/survey/overview/${id}/buat-survey/preview`}
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
            href={`/survey/overview/${id}/buat-survey/preview`}
          />
        )}
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

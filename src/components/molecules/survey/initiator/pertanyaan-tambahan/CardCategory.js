import { ButtonIcon, TextAreaField } from "@/components/atoms";
import { N800 } from "@atlaskit/theme/colors";
import { token } from "@atlaskit/tokens";
import Image from "next/image";
import { ImageTrash, ImageEdit, ImageCheck } from "@/helpers/imagesUrl";
import { decimalToPercentage } from "@/helpers";

const CardCategory = ({
  index,
  data,
  isPreviewPage,
  handleMutateData,
  handleUpdateCategory,
  handleOnEditCategory,
  handleChangeNameCategory,
  handleDeleteCategory,
}) => {
  return (
    <div className="w-full">
      <div
        className="w-full h-full rounded flex flex-col items-center"
        style={{
          color: token("color.text", N800),
          borderRadius: "10px",
          boxShadow: "0px 0px 4px 0px rgba(0.25, 0.25, 0.25, 0.25)",
        }}
      >
        <div
          className={`w-full h-full border-b-2 border-neutral-200 p-2 flex justify-between items-center ${
            !data?.is_default && `bg-[#EAFFE2]`
          }`}
        >
          <p className="text-base font-bold">{data?.category_name}</p>
          {!isPreviewPage && !data.is_default && (
            <div className="mr-2 flex gap-2">
              {data.onEdit ? (
                <ButtonIcon
                  icon={<Image src={ImageCheck} alt="" />}
                  handleClick={() => handleUpdateCategory(index, data)}
                />
              ) : (
                <ButtonIcon
                  icon={<Image src={ImageEdit} alt="" />}
                  handleClick={() => handleOnEditCategory(index, true)}
                />
              )}
              <ButtonIcon
                icon={<Image src={ImageTrash} alt="" />}
                handleClick={async () => {
                  await handleDeleteCategory(data.id), handleMutateData();
                }}
              />
            </div>
          )}
        </div>
        <div className="w-full min-h-[4rem] border-b-2 border-neutral-200 p-2">
          {data.onEdit ? (
            <TextAreaField
              value={data.name}
              resize={"auto"}
              handleChange={(e) =>
                handleChangeNameCategory(index, e.target.value)
              }
            />
          ) : (
            <p className="text-base font-semibold">{data.name}</p>
          )}
        </div>
        <div className="w-full h-full p-2 flex justify-between items-center">
          <div className="font-bold text-base text-atlasian-green">
            Bobot:{" "}
            {data.is_default
              ? decimalToPercentage(
                  data.total_pertanyaan / data.total_pertanyaan_all_kategori
                )
              : "0%"}
          </div>
          <div className="font-bold text-base text-atlasian-yellow">
            Pertanyaan: {data.total_pertanyaan.toString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCategory;

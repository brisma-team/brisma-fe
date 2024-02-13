import { useEffect } from "react";
import { FormWithLabel } from "@/components/molecules/commons";
import {
  ButtonIcon,
  DatepickerField,
  TextInput,
  UploadButton,
} from "@/components/atoms";
import { IconClose } from "@/components/icons";
import { loadingSwal, usePostFileData } from "@/helpers";

const ModalBodyDocumentNonPAT = ({
  data,
  setCurrentModalStage,
  isDisabled,
  validation,
  handleChange,
  handleUpload,
}) => {
  useEffect(() => {
    setCurrentModalStage(3);
  }, []);

  const handleUploadFile = async (e) => {
    loadingSwal();
    const files = e?.target?.files;
    if (files) {
      const url = `${process.env.NEXT_PUBLIC_API_URL_COMMON}/common/cdn/upload`;

      const response = await usePostFileData(
        url,
        {
          file: files[0],
          modul: "ewp",
        },
        true
      );

      handleUpload({ url: response.url[0], fileName: files[0].name });
    }
    loadingSwal("close");
  };

  return (
    <div className="w-[31rem] px-4 py-2">
      <p className="text-brisma text-lg font-bold">Lampiran Surat</p>
      <div className="mt-2 p-4 rounded-xl shadow">
        <FormWithLabel
          form={
            <TextInput
              icon={
                <ButtonIcon
                  handleClick={() => handleChange("no_surat", "")}
                  icon={<IconClose size="medium" />}
                />
              }
              onChange={(e) => handleChange("no_surat", e.target.value)}
              value={data.no_surat}
              placeholder={"Nomor Surat"}
              isDisabled={isDisabled}
            />
          }
          label="Nomor Surat*"
          widthLabel={"w-1/3"}
          widthForm={"w-2/3"}
          errors={validation?.no_surat}
        />
        <FormWithLabel
          form={
            <TextInput
              icon={
                <ButtonIcon
                  handleClick={() => handleChange("perihal", "")}
                  icon={<IconClose size="medium" />}
                />
              }
              onChange={(e) => handleChange("perihal", e.target.value)}
              value={data.perihal}
              placeholder={"Perihal"}
              isDisabled={isDisabled}
            />
          }
          label="Perihal*"
          widthLabel={"w-1/3"}
          widthForm={"w-2/3"}
          errors={validation?.perihal}
        />
        <FormWithLabel
          form={
            <div className="w-36">
              <DatepickerField
                placeholder="Tanggal Surat"
                handleChange={(e) => handleChange("tanggal_surat", e)}
                value={data.tanggal_surat}
                isDisabled={isDisabled}
              />
            </div>
          }
          label="Tanggal Surat*"
          widthLabel={"w-1/3"}
          widthForm={"w-2/3"}
          errors={validation?.tanggal_surat}
        />
        <FormWithLabel
          form={
            <div className="flex gap-2 items-center">
              <UploadButton text={"Upload"} handleUpload={handleUploadFile} />
              <div className="flex items-center h-full">
                <p className="font-medium text-base">{data.nama_file_surat}</p>
              </div>
            </div>
          }
          label="Lampiran Surat"
          widthLabel={"w-1/3"}
          widthForm={"w-2/3"}
        />
      </div>
    </div>
  );
};

export default ModalBodyDocumentNonPAT;

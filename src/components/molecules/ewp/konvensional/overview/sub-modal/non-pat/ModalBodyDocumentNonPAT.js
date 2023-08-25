import { useEffect } from "react";
import { FormWithLabel } from "@/components/molecules/commons";
import {
  ButtonIcon,
  DatepickerField,
  TextInput,
  UploadButton,
} from "@/components/atoms";
import { useDispatch, useSelector } from "react-redux";
import { setProjectOverviewData } from "@/slices/ewp/projectOverviewEWPSlice";
import { IconClose } from "@/components/icons";
import { loadingSwal, usePostFileData } from "@/helpers";

const ModalBodyDocumentNonPAT = ({ setCurrentModalStage, isDisabled }) => {
  const dispatch = useDispatch();
  const projectOverviewData = useSelector(
    (state) => state.projectOverviewEWP.projectOverviewData
  );

  useEffect(() => {
    setCurrentModalStage(3);
  }, []);

  const handleChange = (property, value) => {
    const updatedData = {
      ...projectOverviewData,
      [property]: value,
    };
    dispatch(setProjectOverviewData(updatedData));
  };

  const handleUpload = async (e) => {
    loadingSwal();
    const files = e?.target?.files;
    if (files) {
      const url = `${process.env.NEXT_PUBLIC_API_URL_COMMON}/common/cdn/upload`;

      const response = await usePostFileData(url, {
        file: files[0],
        modul: "ewp",
      });

      dispatch(
        setProjectOverviewData({
          ...projectOverviewData,
          url_file_surat: response.url[0],
          nama_file_surat: files[0].name,
        })
      );
    }
    loadingSwal("close");
  };

  useEffect(() => {
    console.log("projectOverviewData => ", projectOverviewData);
  }, [projectOverviewData]);

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
              value={projectOverviewData.no_surat}
              placeholder={"Nomor Surat"}
              isDisabled={isDisabled}
            />
          }
          label="Nomor Surat"
          widthLabel={"w-1/3"}
          widthForm={"w-2/3"}
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
              value={projectOverviewData.perihal}
              placeholder={"Perihal"}
              isDisabled={isDisabled}
            />
          }
          label="Perihal"
          widthLabel={"w-1/3"}
          widthForm={"w-2/3"}
        />
        <FormWithLabel
          form={
            <div className="w-36">
              <DatepickerField
                placeholder="Tanggal Surat"
                handleChange={(e) => handleChange("tanggal_surat", e)}
                value={projectOverviewData.tanggal_surat}
                isDisabled={isDisabled}
              />
            </div>
          }
          label="Tanggal Surat"
          widthLabel={"w-1/3"}
          widthForm={"w-2/3"}
        />
        <FormWithLabel
          form={
            <div className="flex gap-2 items-center">
              <UploadButton text={"Upload"} handleUpload={handleUpload} />
              <div className="flex items-center h-full">
                <p className="font-medium text-base">
                  {projectOverviewData.nama_file_surat}
                </p>
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

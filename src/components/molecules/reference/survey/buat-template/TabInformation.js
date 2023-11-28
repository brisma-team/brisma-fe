import {
  ButtonField,
  ButtonIcon,
  Card,
  TextAreaField,
  TextInput,
} from "@/components/atoms";
import { IconClose } from "@/components/icons";
import { FormLabel, TypeSurveySelect } from "@/components/molecules/commons";
import { N800 } from "@atlaskit/theme/colors";
import { token } from "@atlaskit/tokens";
import { useSelector } from "react-redux";

const TabInformation = ({
  isNewTemplate,
  isFormDisabled,
  handleChangeForm,
  handleSubmit,
  handleClickAddKuesioner,
  handleClickOpenModalApproval,
}) => {
  const payloadInformasi = useSelector(
    (state) => state.createTemplateReference.payloadInformasi
  );

  return (
    <div className="flex justify-between gap-4">
      <div
        className="py-2 w-full rounded flex flex-col items-center h-full"
        style={{
          color: token("color.text", N800),
          borderRadius: "10px",
          boxShadow: "0px 0px 4px 0px rgba(0.25, 0.25, 0.25, 0.25)",
        }}
      >
        <div className="pb-2 px-4 text-base font-semibold w-full border-b-2 border-neutral-200">
          Informasi survey
        </div>
        <div className="p-4 w-full flex flex-col gap-4">
          <div className="flex justify-between gap-12">
            <FormLabel
              title={"Jenis Survei*"}
              form={
                <TypeSurveySelect
                  handleChange={(e) => {
                    handleChangeForm("jenis_survey", e);
                  }}
                  selectedValue={{
                    label: payloadInformasi.jenis_survey_name,
                    value: {
                      kode: payloadInformasi.jenis_survey_kode,
                      nama: payloadInformasi.jenis_survey_name,
                    },
                  }}
                />
              }
            />
            <FormLabel
              title={"Kode Template"}
              form={
                <TextInput
                  isDisabled={true}
                  value={
                    isNewTemplate ? "" : payloadInformasi.project_template_id
                  }
                />
              }
            />
          </div>
          <FormLabel
            title={"Judul Template*"}
            form={
              <TextInput
                placeholder={"Judul template"}
                icon={
                  <ButtonIcon
                    isDisabled={true}
                    icon={
                      <ButtonIcon
                        icon={<IconClose size="large" />}
                        handleClick={() => handleChangeForm("judul", "")}
                      />
                    }
                  />
                }
                value={payloadInformasi.judul}
                onChange={(e) => handleChangeForm("judul", e.target.value)}
              />
            }
          />
          <FormLabel
            title={"Deskripsi Template*"}
            form={
              <TextAreaField
                placeholder={"Deskripsi template"}
                resize="auto"
                value={payloadInformasi.deskripsi}
                handleChange={(e) =>
                  handleChangeForm("deskripsi", e.target.value)
                }
              />
            }
          />
        </div>
      </div>
      <div className="w-56 h-fit">
        <Card>
          <div className="px-2">
            <p className="text-xl font-semibold">Tindakan</p>
            <div className="my-5 flex flex-col gap-3">
              <div
                className={`rounded w-36 ${
                  isFormDisabled || isNewTemplate
                    ? `bg-atlasian-gray-light`
                    : `bg-atlasian-purple`
                }`}
              >
                <ButtonField
                  text={"Tambah Kuesioner"}
                  // disabled={isFormDisabled || isNewTemplate}
                  handler={handleClickAddKuesioner}
                />
              </div>
              <div
                className={`rounded w-36 ${
                  isNewTemplate
                    ? `bg-atlasian-gray-light`
                    : `bg-atlasian-blue-light`
                }`}
              >
                <ButtonField
                  text={"Rumus Nilai"}
                  disabled={isFormDisabled || isNewTemplate}
                />
              </div>
              <div
                className={`rounded w-36 ${
                  isFormDisabled
                    ? `bg-atlasian-gray-light`
                    : `bg-atlasian-yellow`
                }`}
              >
                <ButtonField
                  text={"Simpan"}
                  disabled={isFormDisabled}
                  handler={handleSubmit}
                />
              </div>
              <div
                className={`rounded w-36 ${
                  isFormDisabled || isNewTemplate
                    ? `bg-atlasian-gray-light`
                    : `bg-atlasian-green`
                }`}
              >
                <ButtonField
                  text={"Approval"}
                  disabled={isFormDisabled || isNewTemplate}
                  handler={handleClickOpenModalApproval}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TabInformation;

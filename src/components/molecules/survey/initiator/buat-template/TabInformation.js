import {
  ButtonField,
  ButtonIcon,
  Card,
  DatepickerField,
  TextAreaField,
  TextInput,
} from "@/components/atoms";
import { IconClose } from "@/components/icons";
import {
  CardContentHeaderFooter,
  FormLabel,
  TypeSurveySelect,
} from "@/components/molecules/commons";
import { addDaysToDate, dateNow } from "@/helpers";
import { useSelector } from "react-redux";

const TabInformation = ({
  isNewTemplate,
  isDisabledPickTemplate,
  isFormDisabled,
  isDisabledButtonApproval,
  statusSurveyCode,
  projectTemplateId,
  handleChangeForm,
  handleOpenModalSelectedTemplateSurvey,
  handleSaveInformation,
  handleClickAddKuesioner,
  handleClickOpenModalApproval,
  handleClickResponden,
}) => {
  const payloadInformasi = useSelector(
    (state) => state.createSurvey.payloadInformasi
  );

  return (
    <div className="flex justify-between gap-4">
      <CardContentHeaderFooter
        header={
          <div className="py-2 px-4 text-base font-semibold w-full">
            Informasi survey
          </div>
        }
      >
        <div className="p-4 w-full flex flex-col gap-4">
          <FormLabel
            title={"Nama Survei*"}
            form={
              <TextInput
                placeholder={"Nama Survei"}
                icon={
                  <ButtonIcon
                    isDisabled={isFormDisabled}
                    icon={
                      <ButtonIcon
                        icon={<IconClose size="large" />}
                        handleClick={() => handleChangeForm("nama_survey", "")}
                      />
                    }
                  />
                }
                value={payloadInformasi?.nama_survey || ""}
                onChange={(e) =>
                  handleChangeForm("nama_survey", e.target.value)
                }
                isDisabled={isFormDisabled}
              />
            }
          />
          <div className="flex justify-between gap-12">
            <FormLabel
              title={"Tanggal Dimulai*"}
              form={
                <DatepickerField
                  isDisabled={isFormDisabled}
                  placeholder={"Tanggal Dimulai"}
                  format={"DD/MM/YYYY"}
                  value={payloadInformasi?.pelaksanaan_start || ""}
                  handleChange={(value) =>
                    handleChangeForm("pelaksanaan_start", value)
                  }
                  minDate={dateNow()}
                  maxDate={
                    addDaysToDate(payloadInformasi?.pelaksanaan_end, "-", 1) ||
                    null
                  }
                />
              }
            />
            <FormLabel
              title={"Tanggal Selesai*"}
              form={
                <DatepickerField
                  isDisabled={isFormDisabled}
                  placeholder={"Tanggal Selesai"}
                  format={"DD/MM/YYYY"}
                  value={payloadInformasi?.pelaksanaan_end || ""}
                  handleChange={(value) =>
                    handleChangeForm("pelaksanaan_end", value)
                  }
                  minDate={
                    addDaysToDate(
                      payloadInformasi?.pelaksanaan_start,
                      "+",
                      1
                    ) ||
                    addDaysToDate(dateNow(), "+", 1) ||
                    null
                  }
                />
              }
            />
          </div>
          <div className="flex justify-between gap-12">
            <FormLabel
              title={"Survei ID"}
              form={
                <TextInput
                  placeholder={"Survei ID"}
                  isDisabled={true}
                  icon={
                    <ButtonIcon
                      isDisabled={true}
                      icon={
                        <ButtonIcon
                          icon={<IconClose size="large" />}
                          isDisabled={true}
                        />
                      }
                    />
                  }
                  value={
                    !isNewTemplate
                      ? payloadInformasi?.project_survey_id?.toUpperCase()
                      : ""
                  }
                />
              }
            />
            <FormLabel
              title={"Jenis Survei*"}
              form={
                <TypeSurveySelect
                  handleChange={(e) => {
                    handleChangeForm("jenis_survey", e);
                  }}
                  placeholder={"Jenis Survei"}
                  customIcon={
                    <ButtonIcon
                      icon={<IconClose />}
                      handleClick={() =>
                        handleChangeForm("jenis_survey", {
                          value: { kode: "", nama: "" },
                        })
                      }
                    />
                  }
                  selectedValue={
                    payloadInformasi.jenis_survey_kode
                      ? {
                          label: payloadInformasi.jenis_survey_name,
                          value: {
                            kode: payloadInformasi.jenis_survey_kode,
                            nama: payloadInformasi.jenis_survey_name,
                          },
                        }
                      : null
                  }
                  isDisabled={isFormDisabled}
                />
              }
            />
          </div>
          <div className="w-1/2 pr-6">
            <FormLabel
              title={"Template ID"}
              form={
                <TextInput
                  placeholder={"Template ID"}
                  isDisabled={true}
                  icon={
                    <ButtonIcon
                      isDisabled={true}
                      icon={
                        <ButtonIcon icon={<IconClose />} isDisabled={true} />
                      }
                    />
                  }
                  value={!isNewTemplate ? projectTemplateId?.toUpperCase() : ""}
                />
              }
            />
          </div>
          <FormLabel
            title={"Deskripsi Survei*"}
            form={
              <TextAreaField
                placeholder={"Deskripsi Survei"}
                resize={"auto"}
                value={payloadInformasi?.deskripsi || ""}
                handleChange={(e) =>
                  handleChangeForm("deskripsi", e.target.value)
                }
                isDisabled={isFormDisabled}
              />
            }
          />
          <FormLabel
            title={"Catatan Survei"}
            form={
              <TextAreaField
                placeholder={"Catatan Survei"}
                resize={"auto"}
                value={payloadInformasi?.catatan || ""}
                handleChange={(e) =>
                  handleChangeForm("catatan", e.target.value)
                }
                isDisabled={isFormDisabled}
              />
            }
          />
        </div>
      </CardContentHeaderFooter>
      <div className="w-56 h-fit">
        <Card>
          <div className="px-2">
            <p className="text-xl font-semibold">Tindakan</p>
            <div className="my-5 flex flex-col gap-3">
              <div
                className={`rounded w-40 ${
                  isNewTemplate
                    ? `bg-atlasian-gray-light`
                    : `bg-atlasian-purple`
                }`}
              >
                <ButtonField
                  text={"Kuesioner"}
                  disabled={isNewTemplate}
                  handler={handleClickAddKuesioner}
                />
              </div>
              <div
                className={`rounded w-40 ${
                  (isNewTemplate || isFormDisabled) && statusSurveyCode != "8"
                    ? `bg-atlasian-gray-light`
                    : `bg-atlasian-purple`
                }`}
              >
                <ButtonField
                  text={"Responden"}
                  disabled={
                    (isNewTemplate || isFormDisabled) && statusSurveyCode != "8"
                  }
                  handler={handleClickResponden}
                />
              </div>
              <div
                className={`rounded w-40 ${
                  isDisabledPickTemplate || isFormDisabled
                    ? `bg-atlasian-gray-light`
                    : `bg-atlasian-yellow`
                }`}
              >
                <ButtonField
                  text={isNewTemplate ? "Pilih Template" : "Simpan"}
                  disabled={isDisabledPickTemplate || isFormDisabled}
                  handler={
                    isNewTemplate
                      ? handleOpenModalSelectedTemplateSurvey
                      : handleSaveInformation
                  }
                />
              </div>
              <div
                className={`rounded w-40 ${
                  isNewTemplate || isDisabledButtonApproval
                    ? `bg-atlasian-gray-light`
                    : `bg-atlasian-green`
                }`}
              >
                <ButtonField
                  text={"Approval"}
                  disabled={isNewTemplate || isDisabledButtonApproval}
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

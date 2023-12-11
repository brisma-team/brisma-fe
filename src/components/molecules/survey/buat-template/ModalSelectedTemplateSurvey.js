import { ButtonField, ButtonIcon, Modal } from "@/components/atoms";
import { confirmationSwal } from "@/helpers";
import {
  CardContentHeaderFooter,
  CustomSelect,
  FormLabel,
  ModalHeader,
} from "../../commons";
import { useSelector } from "react-redux";
import { useTemplateSurvey } from "@/data/reference";
import { useEffect, useState } from "react";
import { IconClose } from "@/components/icons";

const ModalFooter = ({ handleConfirm, isDisabled }) => {
  return (
    <div className="w-full flex justify-end">
      <div
        className={`rounded w-28 ${
          isDisabled ? `bg-atlasian-gray-light` : `bg-atlasian-green`
        }`}
      >
        <ButtonField
          text="Simpan"
          handler={handleConfirm}
          disabled={isDisabled}
        />
      </div>
    </div>
  );
};

const ModalSelectedTemplateSurvey = ({
  showModal,
  handleCloseModal,
  handleSubmit,
  handleChangeForm,
}) => {
  const payloadInformasi = useSelector(
    (state) => state.createSurvey.payloadInformasi
  );

  const [optionTemplateSurvey, setOptionTemplateSurvey] = useState([]);

  const { templateSurvey, templateSurveyError } = useTemplateSurvey(
    "list",
    payloadInformasi?.jenis_survey_kode
  );

  useEffect(() => {
    if (!templateSurveyError) {
      const mapping = templateSurvey?.data?.map((template) => {
        const { id, judul, deskripsi } = template;
        return {
          label: judul,
          value: {
            id,
            judul,
            deskripsi,
          },
        };
      });
      setOptionTemplateSurvey(mapping);
    }
  }, [templateSurvey]);

  const closeModal = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );
    if (!confirm.value) {
      return;
    }

    handleCloseModal();
  };

  return (
    <Modal
      showModal={showModal}
      header={
        <ModalHeader
          handleCloseModal={closeModal}
          showModal={showModal}
          headerText={"Buat Kuesioner"}
        />
      }
      footer={
        <ModalFooter
          handleConfirm={handleSubmit}
          isDisabled={!payloadInformasi.ref_template_id}
        />
      }
    >
      <div className="w-[52rem] relative">
        <CardContentHeaderFooter
          header={
            <div className="py-2 px-4 text-base font-semibold w-full">
              Tambah Kuesioner
            </div>
          }
        >
          <div className="w-full h-full py-3 px-4 flex flex-col gap-3">
            <div className="w-1/2">
              <FormLabel
                form={
                  <CustomSelect
                    optionValue={optionTemplateSurvey}
                    customIcon={
                      <ButtonIcon
                        icon={<IconClose />}
                        handleClick={() =>
                          handleChangeForm("ref_template", {
                            value: { id: "", judul: "", deskripsi: "" },
                          })
                        }
                      />
                    }
                    selectedValue={
                      payloadInformasi?.ref_template_id
                        ? {
                            label: payloadInformasi?.ref_template_name,
                            value: {
                              id: payloadInformasi.ref_template_id,
                              judul: payloadInformasi.ref_template_name,
                              deskripsi: payloadInformasi.ref_template_desc,
                            },
                          }
                        : null
                    }
                    handleChange={(value) =>
                      handleChangeForm("ref_template", value)
                    }
                  />
                }
                title={"Template Survei*"}
              />
            </div>
            <div className="w-full h-full">
              <FormLabel
                form={
                  <div className="min-h-[3rem] p-2 bg-neutral-50 rounded border-2 border-neutral-300 text-justify">
                    {payloadInformasi?.ref_template_desc}
                  </div>
                }
                title={"Deskripsi"}
              />
            </div>
          </div>
        </CardContentHeaderFooter>
      </div>
    </Modal>
  );
};

export default ModalSelectedTemplateSurvey;

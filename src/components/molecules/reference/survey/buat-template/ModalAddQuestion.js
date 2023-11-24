import { ButtonField, CloseModal, DivButton, Modal } from "@/components/atoms";
import {
  CardContentHeaderFooter,
  FormLabel,
} from "@/components/molecules/commons";
import { confirmationSwal } from "@/helpers";
import { ProgressTracker } from "@atlaskit/progress-tracker";
import { useState } from "react";
import QuestionTypeSelect from "../../QuestionTypeSelect";
// import dynamic from "next/dynamic";
// const Editor = dynamic(() => import("@/components/atoms/Editor"), {
//   ssr: false,
// });

const ModalHeader = ({
  currentContentStage,
  handleChangeCurrentContentStage,
  handleCloseModal,
  showModal,
}) => {
  const progressItems = [
    {
      id: "step-1",
      label: (
        <DivButton handleClick={() => handleChangeCurrentContentStage(1)}>
          Jenis Pertanyaan
        </DivButton>
      ),
      percentageComplete: currentContentStage > 1 ? 100 : 0,
      status: currentContentStage === 1 ? "current" : "visited",
    },
    {
      id: "step-2",
      label: (
        <DivButton handleClick={() => handleChangeCurrentContentStage(2)}>
          Guidelines
        </DivButton>
      ),
      percentageComplete: 0,
      status: currentContentStage === 3 ? "current" : "visited",
    },
  ];

  return (
    <div style={{ width: "31rem" }} className="relative">
      <CloseModal handleCloseModal={handleCloseModal} showModal={showModal} />
      <div className="text-3xl font-semibold text-brisma">
        Tambah Pertanyaan
      </div>
      <div className="w-full text-brisma mt-1">
        Pilih jenis dan tipe pertanyaan. Guideline dapat diisi (optional)
        sebagai panduan dalam menjawab pertanyaan.
      </div>
      <div className="w-full -mt-4">
        <ProgressTracker items={progressItems} />
      </div>
    </div>
  );
};

const ModalFooter = ({ handleConfirm }) => {
  return (
    <div className="w-full flex justify-end">
      <div className="rounded w-28 bg-atlasian-green">
        <ButtonField text="Tambah" handler={handleConfirm} />
      </div>
    </div>
  );
};

const ModalAddQuestion = ({
  showModal,
  data,
  handleCloseModal,
  handleSubmit,
  handleChangePayloadQuestion,
}) => {
  const [currentContentStage, setCurrentContentStage] = useState(1);

  const handleChangeCurrentContentStage = (index) => {
    setCurrentContentStage(index);
  };

  const closeModal = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );
    if (!confirm.value) {
      return;
    }

    handleCloseModal();
    setCurrentContentStage(1);
  };

  return (
    <Modal
      showModal={showModal}
      header={
        <ModalHeader
          currentContentStage={currentContentStage}
          handleChangeCurrentContentStage={handleChangeCurrentContentStage}
          handleCloseModal={closeModal}
          showModal={showModal}
        />
      }
      footer={<ModalFooter handleConfirm={handleSubmit} />}
    >
      <div className="w-[53rem] p-2">
        <CardContentHeaderFooter
          header={
            <div className="w-full h-full p-3">
              <p className="text-base font-semibold">Tambah Pertanyaan</p>
            </div>
          }
        >
          <div className="w-full p-4">
            <div className="w-1/2">
              <FormLabel
                form={
                  <QuestionTypeSelect
                    placeholder={"Jenis Pertanyaan"}
                    selectedValue={
                      data.tipe_pertanyaan_kode
                        ? {
                            label: data.tipe_pertanyaan_name,
                            value: {
                              kode: data.tipe_pertanyaan_kode,
                              name: data.tipe_pertanyaan_name,
                            },
                          }
                        : null
                    }
                    handleChange={(e) =>
                      handleChangePayloadQuestion("tipe_pertanyaan", e.value)
                    }
                  />
                }
                title={"Jenis Pertanyaan*"}
              />
            </div>
          </div>
        </CardContentHeaderFooter>
      </div>
    </Modal>
  );
};

export default ModalAddQuestion;

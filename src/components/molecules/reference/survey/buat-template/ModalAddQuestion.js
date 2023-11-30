import { ButtonField, CloseModal, DivButton, Modal } from "@/components/atoms";
import {
  CardContentHeaderFooter,
  FormLabel,
} from "@/components/molecules/commons";
import { confirmationSwal } from "@/helpers";
import { ProgressTracker } from "@atlaskit/progress-tracker";
import QuestionTypeSelect from "../../QuestionTypeSelect";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("@/components/atoms/Editor"), {
  ssr: false,
});

const ModalHeader = ({
  currentContentStage,
  handleChangeCurrentContentStage,
  handleCloseModal,
  showModal,
  isUpdateModal,
}) => {
  const progressItems = [
    {
      id: "step-1",
      label: (
        <DivButton
          handleClick={() => handleChangeCurrentContentStage(1)}
          isDisabled={isUpdateModal}
        >
          Jenis Pertanyaan
        </DivButton>
      ),
      percentageComplete: currentContentStage > 1 ? 100 : 0,
      status: isUpdateModal
        ? "disabled"
        : currentContentStage === 1
        ? "current"
        : "visited",
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
  currentContentStage,
  handleCloseModal,
  handleSubmit,
  isUpdateModal,
  handleChangePayloadQuestion,
  handleChangeCurrentContentStage,
}) => {
  const closeModal = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );
    if (!confirm.value) {
      return;
    }

    handleCloseModal();
    handleChangeCurrentContentStage(1);
  };

  // [START] Handler for content Guidelines
  const handleChange = (value) => {
    handleChangePayloadQuestion("guideline", value);
  };
  // [END] Handler for content Guidelines

  return (
    <Modal
      showModal={showModal}
      header={
        <ModalHeader
          currentContentStage={currentContentStage}
          handleChangeCurrentContentStage={handleChangeCurrentContentStage}
          handleCloseModal={closeModal}
          showModal={showModal}
          isUpdateModal={isUpdateModal}
        />
      }
      footer={<ModalFooter handleConfirm={handleSubmit} />}
    >
      {currentContentStage === 1 ? (
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
      ) : (
        <div className="w-[51rem] px-2">
          <div className="w-full h-full px-2 pb-3">
            <p className="text-base font-semibold">Guidelines</p>
          </div>
          <div className="ckeditor-modal">
            <Editor
              contentData={data.guideline}
              disabled={false}
              ready={true}
              onChange={(value) => handleChange(value)}
            />
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ModalAddQuestion;

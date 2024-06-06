import { ButtonField, ModalScroll } from "@/components/atoms";
import { ModalHeader } from "@/components/molecules/commons";
import SubModalMetodeNegosiasi from "./SubModalMetodeNegosiasi";
import SubModalRingkasan from "./SubModalRingkasan";

const ModalInisiasiNegosiasi = ({
  showModal,
  currentModalStage,
  maxStage,
  data,
  payload,
  validation,
  isDisabled,
  handleCloseModal,
  handleChangePayload,
  handleNextStage,
  handlePrevStage,
  handleSubmitForm,
  handleClickEditReason,
}) => {
  const progressItems = [
    {
      id: "step-1",
      label: <span>Metode Negosiasi</span>,
      percentageComplete: currentModalStage > 1 ? 100 : 0,
      status: currentModalStage === 1 ? "current" : "visited",
    },
    {
      id: "step-2",
      label: <span>Ringkasan</span>,
      percentageComplete: currentModalStage > 2 ? 100 : 0,
      status: currentModalStage === 2 ? "current" : "visited",
    },
  ];
  return (
    <ModalScroll
      showModal={showModal}
      header={
        <ModalHeader
          showModal={showModal}
          progressItems={progressItems}
          headerText={"Inisiasi Negosiasi"}
          width={"w-[35rem]"}
          handleCloseModal={handleCloseModal}
        />
      }
    >
      <div className="w-[45rem] flex flex-col gap-3">
        {currentModalStage === 1 ? (
          <SubModalMetodeNegosiasi
            data={data}
            payload={payload}
            handleChangePayload={handleChangePayload}
            handleClickEditReason={handleClickEditReason}
          />
        ) : (
          <SubModalRingkasan
            data={data}
            payload={payload}
            validation={validation}
            handleChangePayload={handleChangePayload}
          />
        )}
        <div className="mt-2 mb-1">
          <div className="w-full flex justify-end items-center gap-3 -my-1">
            {currentModalStage === maxStage && (
              <div className="rounded w-28 bg-atlasian-blue-light flex items-center">
                <ButtonField
                  text={"Kembali"}
                  handler={handlePrevStage}
                  name={"prevButton"}
                />
              </div>
            )}
            {currentModalStage === maxStage ? (
              <div className="rounded w-28 bg-atlasian-green flex items-center">
                <ButtonField
                  text={"Simpan"}
                  handler={handleSubmitForm}
                  name={"saveButton"}
                />
              </div>
            ) : (
              currentModalStage === 1 && (
                <div
                  className={`rounded w-28 ${
                    isDisabled
                      ? "bg-atlasian-gray-light"
                      : "bg-atlasian-blue-light"
                  } flex items-center`}
                >
                  <ButtonField
                    text={"Lanjut"}
                    handler={handleNextStage}
                    name={"nextButton"}
                    disabled={isDisabled}
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </ModalScroll>
  );
};

export default ModalInisiasiNegosiasi;

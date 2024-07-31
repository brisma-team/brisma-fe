import { ButtonField, Card, DivButton, ModalScroll } from "@/components/atoms";
import { ModalFooter, ModalHeader } from "@/components/molecules/commons";
import { ContentSampleCSV, ContentSampleFile } from "./sample";

const classNavbarActive = `border-b-[5px] border-atlasian-blue-light text-atlasian-blue-light`;

const ModalUploadSample = ({
  showModal,
  currentModalStage,
  dataTab,
  dataSample,
  handleSubmit,
  handleChangeCurrentTab,
  handleChangeCheckbox,
  handleClickPickSample,
  handleDeleteSample,
}) => {
  return (
    <ModalScroll
      showModal={showModal}
      header={
        <ModalHeader
          headerText={`Sample  ${
            currentModalStage === 1
              ? "CSV"
              : currentModalStage === 2
              ? "File"
              : ""
          }`}
        />
      }
      footer={<ModalFooter buttonText={"Simpan"} handleSubmit={handleSubmit} />}
    >
      <div className="!w-[50rem]">
        <Card>
          <div className="px-4 pb-2 flex flex-col gap-4">
            <div className="w-fit border-b-2 flex">
              {dataTab?.length
                ? dataTab?.map((tab, index) => {
                    return (
                      <DivButton
                        key={index}
                        className={`font-semibold text-base px-4 text-center pb-1 ${
                          currentModalStage === tab?.no ? classNavbarActive : ""
                        }`}
                        handleClick={() => handleChangeCurrentTab(tab?.no)}
                      >
                        {`Sample ${tab?.name}`}
                      </DivButton>
                    );
                  })
                : ""}
            </div>
            {currentModalStage === 1 ? (
              <ContentSampleCSV
                data={dataSample?.csv}
                handleChangeCheckbox={handleChangeCheckbox}
              />
            ) : (
              <ContentSampleFile
                data={dataSample?.file}
                handleChangeCheckbox={handleChangeCheckbox}
              />
            )}
            <div className="w-full flex justify-between">
              <div className="w-32 bg-atlasian-blue-light rounded">
                <ButtonField
                  text="Pilih Data"
                  handler={handleClickPickSample}
                />
              </div>
              <div className="w-32 bg-atlasian-red rounded">
                <ButtonField text="Hapus" handler={handleDeleteSample} />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </ModalScroll>
  );
};

export default ModalUploadSample;

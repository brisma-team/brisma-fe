import { DivButton, ModalScroll } from "@/components/atoms";
import { ModalHeader } from "@/components/molecules/commons";
import ModalUploadFooter from "./ModalUploadFooter";
import {
  TabNewSampleCSV,
  TabNewSampleFile,
  TabPoolSampleCSV,
  TabPoolSampleFile,
} from "./upload-sample";

const classNavbarActive = `border-b-[5px] border-atlasian-blue-light text-atlasian-blue-light`;

const ModalUploadSampleFile = ({
  showModal,
  mappingReduxCSV,
  mappingReduxFile,
  withoutAction,
  currentModalStage,
  currentModalSubStage,
  dataTab,
  isUpdateSample,
  handleCloseModal,
  handleChangeCurrentTab,
  handleClickCheckboxCSV,
  handleClickDownloadPoolSampleCSV,
  handleClickDeletePoolSampleCSV,
  handleChangeDescriptionFile,
  handleClickDownloadPoolSampleFile,
  handleClickDeletePoolSampleFile,
  handleUploadSampleCSV,
  handleUploadSampleFile,
  handleSubmitUploadCSV,
  handleSubmitUploadFile,
  handleSubmitUpdateCSV,
  handleSubmitUpdateFile,
}) => {
  return (
    <ModalScroll
      showModal={showModal}
      header={
        <ModalHeader
          headerText={"Tambah Sample"}
          showModal={showModal}
          handleCloseModal={handleCloseModal}
        />
      }
      footer={
        <ModalUploadFooter
          handleUpload={
            currentModalStage === "csv"
              ? handleUploadSampleCSV
              : currentModalStage === "file"
              ? handleUploadSampleFile
              : ""
          }
          handleSave={
            isUpdateSample
              ? currentModalStage === "csv"
                ? handleSubmitUpdateCSV
                : currentModalStage === "file"
                ? handleSubmitUpdateFile
                : null
              : currentModalStage === "csv"
              ? handleSubmitUploadCSV
              : currentModalStage === "file"
              ? handleSubmitUploadFile
              : null
          }
        />
      }
      withoutFooter={currentModalSubStage === "pool"}
    >
      <div className="flex flex-col gap-3">
        <div className="w-fit border-b-2 flex">
          {dataTab?.length
            ? dataTab?.map((tab, index) => {
                return (
                  <DivButton
                    key={index}
                    className={`font-semibold text-base px-4 text-center pb-1 ${
                      currentModalSubStage === tab?.kode
                        ? classNavbarActive
                        : ""
                    }`}
                    handleClick={() => handleChangeCurrentTab(tab?.kode)}
                  >
                    {`Sample ${tab?.name}`}
                  </DivButton>
                );
              })
            : ""}
        </div>
        <div>
          {currentModalStage === "csv" ? (
            currentModalSubStage === "new" ? (
              <TabNewSampleCSV
                data={mappingReduxCSV?.state?.new}
                handleClickCheckbox={handleClickCheckboxCSV}
              />
            ) : currentModalSubStage === "pool" ? (
              <TabPoolSampleCSV
                data={mappingReduxCSV?.state?.pool}
                handleClickCheckbox={handleClickCheckboxCSV}
                handleClickDownloadSample={handleClickDownloadPoolSampleCSV}
                handleClickDeleteSample={handleClickDeletePoolSampleCSV}
              />
            ) : (
              ""
            )
          ) : currentModalStage === "file" ? (
            currentModalSubStage === "new" ? (
              <TabNewSampleFile
                data={mappingReduxFile?.state?.new}
                handleChangeDescription={handleChangeDescriptionFile}
              />
            ) : currentModalSubStage === "pool" ? (
              <TabPoolSampleFile
                data={mappingReduxFile?.state?.pool}
                handleClickDownloadSample={handleClickDownloadPoolSampleFile}
                handleClickDeleteSample={handleClickDeletePoolSampleFile}
              />
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </div>
      </div>
    </ModalScroll>
  );
};

export default ModalUploadSampleFile;

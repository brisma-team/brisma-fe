import {
  ModalAttachment,
  ModalDescription,
} from "@/components/molecules/commons";
import UkerAssessmentTable from "./UkerAssessmentTable";

const ContentUkerAssessment = ({
  data,
  payload,
  selectedIndex,
  isDisabled,
  showModalDescription,
  showModalAttachment,
  handleCloseModalDescription,
  handleCloseModalAttachment,
  handleChangePayloadUkerAssessment,
  handleClickAddRowUkerAssessment,
  handleClickEditUkerAssessment,
  handleClickDeleteUkerAssessment,
  handleClickRestoreUkerAssessment,
  handleClickDescription,
  handleClickAttachment,
  handleSaveUkerAssessment,
  handleSubmitDescription,
  handleUploadAttachment,
}) => {
  return (
    <>
      <UkerAssessmentTable
        data={data}
        payload={payload}
        handleChange={handleChangePayloadUkerAssessment}
        handleClickAddUkerAssessment={handleClickAddRowUkerAssessment}
        handleClickEdit={handleClickEditUkerAssessment}
        handleClickDelete={handleClickDeleteUkerAssessment}
        handleClickRestore={handleClickRestoreUkerAssessment}
        handleClickDescription={handleClickDescription}
        handleClickSave={handleSaveUkerAssessment}
        handleClickAttachment={handleClickAttachment}
        withoutButton={isDisabled}
      />
      <ModalDescription
        data={
          data[selectedIndex]?.is_new
            ? payload?.description
            : data[selectedIndex]?.description
        }
        showModal={showModalDescription}
        handleCloseModal={handleCloseModalDescription}
        isEdit={data[selectedIndex]?.is_new || data[selectedIndex]?.is_edit}
        handleSubmit={handleSubmitDescription}
      />
      <ModalAttachment
        data={
          data[selectedIndex]?.is_new || payload?.attachments !== undefined
            ? payload?.attachments?.[0]
            : data[selectedIndex]?.attachments?.[0]
        }
        isEdit={data[selectedIndex]?.is_new || data[selectedIndex]?.is_edit}
        showModal={showModalAttachment}
        handleCloseModal={handleCloseModalAttachment}
        handleUpload={handleUploadAttachment}
      />
    </>
  );
};

export default ContentUkerAssessment;

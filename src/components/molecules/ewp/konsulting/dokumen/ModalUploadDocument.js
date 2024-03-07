import {
  ButtonIcon,
  CloseModal,
  DivButton,
  ErrorValidation,
  Modal,
  TextAreaField,
  TextInput,
  UploadButton,
} from "@/components/atoms";
import { IconClose } from "@/components/icons";
import { ModalFooter } from "@/components/molecules/commons";
import DocumentTypeSelect from "./DocumentTypeSelect";

const ModalUploadDocument = ({
  showModal,
  data,
  validation,
  handleChangeText,
  handleChangeSelect,
  handleReset,
  handleUpload,
  handleCloseModal,
  handleSubmit,
}) => {
  return (
    <Modal
      showModal={showModal}
      footer={<ModalFooter handleSubmit={handleSubmit} />}
    >
      <div className="w-[43rem] relative h-full">
        <div className="flex flex-col gap-4">
          <div className="flex items-center">
            <p className="w-full font-bold text-xl">UPLOAD DOKUMEN</p>
            <CloseModal
              handleCloseModal={handleCloseModal}
              showModal={showModal}
            />
          </div>
          <div className="flex gap-4 items-center">
            <div className="w-8/12">
              <TextInput
                value={data?.document_name || ""}
                onChange={(e) =>
                  handleChangeText("document_name", e.target.value)
                }
                placeholder="Nama Dokumen"
                icon={
                  <ButtonIcon
                    handleClick={() => handleReset("document_name")}
                    icon={<IconClose />}
                  />
                }
              />
              {validation?.document_name ? (
                <ErrorValidation message={validation?.document_name} />
              ) : (
                ""
              )}
            </div>
            <div className="w-4/12">
              <DocumentTypeSelect
                customIcon={
                  <ButtonIcon
                    handleClick={() => handleReset("document_type")}
                    icon={<IconClose />}
                  />
                }
                selectedValue={
                  data?.ref_document_id
                    ? {
                        label: data?.ref_document_name,
                        value: {
                          kode: data?.ref_document_id,
                          name: data?.ref_document_name,
                        },
                      }
                    : null
                }
                handleChange={(e) => {
                  handleChangeSelect("document_type", e.value);
                }}
                placeholder={"Jenis Dokumen"}
              />
              {validation?.ref_document_id ? (
                <ErrorValidation message={validation?.ref_document_id} />
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="w-8/12">
              <TextInput
                value={data?.file_name || ""}
                onChange={(e) => handleChangeText("file_name", e.target.value)}
                placeholder="Nama File"
                icon={
                  <ButtonIcon
                    handleClick={() => handleReset("file_name")}
                    icon={<IconClose />}
                  />
                }
              />
            </div>
            <div className="w-4/12">
              <UploadButton
                className={`border-2 rounded ${
                  data.file_url
                    ? "border-green-500 hover:bg-green-200"
                    : "border-gray-400 hover:bg-gray-200"
                }  p-2`}
                text={"Browse File"}
                fileAccept={"*/*"}
                handleUpload={handleUpload}
              />
              {validation?.file_url ? (
                <ErrorValidation message={validation?.file_url} />
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="w-8/12">
              <TextAreaField
                value={data?.desc}
                placeholder={"Deskripsi Dokumen"}
                handleChange={(e) => handleChangeText("desc", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalUploadDocument;

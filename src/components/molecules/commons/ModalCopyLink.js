import { CloseModal, DivButton, Modal } from "@/components/atoms";
import { confirmationSwal } from "@/helpers";
import IconCopy from "@atlaskit/icon/glyph/copy";

const ModalCopyLink = ({
  showModal,
  setShowModal,
  handleCloseModal,
  url,
  handleCopyProject,
}) => {
  const closeModal = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );

    if (!confirm.value) {
      return;
    }

    setShowModal(false);
    handleCloseModal && handleCloseModal();
  };

  return (
    <Modal showModal={showModal} positionCenter={true}>
      <div className="w-full h-[6rem]">
        <div className="relative">
          <CloseModal handleCloseModal={closeModal} showModal={showModal} />
        </div>
        <div className="p-5">
          <div className="flex gap-2">
            <h3 className="my-auto text-brisma underline underline-offset-4">
              Link Project
            </h3>
          </div>
          <div className="flex gap-1 my-4">
            <h3>{url}</h3>
            <div className="text-blue-700">
              <DivButton handleClick={(e) => handleCopyProject(e, url)}>
                <IconCopy size="medium" />
              </DivButton>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalCopyLink;

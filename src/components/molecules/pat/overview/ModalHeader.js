const { CloseModal } = require("@/components/atoms");

const ModalHeader = ({
  headerText,
  handleCloseModal,
  showModal,
  contentText,
}) => {
  return (
    <div className="relative w-[31rem]">
      <CloseModal handleCloseModal={handleCloseModal} showModal={showModal} />
      <div className="px-3 py-2">
        <div className="text-3xl font-semibold">{headerText}</div>
        <div className="text-base font-bold text-atlasian-blue-light mt-1.5">
          {contentText}
        </div>
      </div>
    </div>
  );
};

export default ModalHeader;

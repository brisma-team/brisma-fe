import { ModalScroll } from "@/components/atoms";
import TableCatatanNegosiasi from "../TableCatatanNegosiasi";

const ModalSummaryDetail = ({ showModal, data, handleCloseModal }) => {
  return (
    <ModalScroll showModal={showModal} positionCenter>
      <div className="w-[60rem] flex flex-col gap-3">
        <TableCatatanNegosiasi
          isButtonCloseModal
          data={data}
          showModal={showModal}
          handleCloseModal={handleCloseModal}
        />
      </div>
    </ModalScroll>
  );
};

export default ModalSummaryDetail;

import { CloseModal, ModalScroll } from "@/components/atoms";
import { CardContentHeaderFooter } from "@/components/molecules/commons";

const ModalDescription = ({ data, showModal, handleCloseModal }) => {
  return (
    <ModalScroll showModal={showModal}>
      <div className="w-[37rem] relative h-full">
        <div className="flex flex-col gap-4">
          <div className="flex items-center">
            <CloseModal
              handleCloseModal={handleCloseModal}
              showModal={showModal}
            />
          </div>
          <CardContentHeaderFooter
            header={
              <div className="p-3 text-center">
                <p className="text-xl font-bold">DESKRIPSI</p>
              </div>
            }
          >
            <div className="p-3">
              <p className="text-xs leading-3">{data}</p>
            </div>
          </CardContentHeaderFooter>
        </div>
      </div>
    </ModalScroll>
  );
};

export default ModalDescription;

import { Modal, ButtonField } from "@/components/atoms";
import { CardBodyContent, FormWithLabel } from "../../commons";

const Header = () => {
  return (
    <div className="w-[61rem]">
      <div className="w-full">test</div>
    </div>
  );
};

const Footer = () => {
  return (
    <div className="w-full flex justify-end gap-3 -my-1">
      <div className="rounded w-28 bg-atlasian-blue-light">
        <ButtonField text={"Lanjut"} />
      </div>
      <div className="rounded w-28 bg-atlasian-green">
        <ButtonField text={"Simpan"} />
      </div>
    </div>
  );
};

const ModalWorkflow = ({ showModal, setShowModal }) => {
  return (
    <Modal
      showModal={showModal}
      onClickOutside={() => setShowModal(false)}
      header={<Header />}
      footer={<Footer />}
    >
      <div className="w-[61rem]">
        <CardBodyContent>
          <FormWithLabel />
        </CardBodyContent>
      </div>
    </Modal>
  );
};

export default ModalWorkflow;

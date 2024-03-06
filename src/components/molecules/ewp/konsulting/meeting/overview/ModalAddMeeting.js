import { ModalScroll } from "@/components/atoms";
import { ModalHeader } from "@/components/molecules/commons";

const ModalAddProjectEWP = ({ showModal, data, validation, handleChange }) => {
  return (
    <ModalScroll
      showModal={showModal}
      header={
        <ModalHeader
          headerText={"Buat Meeting EWP Kegiatan Konsulting"}
          showModal={showModal}
          width={"w-[34.5rem]"}
        />
      }
    ></ModalScroll>
  );
};

export default ModalAddProjectEWP;

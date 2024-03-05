import { Modal, TextInput, YearPicker } from "@/components/atoms";
import { confirmationSwal, usePostData } from "@/helpers";
import { FormWithLabel } from "../../commons";
import useUser from "@/data/useUser";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";
import { useState } from "react";

const ModalCreateProjectPAT = ({ showModal, setShowModal, mutate }) => {
  const { user } = useUser();
  const [data, setData] = useState({ tahun: "" });
  const handleCloseModal = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );

    if (!confirm.value) {
      return;
    }
    setShowModal(false);
  };

  const handleSubmit = async () => {
    await usePostData(
      `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/create`,
      data
    );
    setShowModal(false);
    setData({ tahun: "" });
    mutate();
  };

  return (
    <Modal
      showModal={showModal}
      header={
        <ModalHeader
          headerText={"Buat Proyek Usukan PAT"}
          contentText={`PAT ${user?.data?.uka_name}`}
          showModal={showModal}
          handleCloseModal={handleCloseModal}
        />
      }
      footer={<ModalFooter handleSubmit={handleSubmit} handleCloseModal={handleCloseModal} />}
      positionCenter={true}
    >
      <div className="w-[31rem] px-4 py-2">
        <FormWithLabel
          label={"Inisiator Usulan*"}
          form={<TextInput isDisabled={true} value={user?.data?.fullName} />}
          widthForm={"w-3/5"}
          widthLabel={"w-2/5"}
        />
        <FormWithLabel
          label={"Tahun Usulan*"}
          form={
            <YearPicker
              handleChange={(e) => setData({ tahun: e.value })}
              value={{ label: data.tahun, value: data.tahun }}
            />
          }
          widthForm={"w-3/5"}
          widthLabel={"w-2/5"}
        />
      </div>
    </Modal>
  );
};

export default ModalCreateProjectPAT;

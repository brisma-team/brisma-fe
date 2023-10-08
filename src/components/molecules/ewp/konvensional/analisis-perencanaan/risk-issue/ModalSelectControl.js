import { ButtonField, Modal } from "@/components/atoms";
import { confirmationSwal } from "@/helpers";
import { ModalHeader } from "./modal/sample-risk";
import { TableMasterData, TableSelectControl } from "./modal/select-risk";
import { useState } from "react";

const ModalFooter = ({ handleSubmit }) => {
  return (
    <div className="rounded w-28 bg-atlasian-green">
      <ButtonField
        text={"Simpan"}
        handler={handleSubmit}
        type={"submit"}
        name={"saveButton"}
      />
    </div>
  );
};

const ModalSelectControl = ({ showModal, handleCloseModal }) => {
  const [keywoardSelectControl, setKeywordSelectControl] = useState("");
  const [keywoardMasterData, setKeywordMasterData] = useState("");

  const handleClose = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );

    if (!confirm.value) {
      return;
    }

    handleCloseModal();
  };

  const handleSubmit = () => {
    handleCloseModal();
  };

  const data = [
    {
      no: 1,
      code: "dandy",
      deskripsi:
        "Pellentesque auctor ligula felis, et blandit neque tincidunt in. Quisque maximus neque sit amet fringilla imperdiet",
      flag: "default",
    },
    {
      no: 2,
      code: "C609",
      deskripsi: "Dandy",
      flag: "default",
    },
  ];

  return (
    <Modal
      showModal={showModal}
      header={
        <ModalHeader
          headerText={"Pilih Risk Kontrol"}
          showModal={showModal}
          handleCloseModal={handleClose}
        />
      }
      footer={<ModalFooter handleSubmit={handleSubmit} />}
    >
      <div className="w-[85rem] relative">
        <div className="flex gap-3 w-full">
          <div className="w-3/5">
            <TableSelectControl
              data={data}
              handleChangeKeyword={(e) =>
                setKeywordSelectControl(e.target.value)
              }
            />
          </div>
          <div className="w-2/5">
            <TableMasterData
              data={data}
              handleChangeKeyword={(e) =>
                setKeywordSelectControl(e.target.value)
              }
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalSelectControl;

import { Modal, Card, ButtonField } from "@/components/atoms";
import { IconClose } from "@/components/icons";
import CardFormInputTeam from "../CardFormInputTeam";

const ModalAddAuditTeam = ({ showModal, setShowModal }) => {
  return (
    <Modal showModal={showModal} onClickOutside={() => setShowModal(false)}>
      <div className="w-2/3">
        <Card>
          <div className="w-full flex justify-between items-center px-2 -my-2">
            <div className="text-xl font-bold">
              Tim Audit Percobaan Terbaru BRISMA
            </div>
            <IconClose size="xlarge" />
          </div>
        </Card>
      </div>
      <div className="flex gap-3 justify-between my-3">
        <div className="w-1/3">
          <CardFormInputTeam type={"Manajer Audit"} />
        </div>
        <div className="w-1/3">
          <CardFormInputTeam type={"Ketua Tim Audit"} />
        </div>
        <div className="w-1/3 px-2 py-3">
          <div className="leading-normal text-base text-atlasian-red">
            <div className="font-bold">PERHATIAN!</div>
            <div>
              Tim audit yang diubah akan mereset anggaran yang ter-relasi pada
              pekerja tersebut.
            </div>
          </div>
          <div className="w-[7.75rem] h-[2.4rem] bg-atlasian-green rounded mt-5 flex justify-center">
            <ButtonField text={"Simpan"} />
          </div>
        </div>
      </div>
      <div className="my-3">
        <CardFormInputTeam type={"Anggota Tim Audit"} grid={true} />
      </div>
    </Modal>
  );
};

export default ModalAddAuditTeam;

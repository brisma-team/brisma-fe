import { Modal, TextInput } from "@/components/atoms";
import Button from "@atlaskit/button";
import Close from "@atlaskit/icon/glyph/editor/close";
import SendIcon from "@atlaskit/icon/glyph/send";

const ModalAddDashboard = ({
  showModal,
  setShowModal,
  data,
  setData,
  handleSubmit,
}) => {
  return (
    <Modal showModal={showModal} onClickOutside={() => setShowModal(false)}>
      <div className="w-[32rem] h-modal p-4">
        <h3 className="p-3 font-bold text-xl mb-3">Form Dashboard</h3>
        <div className="grid grid-cols-3">
          <div className="p-1 col-span-3">
            <div className="grid grid-cols-3">
              <div className="p-3 text-base">Dashboard ID</div>
              <div className="p-1 pl-10 col-span-2">
                <TextInput
                  placeholder="Masukkan Superset ID"
                  onChange={(e) =>
                    setData({ ...data, embedId: e.target.value })
                  }
                />
              </div>
              <div className="p-3 text-base">Dashboard Name</div>

              <div className="p-1 pl-10 col-span-2">
                <TextInput
                  placeholder="Masukkan Nama Dashboard"
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
              </div>
              <div className="p-3"></div>
              <div className="flex gap-1 p-1 pl-10 col-span-2 py-3">
                <Button
                  appearance="default"
                  shouldFitContainer
                  onClick={() => setShowModal(false)}
                  iconBefore={<Close size="medium" />}
                >
                  Tutup
                </Button>
                <Button
                  appearance="primary"
                  shouldFitContainer
                  onClick={handleSubmit}
                  iconBefore={<SendIcon size="medium" />}
                >
                  Simpan
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalAddDashboard;

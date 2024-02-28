import {
  ButtonIcon,
  CloseModal,
  Modal,
  TextInput,
  TextInputDecimal,
} from "@/components/atoms";
import { IconClose } from "@/components/icons";
import { ModalFooter } from "@/components/molecules/commons";

const ModalAddBudget = ({
  data,
  showModal,
  handleCloseModal,
  handleChangeText,
  handleSubmit,
}) => {
  return (
    <Modal
      showModal={showModal}
      positionCenter
      footer={<ModalFooter handleConfirm={handleSubmit} />}
    >
      <div className="w-[37.5rem] relative">
        <CloseModal handleCloseModal={handleCloseModal} showModal={showModal} />
        <div className="mb-2">MATRIX PELUANG PENINGKATAN</div>
        <div className="flex gap-4">
          <TextInput
            onChange={(e) => handleChangeText(e.target.value)}
            icon={
              <ButtonIcon
                handleClick={() => handleChangeText("no_surat", "")}
                icon={<IconClose size="medium" />}
              />
            }
            value={data.no_surat}
            placeholder={"Ketik judul matrix peluang"}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalAddBudget;

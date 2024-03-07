import {
  ButtonIcon,
  CloseModal,
  ErrorValidation,
  Modal,
  TextInput,
} from "@/components/atoms";
import { IconClose } from "@/components/icons";
import { ModalFooter, PekerjaSelect } from "@/components/molecules/commons";
import _ from "lodash";

const ModalMatrix = ({
  showModal,
  data,
  validation,
  handleCloseModal,
  handleChange,
  handleSubmit,
}) => {
  return (
    <Modal
      showModal={showModal}
      positionCenter
      footer={<ModalFooter handleSubmit={handleSubmit} />}
    >
      <div className="w-[38rem] relative">
        <CloseModal handleCloseModal={handleCloseModal} showModal={showModal} />
        <div className="mb-2 font-semibold">PELUANG PENINGKATAN</div>
        <div className="flex gap-3">
          <div className="w-2/3">
            <TextInput
              onChange={(e) => handleChange("judul_kkpt", e.target.value)}
              icon={
                <ButtonIcon
                  handleClick={() => handleChange("judul_kkpt", "")}
                  icon={<IconClose size="medium" />}
                />
              }
              value={data?.judul_kkpt || ""}
              placeholder={"Ketik judul kkpt"}
            />
            {validation["judul_kkpt"] ? (
              <ErrorValidation message={validation["judul_kkpt"]} />
            ) : (
              ""
            )}
          </div>
          <div className="w-1/3">
            <PekerjaSelect
              selectedValue={
                data?.auditor?.pn
                  ? { label: data?.auditor?.name, value: data?.auditor }
                  : null
              }
              placeholder={"Auditor"}
              handleChange={(e) =>
                handleChange("auditor", _.pick(e?.value, ["pn", "name"]))
              }
              customIcon={
                <ButtonIcon
                  icon={<IconClose />}
                  handleClick={() => handleChange("auditor", {})}
                />
              }
            />
            {validation["auditor.pn"] ? (
              <ErrorValidation message={validation["auditor.pn"]} />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalMatrix;

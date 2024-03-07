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
      <div className="w-[42.5rem] relative">
        <CloseModal handleCloseModal={handleCloseModal} showModal={showModal} />
        <div className="mb-2 font-semibold">MATRIX PELUANG PENINGKATAN</div>
        <div className="flex gap-3">
          <div className="w-2/3">
            <TextInput
              onChange={(e) => handleChange("judul", e.target.value)}
              icon={
                <ButtonIcon
                  handleClick={() => handleChange("judul", "")}
                  icon={<IconClose size="medium" />}
                />
              }
              value={data?.judul || ""}
              placeholder={"Ketik judul matrix peluang"}
            />
            {validation["judul"] ? (
              <ErrorValidation message={validation["judul"]} />
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

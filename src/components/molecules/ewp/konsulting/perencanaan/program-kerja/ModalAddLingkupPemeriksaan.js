import {
  ButtonIcon,
  CloseModal,
  ErrorValidation,
  ModalScroll,
  TextInput,
} from "@/components/atoms";
import { IconClose } from "@/components/icons";
import { ModalFooter } from "@/components/molecules/commons";

const ModalAddLingkupPemeriksaan = ({
  data,
  validation,
  showModal,
  handleChangeText,
  handleCloseModal,
  handleSubmit,
}) => {
  return (
    <ModalScroll
      showModal={showModal}
      footer={<ModalFooter handleSubmit={handleSubmit} />}
      positionCenter
    >
      <div className="w-[43rem] relative">
        <CloseModal showModal={showModal} handleCloseModal={handleCloseModal} />
        <div>
          <p className="text-sm font-semibold mb-2">LINGKUP PEMERIKSAAN</p>
          <TextInput
            value={data?.judul_lingkup_pemeriksaan || ""}
            onChange={(e) =>
              handleChangeText("judul_lingkup_pemeriksaan", e.target.value)
            }
            placeholder="Masukkan lingkup pemeriksaan.."
            icon={
              <ButtonIcon
                handleClick={() =>
                  handleChangeText("judul_lingkup_pemeriksaan", "")
                }
                icon={<IconClose size="medium" />}
              />
            }
          />
          {validation?.judul_lingkup_pemeriksaan ? (
            <div className="mt-1">
              <ErrorValidation
                message={validation?.judul_lingkup_pemeriksaan}
                className={"ml-1"}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </ModalScroll>
  );
};

export default ModalAddLingkupPemeriksaan;

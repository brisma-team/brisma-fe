import {
  ButtonIcon,
  CloseModal,
  ErrorValidation,
  ModalScroll,
  TextInput,
} from "@/components/atoms";
import { IconClose } from "@/components/icons";
import { ModalFooter } from "@/components/molecules/commons";
import RecommendationTypeSelect from "@/components/molecules/commons/RecommendationTypeSelect";

const ModalRekomendasi = ({
  payload,
  validation,
  showModal,
  handleChangePayload,
  handleResetPayload,
  handleCloseModal,
  handleSubmit,
}) => {
  return (
    <ModalScroll
      showModal={showModal}
      footer={<ModalFooter handleSubmit={handleSubmit} />}
      positionCenter
    >
      <div className="w-[35rem] relative">
        <div className="flex justify-between">
          <CloseModal
            showModal={showModal}
            handleCloseModal={handleCloseModal}
          />
        </div>
        <div className="mt-3 flex flex-col gap-3">
          <p className="text-sm font-semibold">REKOMENDASI</p>
          <div>
            <TextInput
              icon={
                <ButtonIcon
                  handleClick={() => handleResetPayload("project_id")}
                  icon={<IconClose size="medium" />}
                />
              }
              onChange={(e) => handleChangePayload("desc", e.target.value)}
              value={payload?.desc || ""}
              placeholder={"Judul Rekomendasi"}
            />
            {validation?.desc ? (
              <ErrorValidation
                className={"ml-1.5 mt-1"}
                message={validation?.desc}
              />
            ) : (
              ""
            )}
          </div>
          <div>
            <RecommendationTypeSelect
              placeholder={"Tipe Rekomendasi"}
              customIcon={
                <ButtonIcon
                  icon={<IconClose />}
                  handleClick={() => handleResetPayload("tipe_rekomendasi")}
                />
              }
              handleChange={(e) =>
                handleChangePayload("tipe_rekomendasi", e.value)
              }
              selectedValue={
                payload?.tipe_rekomendasi?.kode
                  ? {
                      label: payload?.tipe_rekomendasi?.nama?.toUpperCase(),
                      value: payload?.tipe_rekomendasi,
                    }
                  : null
              }
            />
            {validation && validation["tipe_rekomendasi.kode"] ? (
              <ErrorValidation
                className={"ml-1.5 mt-1"}
                message={validation["tipe_rekomendasi.kode"]}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </ModalScroll>
  );
};

export default ModalRekomendasi;

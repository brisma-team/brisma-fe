import { ButtonField, ErrorValidation } from "@/components/atoms";
import { PekerjaSelect } from "../../../commons";

const ModalFooter = ({
  data,
  currentModalStage,
  maxStage,
  isDisabled,
  differentPIC,
  isPat,
  validation,
  handleSubmit,
  handlePrevStage,
  handleNextStage,
  handleChange,
}) => {
  return (
    <div>
      <form
        className="w-full flex justify-center items-center gap-3 -my-1"
        onSubmit={handleSubmit}
      >
        {differentPIC && isPat && currentModalStage === maxStage && (
          // Jika yang login bukan KTA dan tipe jadwalnya PAT
          <div className="w-full h-full">
            <PekerjaSelect
              placeholder="Masukan PN/Nama KTA Manajer Audit atau EVP"
              handleChange={handleChange}
              selectedValue={
                data?.pn_approver !== ""
                  ? {
                      label: `${data?.pn_approver} - ${data?.nama_approver}`,
                      value: {
                        pn: data?.pn_approver,
                        name: data?.nama_approver,
                      },
                    }
                  : ""
              }
              isDisabled={isDisabled}
              isRequired={true}
            />
          </div>
        )}
        {currentModalStage > 1 && (
          <div className="rounded w-28 bg-atlasian-blue-light flex items-center">
            <ButtonField
              text={"Kembali"}
              disabled={isDisabled}
              handler={handlePrevStage}
              name={"prevButton"}
            />
          </div>
        )}
        {currentModalStage === maxStage ? (
          differentPIC && isPat ? (
            // Jika yang login bukan KTA dan tipe jadwalnya PAT
            <div className="rounded w-32 bg-atlasian-green flex items-center">
              <ButtonField
                text={"Send Approval"}
                handler={handleSubmit}
                type={"submit"}
                name={"sendApprovalButton"}
              />
            </div>
          ) : (
            <div className="rounded w-28 bg-atlasian-green flex items-center">
              <ButtonField
                text={"Buat E.W.P"}
                handler={handleSubmit}
                type={"submit"}
                name={"saveButton"}
              />
            </div>
          )
        ) : (
          currentModalStage > 1 && (
            <div className="rounded w-28 bg-atlasian-green flex items-center">
              <ButtonField
                text={"Lanjut"}
                handler={handleNextStage}
                type={"submit"}
                name={"nextButton"}
              />
            </div>
          )
        )}
      </form>
      {currentModalStage === maxStage && isPat && validation?.pn_approver && (
        <div className="mt-2.5">
          <ErrorValidation
            message={validation?.pn_approver}
            className={"ml-1"}
          />
        </div>
      )}
    </div>
  );
};

export default ModalFooter;

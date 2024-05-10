import { ButtonField, ButtonIcon, ErrorValidation } from "@/components/atoms";
import { IconClose } from "@/components/icons";
import { UserSKAISelect } from "@/components/molecules/commons";
const ModalFooter = ({
  selectedData,
  isDisabled,
  validation,
  handleChange,
  handleReset,
  handleSubmit,
}) => {
  return (
    <div className="w-full flex items-center justify-between gap-3">
      <div className="w-full flex items-center gap-3">
        <div className="text-base font-semibold">PIC Analisator</div>
        <div className="w-80">
          <UserSKAISelect
            selectedValue={
              selectedData?.pic?.pn
                ? {
                    label: `${selectedData?.pic?.pn} - ${selectedData?.pic?.name}`,
                    value: {
                      pn: selectedData?.pic?.pn,
                      name: selectedData?.pic?.name,
                    },
                  }
                : null
            }
            customIcon={
              <ButtonIcon icon={<IconClose />} handleClick={handleReset} />
            }
            handleChange={(e) => handleChange(e.value)}
          />
          {validation && validation["pic.pn"] ? (
            <ErrorValidation
              message={validation["pic.pn"]}
              className={"mt-2"}
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <div
        className={`rounded h-fit w-28 ${
          isDisabled ? "bg-atlasian-gray-light" : "bg-atlasian-green"
        }`}
      >
        <ButtonField
          text={"Simpan"}
          handler={handleSubmit}
          type={"submit"}
          name={"saveButton"}
          disabled={isDisabled}
        />
      </div>
    </div>
  );
};

export default ModalFooter;

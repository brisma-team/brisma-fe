import {
  ButtonField,
  ErrorValidation,
  TextInputDecimal,
} from "@/components/atoms";
import SelectAuditTeamEWP from "../../SelectAuditTeamEWP";

const ModalFooter = ({
  value,
  validationErrors,
  handleChangeSelect,
  handleChangeText,
  handleSubmit,
}) => {
  return (
    <div className="w-full flex justify-end gap-2 -my-1">
      <div className="w-full flex gap-2">
        <div className="relative w-full">
          <SelectAuditTeamEWP
            placeholder="Masukan PN/Nama KTA Manajer Audit atau EVP"
            width={"w-full"}
            handleChange={handleChangeSelect}
            selectedValue={{
              label: value?.name,
              value: value?.pn,
            }}
          />
          {validationErrors["pn"] && (
            <ErrorValidation message={validationErrors["pn"]} />
          )}
        </div>
        <div className="w-52">
          <TextInputDecimal
            value={value.mandays}
            onChange={handleChangeText}
            placeholder="Mandays (hari)"
          />
          {validationErrors["mandays"] && (
            <ErrorValidation message={validationErrors["mandays"]} />
          )}
        </div>
      </div>
      <div className="rounded w-36 bg-atlasian-green flex items-center">
        <ButtonField
          text={"Tetapkan Auditor"}
          type={"submit"}
          name={"saveButton"}
          handler={handleSubmit}
        />
      </div>
    </div>
  );
};

export default ModalFooter;

import { ButtonIcon, Card, TextInput } from "@/components/atoms";
import { IconClose } from "@/components/icons";
import { UkaSelectRef, RoleSelectRef } from "../common";
import { useCallback } from "react";

const CardFilterUserSKAI = ({ showFilter, filter, setFilter }) => {
  const handleChangeTextInput = useCallback(
    (property, value) => {
      setFilter((prevFilter) => ({ ...prevFilter, [property]: value }));
    },
    [setFilter]
  );

  const handleChangeSelect = useCallback(
    (property, e) => {
      setFilter((prevFilter) => ({ ...prevFilter, [property]: e }));
    },
    [setFilter]
  );

  const handleReset = useCallback(
    (property) => {
      setFilter((prevFilter) => ({ ...prevFilter, [property]: "" }));
    },
    [setFilter]
  );

  return showFilter ? (
    <div className="rounded mt-4 w-[30rem]">
      <Card>
        <div className="px-4 py-2 flex flex-col gap-3 items-center justify-center w-full">
          <div className="flex gap-3 items-center w-full">
            <div className="w-[50%]">
              <TextInput
                placeholder="Personal Number"
                isNumber
                icon={
                  <ButtonIcon
                    handleClick={() => handleReset("pn")}
                    icon={<IconClose size="large" />}
                  />
                }
                onChange={(e) => handleChangeTextInput("pn", e.target.value)}
                value={filter.pn || ""}
              />
            </div>
            <div className="w-[50%]">
              <TextInput
                placeholder="Personal Name"
                icon={
                  <ButtonIcon
                    handleClick={() => handleReset("name")}
                    icon={<IconClose size="large" />}
                  />
                }
                onChange={(e) => handleChangeTextInput("name", e.target.value)}
                value={filter.name || ""}
              />
            </div>
          </div>
          <div className="flex gap-3 items-center w-full">
            <div className="w-[50%]">
              <UkaSelectRef
                isSearchable
                handleChange={(e) => handleChangeSelect("uka_kode", e)}
                selectedValue={filter.uka_kode}
                customIcon={
                  <ButtonIcon
                    handleClick={() => handleReset("uka_kode")}
                    icon={<IconClose />}
                  />
                }
                placeholder={"Unit Kerja"}
              />
            </div>
            <div className="w-[50%]">
              <RoleSelectRef
                isSearchable
                handleChange={(e) => handleChangeSelect("role_kode", e)}
                selectedValue={filter.role_kode}
                customIcon={
                  <ButtonIcon
                    handleClick={() => handleReset("role_kode")}
                    icon={<IconClose />}
                  />
                }
                placeholder={"Role Pengguna"}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  ) : null;
};

export default CardFilterUserSKAI;

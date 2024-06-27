import { ButtonIcon, Card, TextInput } from "@/components/atoms";
import { IconClose } from "@/components/icons";
import { UkaSelectRef, RoleSelectRef } from "../common";

const CardFilterUserSKAI = ({ showFilter, filter, setFilter }) => {
  const handleChangeTextInput = (property, value) => {
    setFilter({ ...filter, [property]: value });
  };

  const handleChangeSelect = (property, e) => {
    setFilter({ ...filter, [property]: e });
  };

  const handleReset = (property) => {
    setFilter({ ...filter, [property]: "" });
  };
  return showFilter ? (
    <div className="rounded mt-4 w-[30rem]">
      <Card>
        <div className="px-4 py-2 flex flex-col gap-3 items-center justify-center w-full">
          <div className="flex gap-3 items-center w-full">
            <div className="w-[50%]">
              <TextInput
                placeholder="Personal Number"
                icon={
                  <ButtonIcon
                    handleClick={() => handleReset("pn")}
                    icon={<IconClose size="large" />}
                  />
                }
                onChange={(e) => handleChangeTextInput("pn", e.target.value)}
                value={filter?.pn}
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
                value={filter?.name}
              />
            </div>
          </div>
          <div className="flex gap-3 items-center w-full">
            <div className="w-[50%]">
              <UkaSelectRef
                isSearchable={true}
                handleChange={(e) => handleChangeSelect("uka_kode", e)}
                selectedValue={
                  filter?.uka_kode
                    ? {
                        label: filter?.uka_kode?.label,
                        value: filter?.uka_kode?.value,
                      }
                    : null
                }
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
                isSearchable={true}
                handleChange={(e) => handleChangeSelect("role_kode", e)}
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
  ) : (
    ""
  );
};

export default CardFilterUserSKAI;

import { ButtonIcon, Card, TextInput } from "@/components/atoms";
import { IconClose } from "@/components/icons";
import { BranchSelect, OrgehSelect } from "../../commons";

const CardFilterUKA = ({ showFilter, filter, setFilter }) => {
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
                placeholder="Kode Unit Kantor Audit"
                icon={
                  <ButtonIcon
                    handleClick={() => handleReset("uka_kode")}
                    icon={<IconClose size="large" />}
                  />
                }
                onChange={(e) =>
                  handleChangeTextInput("uka_kode", e.target.value)
                }
                value={filter?.pn}
              />
            </div>
            <div className="w-[50%]">
              <TextInput
                placeholder="Nama Unit Kantor Audit"
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
              <BranchSelect
                isSearchable={true}
                handleChange={(e) => handleChangeSelect("branch", e)}
                selectedValue={
                  filter?.branch
                    ? {
                        label: filter?.branch?.label,
                        value: filter?.branch?.value,
                      }
                    : null
                }
                customIcon={
                  <ButtonIcon
                    handleClick={() => handleReset("branch")}
                    icon={<IconClose />}
                  />
                }
                placeholder={"Branch"}
              />
            </div>
            <div className="w-[50%]">
              <OrgehSelect
                isSearchable={true}
                handleChange={(e) => handleChangeSelect("orgeh", e)}
                selectedValue={
                  filter?.orgeh
                    ? {
                        label: filter?.orgeh?.label,
                        value: filter?.orgeh?.value,
                      }
                    : null
                }
                customIcon={
                  <ButtonIcon
                    handleClick={() => handleReset("orgeh")}
                    icon={<IconClose />}
                  />
                }
                placeholder={"Orgeh"}
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

export default CardFilterUKA;

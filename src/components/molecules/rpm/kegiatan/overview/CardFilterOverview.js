import {
  ButtonIcon,
  Card,
  DatepickerField,
  TextInput,
} from "@/components/atoms";
import { IconClose } from "@/components/icons";
import {
  PekerjaSelect,
  StatusApprovalSelect,
} from "@/components/molecules/commons";

const CardFilterOverview = ({ showFilter, filter, setFilter }) => {
  const handleChangeTextInput = (property, value) => {
    setFilter({ ...filter, [property]: value });
  };

  const handleChangeSelect = (property, e) => {
    setFilter({ ...filter, [property]: e.value });
  };

  const handleReset = (property) => {
    setFilter({ ...filter, [property]: "" });
  };

  return showFilter ? (
    <div className="rounded mt-4 w-[45rem]">
      <Card>
        <div className="px-4 py-2 flex flex-col gap-3 items-center justify-center w-full">
          <div className="flex gap-3 items-center w-full">
            <div className="w-[33%]">
              <TextInput
                placeholder="Project Code"
                icon={
                  <ButtonIcon
                    handleClick={() => handleReset("project_code")}
                    icon={<IconClose size="large" />}
                  />
                }
                onChange={(e) =>
                  handleChangeTextInput("project_code", e.target.value)
                }
                value={filter?.project_code}
              />
            </div>
            <div className="w-[33%]">
              <TextInput
                placeholder="Project Name"
                icon={
                  <ButtonIcon
                    handleClick={() => handleReset("project_name")}
                    icon={<IconClose size="large" />}
                  />
                }
                onChange={(e) =>
                  handleChangeTextInput("project_name", e.target.value)
                }
                value={filter?.project_name}
              />
            </div>
            <div className="w-[33%]">
              <PekerjaSelect
                selectedValue={
                  filter?.inisiator?.pn
                    ? {
                        label: filter?.inisiator?.name,
                        value: filter?.inisiator,
                      }
                    : null
                }
                placeholder={"Inisiator"}
                handleChange={(e) => handleChangeSelect("inisiator", e)}
                customIcon={
                  <ButtonIcon
                    icon={<IconClose />}
                    handleClick={() => handleChangeSelect("inisiator", "")}
                  />
                }
              />
            </div>
          </div>
          <div className="flex gap-3 items-center w-full">
            <div className="w-[33%]">
              <StatusApprovalSelect
                handleChange={(e) =>
                  handleChangeSelect("status_persetujuan", e)
                }
                selectedValue={
                  filter?.status_persetujuan?.kode
                    ? {
                        label: filter?.status_persetujuan?.name,
                        value: filter?.status_persetujuan,
                      }
                    : null
                }
                handleReset={() => handleReset("status_persetujuan")}
                placeholder={"Status Persetujuan"}
              />
            </div>
            <div className="w-[33%]">
              <DatepickerField
                placeholder={"Tanggal Inisiasi"}
                value={filter?.tanggal_inisiasi}
                format={"DD-MM-YYYY"}
                handleChange={(value) =>
                  handleChangeTextInput("tanggal_inisiasi", value)
                }
              />
            </div>
            <div className="w-[33%]" />
          </div>
        </div>
      </Card>
    </div>
  ) : (
    ""
  );
};

export default CardFilterOverview;

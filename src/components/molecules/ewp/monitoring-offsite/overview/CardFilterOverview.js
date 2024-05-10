import {
  ButtonIcon,
  Card,
  DatepickerField,
  TextInput,
} from "@/components/atoms";
import { IconClose } from "@/components/icons";
import {
  CustomSelect,
  StatusApprovalSelect,
} from "@/components/molecules/commons";

const CardFilterOverview = ({ showFilter, filter, setFilter }) => {
  const handleChangeTextInput = (property, value) => {
    setFilter({ ...filter, [property]: value });
  };

  const handleChangeSelect = (property, e) => {
    setFilter({ ...filter, [property]: e.value });
  };

  const handleResetSelected = (property) => {
    handleChangeSelect(property, "");
  };

  return showFilter ? (
    <div className="rounded mt-4 w-[45rem]">
      <Card>
        <div className="px-4 py-2 flex flex-col gap-3 items-center justify-center w-full">
          <div className="flex gap-3 items-center w-full">
            <div className="w-[30%]">
              <TextInput
                placeholder="Project Code"
                icon={
                  <ButtonIcon
                    handleClick={() => handleResetSelected("project_code")}
                    icon={<IconClose size="large" />}
                  />
                }
                onChange={(e) =>
                  handleChangeTextInput("project_code", e.target.value)
                }
                value={filter?.project_code}
              />
            </div>
            <div className="w-[30%]">
              <TextInput
                placeholder="Project Name"
                icon={
                  <ButtonIcon
                    handleClick={() => handleResetSelected("project_name")}
                    icon={<IconClose size="large" />}
                  />
                }
                onChange={(e) =>
                  handleChangeTextInput("project_name", e.target.value)
                }
                value={filter?.project_name}
              />
            </div>
            <div className="w-[40%]">
              <CustomSelect
                optionValue={[
                  {
                    label: "Pengerjaan",
                    value: { kode: "Pengerjaan", name: "Pengerjaan" },
                  },
                  {
                    label: "Belum Dimulai",
                    value: { kode: "Belum Dimulai", name: "Belum Dimulai" },
                  },
                  {
                    label: "On Approve",
                    value: { kode: "On Approve", name: "On Approve" },
                  },
                  {
                    label: "Addendum",
                    value: { kode: "Addendum", name: "Addendum" },
                  },
                ]}
                customIcon={
                  <ButtonIcon
                    handleClick={() => handleResetSelected("status_dokumen")}
                    icon={<IconClose size="large" />}
                  />
                }
                selectedValue={
                  filter?.status_dokumen
                    ? {
                        label: filter?.status_dokumen?.name,
                        value: filter?.status_dokumen,
                      }
                    : null
                }
                placeholder={"Status Dokumen"}
                handleChange={(e) => handleChangeSelect("status_dokumen", e)}
              />
            </div>
          </div>
          <div className="flex gap-3 items-center w-full">
            <div className="w-[30%]">
              <TextInput
                placeholder="Anggota Tim Audit"
                icon={
                  <ButtonIcon
                    handleClick={() => handleResetSelected("ata")}
                    icon={<IconClose size="large" />}
                  />
                }
                onChange={(e) => handleChangeTextInput("ata", e.target.value)}
                value={filter?.ata}
              />
            </div>
            <div className="w-[30%]">
              <StatusApprovalSelect
                handleChange={(e) => handleChangeSelect("status_approval", e)}
                selectedValue={
                  filter?.status_approval?.kode
                    ? {
                        label: filter?.status_approval,
                        value: {
                          kode: filter?.status_approval,
                          value: filter?.status_approval,
                        },
                      }
                    : null
                }
                handleReset={() => handleResetSelected("status_approval")}
                placeholder={"Status Persetujuan"}
              />
            </div>
            <div className="w-[40%] flex gap-3">
              <div className="w-1/2">
                <DatepickerField
                  placeholder={"Start Date"}
                  value={filter?.start_date}
                  format={"DD-MM-YYYY"}
                  handleChange={(value) =>
                    handleChangeTextInput("start_date", value)
                  }
                />
              </div>
              <div className="w-1/2">
                <DatepickerField
                  placeholder={"End Date"}
                  value={filter?.end_date}
                  format={"DD-MM-YYYY"}
                  handleChange={(value) =>
                    handleChangeTextInput("end_date", value)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  ) : (
    ""
  );
};

export default CardFilterOverview;

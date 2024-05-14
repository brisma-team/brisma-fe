import {
  ButtonIcon,
  Card,
  DatepickerField,
  TextInput,
} from "@/components/atoms";
import { IconClose } from "@/components/icons";
import {
  CustomSelect,
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
            <div className="w-[30%]">
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
            <div className="w-[30%]">
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
            <div className="w-[40%]">
              <CustomSelect
                optionValue={[
                  {
                    label: "Init Project",
                    value: { kode: 1, name: "Init Project" },
                  },
                  {
                    label: "Perencanaan",
                    value: { kode: 2, name: "Perencanaan" },
                  },
                  {
                    label: "Pelaksanaan",
                    value: { kode: 4, name: "Pelaksanaan" },
                  },
                  {
                    label: "Peluang Peningkatan",
                    value: { kode: 6, name: "Peluang Peningkatan" },
                  },
                  {
                    label: "Wrap Up",
                    value: { kode: 8, name: "Wrap Up" },
                  },
                  {
                    label: "Addendum",
                    value: { kode: 12, name: "Addendum" },
                  },
                  {
                    label: "Final",
                    value: { kode: 9, name: "Final" },
                  },
                ]}
                customIcon={
                  <ButtonIcon
                    handleClick={() => handleReset("status_document")}
                    icon={<IconClose />}
                  />
                }
                selectedValue={
                  filter?.status_document
                    ? {
                        label: filter?.status_document?.name,
                        value: filter?.status_document,
                      }
                    : null
                }
                placeholder={"Status Dokumen"}
                handleChange={(e) => {
                  handleChangeSelect("status_document", e);
                }}
              />
            </div>
          </div>
          <div className="flex gap-3 items-center w-full">
            <div className="w-[30%]">
              <PekerjaSelect
                handleChange={(e) => handleChangeSelect("anggota_tim_audit", e)}
                selectedValue={
                  filter?.anggota_tim_audit?.pn
                    ? {
                        label: filter?.anggota_tim_audit?.name,
                        value: filter?.anggota_tim_audit,
                      }
                    : null
                }
                customIcon={
                  <ButtonIcon
                    handleClick={() => handleReset("anggota_tim_audit")}
                    icon={<IconClose />}
                  />
                }
                placeholder={"Anggota Tim Audit"}
              />
            </div>
            <div className="w-[30%]">
              <StatusApprovalSelect
                handleChange={(e) => handleChangeSelect("status_approval", e)}
                selectedValue={
                  filter?.status_approval?.kode
                    ? {
                        label: filter?.status_approval?.name,
                        value: filter?.status_approval,
                      }
                    : null
                }
                handleReset={() => handleReset("status_approval")}
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

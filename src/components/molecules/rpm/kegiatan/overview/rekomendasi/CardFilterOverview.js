import {
  ButtonIcon,
  Card,
  DatepickerField,
  TextInput,
} from "@/components/atoms";
import { IconClose } from "@/components/icons";
import {
  CustomSelect,
  RiskControlSelect,
  RiskSelect,
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
    <div className="rounded mt-4 w-[50rem]">
      <Card>
        <div className="px-4 py-2 flex flex-col gap-3 items-center justify-center w-full">
          <div className="flex gap-3 items-center w-full">
            <div className="w-[25%]">
              <TextInput
                placeholder="Judul Lingkup"
                icon={
                  <ButtonIcon
                    handleClick={() => handleReset("judul_lingkup")}
                    icon={<IconClose size="large" />}
                  />
                }
                onChange={(e) =>
                  handleChangeTextInput("judul_lingkup", e.target.value)
                }
                value={filter?.judul_lingkup}
              />
            </div>
            <div className="w-[25%]">
              <TextInput
                placeholder="Rekomendasi"
                icon={
                  <ButtonIcon
                    handleClick={() => handleReset("desc")}
                    icon={<IconClose size="large" />}
                  />
                }
                onChange={(e) => handleChangeTextInput("desc", e.target.value)}
                value={filter?.desc}
              />
            </div>
            <div className="w-[50%] flex gap-3">
              <div className="w-1/2">
                <RiskSelect
                  selectedValue={
                    filter?.risk_kode
                      ? {
                          label: filter?.risk_kode?.nama,
                          value: filter?.risk_kode,
                        }
                      : null
                  }
                  customIcon={
                    <ButtonIcon
                      icon={<IconClose />}
                      handleClick={() => handleChangeSelect("risk_kode", "")}
                    />
                  }
                  handleChange={(e) => handleChangeSelect("risk_kode", e)}
                  placeholder={"Pilih Resiko"}
                />
              </div>
              <div className="w-1/2">
                <RiskControlSelect
                  selectedValue={
                    filter?.control_kode?.kode
                      ? {
                          label: filter?.control_kode?.nama,
                          value: filter?.control_kode,
                        }
                      : null
                  }
                  customIcon={
                    <ButtonIcon
                      icon={<IconClose />}
                      handleClick={() => handleChangeSelect("control_kode", "")}
                    />
                  }
                  handleChange={(e) => handleChangeSelect("control_kode", e)}
                  placeholder={"Pilih Control"}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-3 items-center w-full">
            <div className="w-[24%]">
              <CustomSelect
                optionValue={[
                  {
                    label: "Incomplete",
                    value: "Incomplete",
                  },
                  {
                    label: "On Progress",
                    value: "On Progress",
                  },
                  {
                    label: "Complete",
                    value: "Complete",
                  },
                ]}
                customIcon={
                  <ButtonIcon
                    handleClick={() => handleReset("status_complete")}
                    icon={<IconClose />}
                  />
                }
                selectedValue={
                  filter?.status_complete
                    ? {
                        label: filter?.status_complete,
                        value: filter?.status_complete,
                      }
                    : null
                }
                placeholder={"Status Rekomendasi"}
                handleChange={(e) => handleChangeSelect("status_complete", e)}
              />
            </div>
            <div className="w-[50%] flex gap-3">
              <div className="w-1/2">
                <DatepickerField
                  placeholder={"Start Date"}
                  value={filter?.batas_waktu_start}
                  format={"DD-MM-YYYY"}
                  handleChange={(value) =>
                    handleChangeTextInput("batas_waktu_start", value)
                  }
                />
              </div>
              <div className="w-1/2">
                <DatepickerField
                  placeholder={"End Date"}
                  value={filter?.batas_waktu_end}
                  format={"DD-MM-YYYY"}
                  handleChange={(value) =>
                    handleChangeTextInput("batas_waktu_end", value)
                  }
                />
              </div>
            </div>
            <div className="40%" />
          </div>
        </div>
      </Card>
    </div>
  ) : (
    ""
  );
};

export default CardFilterOverview;

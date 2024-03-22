import { ButtonIcon, Card, TextInput } from "@/components/atoms";
import { IconClose } from "@/components/icons";
import {
  PekerjaSelect,
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
    <div className="rounded mt-4 w-[40rem]">
      <Card>
        <div className="px-4 py-2 flex flex-col gap-3 items-center justify-center w-full">
          <div className="flex gap-3 items-center w-full">
            <div className="w-[33%]">
              <TextInput
                placeholder="Judul Peluang"
                icon={
                  <ButtonIcon
                    handleClick={() => handleReset("nama_kkpt")}
                    icon={<IconClose size="large" />}
                  />
                }
                onChange={(e) =>
                  handleChangeTextInput("nama_kkpt", e.target.value)
                }
                value={filter?.nama_kkpt}
              />
            </div>
            <div className="w-[33%]">
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
            <div className="w-[33%]">
              <RiskSelect
                selectedValue={
                  filter?.risk_kode?.kode
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
          </div>
          <div className="flex gap-3 items-center w-full">
            <div className="w-[33%]">
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
            <div className="w-[33%]">
              <PekerjaSelect
                selectedValue={
                  filter?.auditor?.pn
                    ? { label: filter?.auditor?.name, value: filter?.auditor }
                    : null
                }
                placeholder={"Auditor"}
                handleChange={(e) => handleChangeSelect("auditor", e)}
                customIcon={
                  <ButtonIcon
                    icon={<IconClose />}
                    handleClick={() => handleChangeSelect("auditor", "")}
                  />
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

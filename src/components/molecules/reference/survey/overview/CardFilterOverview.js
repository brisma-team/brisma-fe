import {
  ButtonIcon,
  Card,
  DatepickerField,
  TextInput,
} from "@/components/atoms";
import { IconClose } from "@/components/icons";
import CustomSelect from "@/components/molecules/commons/CustomSelect";
import { useState } from "react";

const CardFilterOverview = ({ showFilter, filter, setFilter }) => {
  const [selectOptionValue, setSelectOptionValue] = useState({
    kode_jenis_template: "",
    nama_jenis_template: "",
    kode_status_template: "",
    nama_status_template: "",
  });

  const [optionValueStatus, setOptionValueStatus] = useState([
    { label: "Enable", value: "true" },
    { label: "Disable", value: "false" },
  ]);
  const [optionValueJenis, setOptionValueJenis] = useState([
    { label: "Test", value: 1 },
  ]);

  const handleChange = (property, value) => {
    setFilter({ ...filter, [property]: value });
  };

  const handleChangeSelect = (property, e) => {
    if (property === "jenis") {
      setSelectOptionValue((prev) => {
        return {
          ...prev,
          kode_jenis_template: e.value,
          nama_jenis_template: e.label,
        };
      });
    } else if (property === "status") {
      setSelectOptionValue((prev) => {
        return {
          ...prev,
          kode_status_template: e.value,
          nama_status_template: e.label,
        };
      });
    }
    setFilter({ ...filter, [property]: e.value });
  };

  const handleResetSelect = (property, value) => {
    handleChangeSelect(property, value);
  };

  return (
    showFilter && (
      <div className="rounded bg-white w-fit">
        <Card>
          <div className="px-3 py-1 flex gap-2">
            <div className="flex flex-col gap-3">
              <div className="w-48">
                <TextInput
                  placeholder="Kode Template"
                  icon={
                    <ButtonIcon
                      handleClick={() => handleChange("kode", "")}
                      icon={<IconClose size="large" />}
                    />
                  }
                  onChange={(e) => handleChange("kode", e.target.value)}
                  value={filter.kode}
                />
              </div>
              <div className="w-48">
                <TextInput
                  placeholder="Judul Template"
                  icon={
                    <ButtonIcon
                      handleClick={() => handleChange("judul", "")}
                      icon={<IconClose size="large" />}
                    />
                  }
                  onChange={(e) => handleChange("judul", e.target.value)}
                  value={filter.judul}
                />
              </div>
              <div className="w-48">
                <TextInput
                  placeholder="Nama Pembuat"
                  icon={
                    <ButtonIcon
                      handleClick={() => handleChange("nama_pembuat", "")}
                      icon={<IconClose size="large" />}
                    />
                  }
                  onChange={(e) => handleChange("nama_pembuat", e.target.value)}
                  value={filter.nama_pembuat}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="w-48">
                <CustomSelect
                  optionValue={optionValueStatus}
                  selectedValue={
                    selectOptionValue.kode_status_template
                      ? {
                          label: selectOptionValue.nama_status_template,
                          value: selectOptionValue.kode_status_template,
                        }
                      : null
                  }
                  placeholder={"Status Template"}
                  handleChange={(e) => handleChangeSelect("status", e)}
                  customIcon={
                    <ButtonIcon
                      icon={<IconClose />}
                      handleClick={() =>
                        handleResetSelect("status", { label: "", value: "" })
                      }
                    />
                  }
                />
              </div>
              <div className="w-48">
                <CustomSelect
                  optionValue={optionValueJenis}
                  selectedValue={
                    selectOptionValue.kode_jenis_template
                      ? {
                          label: selectOptionValue.nama_jenis_template,
                          value: selectOptionValue.kode_jenis_template,
                        }
                      : null
                  }
                  placeholder={"Jenis Template"}
                  handleChange={(e) => handleChangeSelect("jenis", e)}
                  customIcon={
                    <ButtonIcon
                      icon={<IconClose />}
                      handleClick={() =>
                        handleResetSelect("jenis", { label: "", value: "" })
                      }
                    />
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="w-48">
                <DatepickerField
                  placeholder={"Tanggal Pembuatan"}
                  value={filter.tanggal_pembuatan}
                  format={"DD-MM-YYYY"}
                  handleChange={(value) =>
                    handleChange("tanggal_pembuatan", value)
                  }
                />
              </div>
              <div className="w-48">
                <DatepickerField
                  placeholder={"Tanggal Approval"}
                  value={filter.tanggal_approval}
                  format={"DD-MM-YYYY"}
                  handleChange={(value) =>
                    handleChange("tanggal_approval", value)
                  }
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    )
  );
};

export default CardFilterOverview;

import {
  ButtonIcon,
  Card,
  DatepickerField,
  TextInput,
} from "@/components/atoms";
import { IconClose } from "@/components/icons";
import CustomSelect from "@/components/molecules/commons/CustomSelect";
import { useState } from "react";
import { TypeSurveySelect } from "../../commons";

const CardFilterOverview = ({ showFilter, filter, setFilter }) => {
  const [selectOptionValue, setSelectOptionValue] = useState({
    jenis_survey_kode: "",
    jenis_survey_nama: "",
    kode_status_active: "",
    nama_status_active: "",
  });

  const handleChange = (property, value) => {
    setFilter({ ...filter, [property]: value });
  };

  const handleChangeSelect = (property, e) => {
    if (property === "jenis_survey") {
      setSelectOptionValue((prev) => {
        return {
          ...prev,
          jenis_survey_kode: e.value,
          jenis_survey_nama: e.label,
        };
      });
    } else if (property === "status_active") {
      setSelectOptionValue((prev) => {
        return {
          ...prev,
          kode_status_active: e.value,
          nama_status_active: e.label,
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
              <div className="w-48">
                <TextInput
                  placeholder="PN Responden"
                  icon={
                    <ButtonIcon
                      handleClick={() => handleChange("pn_responden", "")}
                      icon={<IconClose size="large" />}
                    />
                  }
                  onChange={(e) => handleChange("pn_responden", e.target.value)}
                  value={filter.pn_responden}
                />
              </div>
              <div className="w-48">
                <TextInput
                  placeholder="Project Code"
                  icon={
                    <ButtonIcon
                      handleClick={() => handleChange("project_code", "")}
                      icon={<IconClose size="large" />}
                    />
                  }
                  onChange={(e) => handleChange("project_code", e.target.value)}
                  value={filter.project_code}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="w-48">
                <TypeSurveySelect
                  selectedValue={
                    selectOptionValue.jenis_survey_kode
                      ? {
                          label: selectOptionValue.jenis_survey_nama,
                          value: {
                            kode: selectOptionValue.jenis_survey_kode,
                            nama: selectOptionValue.jenis_survey_nama,
                          },
                        }
                      : null
                  }
                  placeholder={"Jenis Survey"}
                  handleChange={(e) => handleChangeSelect("jenis_survey", e)}
                  customIcon={
                    <ButtonIcon
                      icon={<IconClose />}
                      handleClick={() => handleResetSelect("jenis_survey", "")}
                    />
                  }
                />
              </div>
              <div className="w-48">
                <CustomSelect
                  optionValue={[
                    { label: "Active", value: "true" },
                    { label: "Inactive", value: "false" },
                  ]}
                  selectedValue={
                    selectOptionValue.kode_status_active
                      ? {
                          label: selectOptionValue.nama_status_active,
                          value: selectOptionValue.kode_status_active,
                        }
                      : null
                  }
                  placeholder={"Status Aktif"}
                  handleChange={(e) => handleChangeSelect("status_active", e)}
                  customIcon={
                    <ButtonIcon
                      icon={<IconClose />}
                      handleClick={() => handleResetSelect("status_active", "")}
                    />
                  }
                />
              </div>
              <div className="w-48">
                <CustomSelect
                  optionValue={[
                    { label: "On Progress", value: "On Progress" },
                    {
                      label: "On Approver Active",
                      value: "On Approver Active",
                    },
                    {
                      label: "On Approver Inactive",
                      value: "On Approver Inactive",
                    },
                    { label: "Final", value: "Final" },
                  ]}
                  selectedValue={
                    filter.status_approver
                      ? {
                          label: filter.status_approver,
                          value: filter.status_approver,
                        }
                      : null
                  }
                  placeholder={"Status Approver"}
                  handleChange={(e) => handleChangeSelect("status_approver", e)}
                  customIcon={
                    <ButtonIcon
                      icon={<IconClose />}
                      handleClick={() =>
                        handleResetSelect("status_approver", "")
                      }
                    />
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="w-48">
                <CustomSelect
                  optionValue={[
                    { label: "Draft", value: "Draft" },
                    {
                      label: "Belum dimulai",
                      value: "Belum dimulai",
                    },
                    {
                      label: "Sedang berlangsung",
                      value: "Sedang berlangsung",
                    },
                    { label: "Selesai", value: "Selesai" },
                  ]}
                  selectedValue={
                    filter.status_survey
                      ? {
                          label: filter.status_survey,
                          value: filter.status_survey,
                        }
                      : null
                  }
                  placeholder={"Status Survey"}
                  handleChange={(e) => handleChangeSelect("status_survey", e)}
                  customIcon={
                    <ButtonIcon
                      icon={<IconClose />}
                      handleClick={() => handleResetSelect("status_survey", "")}
                    />
                  }
                />
              </div>
              <div className="w-48">
                <DatepickerField
                  placeholder={"Tanggal Dimulai"}
                  value={filter.tanggal_dimulai}
                  format={"DD-MM-YYYY"}
                  handleChange={(value) =>
                    handleChange("tanggal_dimulai", value)
                  }
                />
              </div>
              <div className="w-48">
                <DatepickerField
                  placeholder={"Tanggal Selesai"}
                  value={filter.tanggal_selesai}
                  format={"DD-MM-YYYY"}
                  handleChange={(value) =>
                    handleChange("tanggal_selesai", value)
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

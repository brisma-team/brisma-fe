import {
  ButtonIcon,
  Card,
  DatepickerField,
  TextInput,
} from "@/components/atoms";
import { IconClose } from "@/components/icons";
import { useState } from "react";
import { TypeSurveySelect } from "@/components/molecules/commons";

const CardFilterOverview = ({ showFilter, filter, setFilter }) => {
  const [selectOptionValue, setSelectOptionValue] = useState({
    jenis_survey_kode: "",
    jenis_survey_nama: "",
  });

  const handleChange = (property, value) => {
    setFilter({ ...filter, [property]: value });
  };

  const handleChangeSelect = (property, e) => {
    if (property === "jenis_survey") {
      setSelectOptionValue((prev) => {
        return {
          ...prev,
          jenis_survey_kode: e.value.kode,
          jenis_survey_nama: e.value.nama,
        };
      });
      setFilter({ ...filter, [property]: e.value.kode });
    }
  };

  const handleResetSelect = (property, value) => {
    handleChangeSelect(property, value);
  };

  return (
    showFilter && (
      <div className="rounded bg-white w-fit">
        <Card>
          <div className="px-3 py-1 flex gap-2">
            <div className="flex flex-col gap-2">
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
            <div className="flex flex-col gap-3">
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
                      handleClick={() =>
                        handleResetSelect("jenis_survey", {
                          label: "",
                          value: { kode: "", nama: "" },
                        })
                      }
                    />
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

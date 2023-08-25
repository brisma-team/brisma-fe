import { ButtonIcon, Card, Select, TextInput } from "@/components/atoms";
import { IconClose } from "@/components/icons";
import {
  CategorySelect,
  MetodeSelect,
  TemaSelect,
  TypeSelect,
} from "@/components/molecules/commons";
import { useState } from "react";

const CardFilterProjectOverview = ({ showFilter, filter, setFilter }) => {
  const [selectedValue, setSelectedValue] = useState({
    name: "",
    is_audited: false,
    ref_metode: "",
    ref_tipe: "",
    ref_jenis: "",
    ref_tema: "",
  });

  const handleChangeTextInput = (property, value) => {
    setSelectedValue({ ...selectedValue, [property]: value });
    setFilter({ ...filter, [property]: value });
  };

  const handleChangeSelect = (property, e) => {
    setSelectedValue({ ...selectedValue, [property]: e });
    setFilter({ ...filter, [property]: e.value });
  };

  const handleResetSelected = (property) => {
    handleChangeSelect(property, "");
  };

  return (
    showFilter && (
      <div className="rounded absolute z-20 bg-white top-4">
        <Card>
          <div className="px-2">
            <div className="flex m-2 w-[39rem] gap-4">
              <div className="w-1/3">
                <TextInput
                  placeholder="Judul Jadwal"
                  icon={
                    <ButtonIcon
                      handleClick={() => handleChangeTextInput("name", "")}
                      icon={<IconClose size="large" />}
                    />
                  }
                  onChange={(e) =>
                    handleChangeTextInput("name", e.target.value)
                  }
                  value={selectedValue.name}
                />
              </div>
              <div className="w-1/3">
                <MetodeSelect
                  placeholder={"Metode Audit"}
                  customIcon={
                    <ButtonIcon
                      icon={<IconClose />}
                      handleClick={() => handleResetSelected("ref_metode")}
                    />
                  }
                  handleChange={(e) => handleChangeSelect("ref_metode", e)}
                  selectedValue={selectedValue.ref_metode}
                />
              </div>
              <div className="w-1/3">
                <CategorySelect
                  placeholder={"Jenis Audit"}
                  customIcon={
                    <ButtonIcon
                      icon={<IconClose />}
                      handleClick={() => handleResetSelected("ref_jenis")}
                    />
                  }
                  handleChange={(e) => handleChangeSelect("ref_jenis", e)}
                  selectedValue={selectedValue.ref_jenis}
                />
              </div>
            </div>
            <div className="flex m-2 w-[39rem] gap-4">
              <div className="w-1/3">
                <Select
                  optionValue={[
                    { label: "Sudah di-Audit", value: "true" },
                    { label: "Belum di-Audit", value: "false" },
                  ]}
                  placeholder="Status Audit"
                  onChange={(e) => handleChangeSelect("is_audited", e)}
                  isSearchable={false}
                  value={selectedValue.is_audited}
                />
              </div>
              <div className="w-1/3">
                <TypeSelect
                  placeholder={"Tipe Audit"}
                  customIcon={
                    <ButtonIcon
                      icon={<IconClose />}
                      handleClick={() => handleResetSelected("ref_tipe")}
                    />
                  }
                  handleChange={(e) => handleChangeSelect("ref_tipe", e)}
                  selectedValue={selectedValue.ref_tipe}
                />
              </div>
              <div className="w-1/3">
                <TemaSelect
                  placeholder={"Tema Audit"}
                  customIcon={
                    <ButtonIcon
                      icon={<IconClose />}
                      handleClick={() => handleResetSelected("ref_tema")}
                    />
                  }
                  handleChange={(e) => handleChangeSelect("ref_tema", e)}
                  selectedValue={selectedValue.ref_tema}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    )
  );
};

export default CardFilterProjectOverview;

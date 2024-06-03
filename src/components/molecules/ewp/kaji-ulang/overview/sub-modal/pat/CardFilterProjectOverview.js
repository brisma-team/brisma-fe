import { ButtonIcon, Card, TextInput } from "@/components/atoms";
import { IconClose } from "@/components/icons";
import {
  CategorySelect,
  CustomSelect,
  MetodeSelect,
  TemaSelect,
  TypeSelect,
} from "@/components/molecules/commons";
import { useEffect } from "react";

const CardFilterProjectOverview = ({ showFilter, filter, setFilter }) => {
  const handleChangeText = (property, e) => {
    setFilter({ ...filter, [property]: e.target.value });
  };

  const handleChangeSelect = (property, e) => {
    setFilter({ ...filter, [property]: { kode: e.value, name: e.label } });
  };

  const handleReset = (property) => {
    setFilter({ ...filter, [property]: "" });
  };

  useEffect(() => {
    console.log("filter => ", filter);
  }, [filter]);
  return (
    showFilter && (
      <div className="rounded bg-white mt-4 w-fit">
        <Card>
          <div className="px-2">
            <div className="flex m-2 w-[39rem] gap-4">
              <div className="w-1/3">
                <TextInput
                  placeholder="Judul Jadwal"
                  icon={
                    <ButtonIcon
                      handleClick={() => handleReset("name")}
                      icon={<IconClose size="large" />}
                    />
                  }
                  onChange={(e) => handleChangeText("name", e)}
                  value={filter?.name}
                />
              </div>
              <div className="w-1/3">
                <MetodeSelect
                  placeholder={"Metode Audit"}
                  customIcon={
                    <ButtonIcon
                      icon={<IconClose />}
                      handleClick={() => handleReset("ref_metode")}
                    />
                  }
                  handleChange={(e) => handleChangeSelect("ref_metode", e)}
                  selectedValue={
                    filter?.ref_metode?.kode
                      ? {
                          label: filter?.ref_metode?.name,
                          value: filter?.ref_metode?.kode,
                        }
                      : null
                  }
                />
              </div>
              <div className="w-1/3">
                <CategorySelect
                  placeholder={"Jenis Audit"}
                  customIcon={
                    <ButtonIcon
                      icon={<IconClose />}
                      handleClick={() => handleReset("ref_jenis")}
                    />
                  }
                  handleChange={(e) => handleChangeSelect("ref_jenis", e)}
                  selectedValue={
                    filter?.ref_jenis?.kode
                      ? {
                          label: filter?.ref_jenis?.name,
                          value: filter?.ref_jenis?.kode,
                        }
                      : null
                  }
                />
              </div>
            </div>
            <div className="flex m-2 w-[39rem] gap-4">
              <div className="w-1/3">
                <CustomSelect
                  optionValue={[
                    {
                      label: "Sudah di-Audit",
                      value: true,
                    },
                    {
                      label: "Belum di-Audit",
                      value: false,
                    },
                  ]}
                  placeholder="Status Audit"
                  customIcon={
                    <ButtonIcon
                      icon={<IconClose />}
                      handleClick={() => handleReset("is_audited")}
                    />
                  }
                  handleChange={(e) => handleChangeSelect("is_audited", e)}
                  selectedValue={
                    filter?.is_audited
                      ? {
                          label: filter?.is_audited?.name,
                          value: filter?.is_audited?.kode,
                        }
                      : null
                  }
                />
              </div>
              <div className="w-1/3">
                <TypeSelect
                  placeholder={"Tipe Audit"}
                  customIcon={
                    <ButtonIcon
                      icon={<IconClose />}
                      handleClick={() => handleReset("ref_tipe")}
                    />
                  }
                  handleChange={(e) => handleChangeSelect("ref_tipe", e)}
                  selectedValue={
                    filter?.ref_tipe?.kode
                      ? {
                          label: filter?.ref_tipe?.name,
                          value: filter?.ref_tipe?.kode,
                        }
                      : null
                  }
                />
              </div>
              <div className="w-1/3">
                <TemaSelect
                  placeholder={"Tema Audit"}
                  customIcon={
                    <ButtonIcon
                      icon={<IconClose />}
                      handleClick={() => handleReset("ref_tema")}
                    />
                  }
                  handleChange={(e) => handleChangeSelect("ref_tema", e)}
                  selectedValue={
                    filter?.ref_tema?.kode
                      ? {
                          label: filter?.ref_tema?.name,
                          value: filter?.ref_tema?.kode,
                        }
                      : null
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

export default CardFilterProjectOverview;

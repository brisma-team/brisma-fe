import { useEffect } from "react";
import {
  FormWithLabel,
  RelatedEWPSelect,
} from "@/components/molecules/commons";
import {
  ButtonIcon,
  DatepickerStartEnd,
  Select,
  TextInput,
} from "@/components/atoms";
import { IconClose } from "@/components/icons";
import { useState } from "react";
import { useJenis, useMetode, useTema, useTipe } from "@/data/reference";
import { addDaysToDate, dateNow } from "@/helpers";

const ModalBodyScheduleNonPAT = ({
  data,
  setCurrentModalStage,
  isDisabled,
  handleChangeText,
  handleChangeSelect,
}) => {
  const [selectedMetode, setSelectedMetode] = useState(null);
  const [selectedTipe, setSelectedTipe] = useState(null);
  const [selectedJenis, setSelectedJenis] = useState(null);

  const { metode } = useMetode("all", 2);
  const { tipe } = useTipe("all", selectedMetode);
  const { jenis } = useJenis("all", selectedTipe);
  const { tema } = useTema("all", selectedJenis);

  const [optionMetode, setOptionMetode] = useState([]);
  const [optionTipe, setOptionTipe] = useState([]);
  const [optionJenis, setOptionJenis] = useState([]);
  const [optionTema, setOptionTema] = useState([]);

  useEffect(() => {
    const mappingMetode = metode?.data?.map((v) => ({
      label: v.nama,
      value: { kode: v.kode, nama: v.nama },
    }));
    setOptionMetode(mappingMetode);

    if (tipe) {
      const mappingTipe = tipe.data?.map((v) => ({
        label: v.nama,
        value: { kode: v.kode, nama: v.nama },
      }));
      setOptionTipe(mappingTipe);
    }

    if (jenis) {
      const mappingJenis = jenis.data?.map((v) => ({
        label: v.nama,
        value: { kode: v.kode, nama: v.nama },
      }));
      setOptionJenis(mappingJenis);
    }

    if (tema) {
      const mappingTema = tema.data?.map((v) => ({
        label: v.nama,
        value: { kode: v.kode, nama: v.nama },
      }));
      setOptionTema(mappingTema);
    }
  }, [metode, tipe, jenis, tema]);

  useEffect(() => {
    setCurrentModalStage(2);
  }, []);

  const handleChangeRef = (property, value) => {
    handleChangeSelect(property, value);
    switch (property) {
      case "ref_metode":
        setSelectedMetode(value.kode);
        break;
      case "ref_tipe":
        setSelectedTipe(value.kode);
        break;
      case "ref_jenis":
        setSelectedJenis(value.kode);
        break;
    }
  };

  return (
    <div className="w-[31rem] px-4 py-2">
      <TextInput
        icon={
          <ButtonIcon
            handleClick={() => handleChangeText("project_name", "")}
            icon={<IconClose size="medium" />}
          />
        }
        className={"font-bold text-xl rounded text-brisma"}
        style={{ fontSize: "1.25rem" }}
        onChange={(e) => handleChangeText("project_name", e.target.value)}
        value={data.project_name}
        placeholder={"Masukkan Nama Project"}
      />
      <div className="mt-2 p-4 rounded-xl shadow">
        <FormWithLabel
          form={
            <div className="w-36">
              <Select
                optionValue={optionMetode}
                isSearchable={false}
                onChange={(e) => handleChangeRef("ref_metode", e.value)}
                value={
                  data?.ref_metode?.nama
                    ? {
                        label: data?.ref_metode?.nama,
                        value: data?.ref_metode?.kode,
                      }
                    : null
                }
                isDisabled={isDisabled}
                placeholder="Metode Audit"
              />
            </div>
          }
          label="Metode Audit*"
          widthLabel={"w-3/12"}
          widthForm={"w-9/12"}
        />
        <FormWithLabel
          form={
            <div className="w-36">
              <Select
                optionValue={optionTipe}
                isSearchable={false}
                onChange={(e) => handleChangeRef("ref_tipe", e.value)}
                value={
                  data?.ref_tipe?.nama
                    ? {
                        label: data?.ref_tipe?.nama,
                        value: data?.ref_tipe?.kode,
                      }
                    : null
                }
                isDisabled={isDisabled}
                placeholder="Tipe Audit"
              />
            </div>
          }
          label="Tipe Audit*"
          widthLabel={"w-3/12"}
          widthForm={"w-9/12"}
        />
        <FormWithLabel
          form={
            <div className="w-36">
              <Select
                optionValue={optionJenis}
                isSearchable={false}
                onChange={(e) => handleChangeRef("ref_jenis", e.value)}
                value={
                  data.ref_jenis?.nama
                    ? {
                        label: data.ref_jenis?.nama,
                        value: data.ref_jenis?.kode,
                      }
                    : ""
                }
                isDisabled={isDisabled}
                placeholder="Jenis Audit"
              />
            </div>
          }
          label="Jenis Audit*"
          widthLabel={"w-3/12"}
          widthForm={"w-9/12"}
        />
        <FormWithLabel
          form={
            <div className="w-36">
              <Select
                optionValue={optionTema}
                isSearchable={false}
                onChange={(e) => handleChangeRef("ref_tema", e.value)}
                value={
                  data.ref_tema?.nama
                    ? {
                        label: data.ref_tema?.nama,
                        value: data.ref_tema?.kode,
                      }
                    : ""
                }
                isDisabled={isDisabled}
                placeholder="Tema Audit"
              />
            </div>
          }
          label="Tema Audit"
          widthLabel={"w-3/12"}
          widthForm={"w-9/12"}
        />
        <FormWithLabel
          form={
            <DatepickerStartEnd
              valueStart={data.info_periode_pelaksanaan_start}
              valueEnd={data.info_periode_pelaksanaan_end}
              handlerChangeStart={(e) =>
                handleChangeText("info_periode_pelaksanaan_start", e)
              }
              handlerChangeEnd={(e) =>
                handleChangeText("info_periode_pelaksanaan_end", e)
              }
              placeholderStart="Pilih Tanggal"
              placeholderEnd="Pilih Tanggal"
              isDisabled={isDisabled}
              format={"DD/MM/YYYY"}
              minDateStart={dateNow()}
              maxDateStart={
                addDaysToDate(data?.info_periode_pelaksanaan_end, "-", 1) ||
                null
              }
              minDateEnd={
                addDaysToDate(data?.info_periode_pelaksanaan_start, "+", 1) ||
                addDaysToDate(dateNow(), "+", 1) ||
                null
              }
            />
          }
          label="Periode Kegiatan*"
          widthLabel={"w-3/12"}
          widthForm={"w-9/12"}
        />
        <FormWithLabel
          form={
            <div className="w-36">
              <RelatedEWPSelect
                customIcon={
                  <ButtonIcon
                    handleClick={() => handleChangeText("project_name", "")}
                    icon={<IconClose size="medium" />}
                  />
                }
                handleChange={(e) => handleChangeSelect("ref_ewp_id", e.value)}
                placeholder={"EWP Terkait"}
                selectedValue={
                  data?.ref_ewp_id?.id
                    ? {
                        label: `${data?.ref_ewp_id?.project_id} - ${data?.ref_ewp_id?.project_name}`,
                      }
                    : null
                }
              />
            </div>
          }
          label="EWP Terkait"
          widthLabel={"w-3/12"}
          widthForm={"w-9/12"}
        />
      </div>
    </div>
  );
};

export default ModalBodyScheduleNonPAT;

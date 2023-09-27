import { useEffect } from "react";
import { FormWithLabel } from "@/components/molecules/commons";
import {
  ButtonIcon,
  DatepickerStartEnd,
  Select,
  TextInput,
} from "@/components/atoms";
import { useDispatch, useSelector } from "react-redux";
import { setProjectOverviewData } from "@/slices/ewp/projectOverviewEWPSlice";
import { IconClose } from "@/components/icons";
import { useState } from "react";
import { useJenis, useMetode, useTema, useTipe } from "@/data/reference";

const ModalBodyScheduleNonPAT = ({ setCurrentModalStage, isDisabled }) => {
  const dispatch = useDispatch();
  const projectOverviewData = useSelector(
    (state) => state.projectOverviewEWP.projectOverviewData
  );

  const [selectedMetode, setSelectedMetode] = useState(null);
  const [selectedTipe, setSelectedTipe] = useState(null);
  const [selectedJenis, setSelectedJenis] = useState(null);

  const { metode } = useMetode("all", 1);
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
    const updatedData = {
      ...projectOverviewData,
      [property]: { kode: value.kode, nama: value.nama },
    };
    dispatch(setProjectOverviewData(updatedData));
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

  const handleChange = (property, value) => {
    const updatedData = {
      ...projectOverviewData,
      [property]: value,
    };
    dispatch(setProjectOverviewData(updatedData));
  };

  useEffect(() => {
    console.log("projectOverviewData => ", projectOverviewData);
  }, [projectOverviewData]);

  return (
    <div className="w-[31rem] px-4 py-2">
      <TextInput
        icon={
          <ButtonIcon
            handleClick={() => handleChange("project_name", "")}
            icon={<IconClose size="medium" />}
          />
        }
        className={"font-bold text-xl rounded text-brisma"}
        style={{ fontSize: "1.25rem" }}
        onChange={(e) => handleChange("project_name", e.target.value)}
        value={projectOverviewData.project_name}
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
                  projectOverviewData.ref_metode?.nama !== "" && {
                    label: projectOverviewData.ref_metode?.nama,
                    value: projectOverviewData.ref_metode?.kode,
                  }
                }
                isDisabled={isDisabled}
                placeholder="Metode Audit"
              />
            </div>
          }
          label="Metode Audit"
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
                  projectOverviewData.ref_tipe?.nama !== "" && {
                    label: projectOverviewData.ref_tipe?.nama,
                    value: projectOverviewData.ref_tipe?.kode,
                  }
                }
                isDisabled={isDisabled}
                placeholder="Tipe Audit"
              />
            </div>
          }
          label="Tipe Audit"
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
                  projectOverviewData.ref_jenis?.nama !== "" && {
                    label: projectOverviewData.ref_jenis?.nama,
                    value: projectOverviewData.ref_jenis?.kode,
                  }
                }
                isDisabled={isDisabled}
                placeholder="Jenis Audit"
              />
            </div>
          }
          label="Jenis Audit"
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
                  projectOverviewData.ref_tema?.nama !== "" && {
                    label: projectOverviewData.ref_tema?.nama,
                    value: projectOverviewData.ref_tema?.kode,
                  }
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
              valueStart={projectOverviewData.info_periode_pelaksanaan_start}
              valueEnd={projectOverviewData.info_periode_pelaksanaan_end}
              handlerChangeStart={(e) =>
                handleChange("info_periode_pelaksanaan_start", e)
              }
              handlerChangeEnd={(e) =>
                handleChange("info_periode_pelaksanaan_end", e)
              }
              placeholderStart="Pilih Tanggal"
              placeholderEnd="Pilih Tanggal"
              isDisabled={isDisabled}
              pastDate={true}
            />
          }
          label="Periode Kegiatan"
          widthLabel={"w-3/12"}
          widthForm={"w-9/12"}
        />
      </div>
    </div>
  );
};

export default ModalBodyScheduleNonPAT;

import {
  Card,
  DatepickerStartEnd,
  Select,
  TextInput,
} from "@/components/atoms";
import { useMetode, useTipe } from "@/data/reference";
import { useState } from "react";
import { useEffect } from "react";

const CardFilterActivitySchedule = ({ showFilter, params, setParams }) => {
  const { metode } = useMetode("list");
  const { tipe } = useTipe("list");
  const [optionMetode, setOptionMetode] = useState([]);
  const [optionTipe, setOptionTipe] = useState([]);

  useEffect(() => {
    const arrMetode = metode?.data?.map((v) => {
      return { label: v.nama, value: v.kode };
    });
    const arrTipe = tipe?.data?.map((v) => {
      return { label: v.nama, value: v.kode };
    });
    setOptionMetode(arrMetode);
    setOptionTipe(arrTipe);
  }, [metode, tipe]);

  const handleChange = (property, value) => {
    const updatedData = {
      ...params,
      [property]: value,
    };
    setParams(updatedData);
  };

  const findMetode = (kode) => {
    const find = metode?.data?.find((v) => v.id == kode);
    return { label: find?.nama, value: find?.kode };
  };

  const findTipe = (kode) => {
    const find = tipe?.data?.find((v) => v.id == kode);
    return { label: find?.nama, value: find?.kode };
  };

  return (
    showFilter && (
      <Card>
        <div className="flex flex-wrap m-2 gap-3 px-2">
          <div className="w-48">
            <TextInput
              placeholder="Nama Proyek"
              onChange={(e) => handleChange("project_name", e.target.value)}
              value={params.project_name}
            />
          </div>
          <div className="w-48">
            <Select
              optionValue={optionMetode}
              isSearchable={false}
              placeholder={"Metode Audit"}
              onChange={(e) => handleChange("metode", e.value)}
              value={params.metode !== "" ? findMetode(params.metode) : ""}
            />
          </div>
          <div className="w-48">
            <DatepickerStartEnd
              placeholderStart={"Start"}
              placeholderEnd={"End"}
              handlerChangeStart={(e) => handleChange("start", e)}
              handlerChangeEnd={(e) => handleChange("end", e)}
              valueStart={params.start}
              valueEnd={params.end}
            />
          </div>
          <div className="w-48">
            <Select
              optionValue={optionTipe}
              isSearchable={false}
              placeholder={"Tipe Audit"}
              onChange={(e) => handleChange("tipe", e.value)}
              value={params.tipe !== "" ? findTipe(params.tipe) : ""}
            />
          </div>
        </div>
      </Card>
    )
  );
};

export default CardFilterActivitySchedule;

import { useEffect } from "react";
import {
  DatepickerStartEnd,
  ReactSelect,
  TextAreaField,
  TextInput,
} from "@/components/atoms";
import { IconClose } from "@/components/icons";
import { CardFormInputTeam } from "@/components/molecules/pat";
import { CardBodyContent, FormWithLabel } from "@/components/molecules/commons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useJenis, useMetode, useTema, useTipe } from "@/data/reference";
import { setActivityScheduleOtherData } from "@/slices/pat/activityScheduleOtherSlice";
import { convertDate, parseDate } from "@/helpers";

const ModalBodyActivityInfo = ({ setCurrentModalStage, typeModal }) => {
  const { control } = useForm();
  const dispatch = useDispatch();
  const activityScheduleOtherData = useSelector(
    (state) => state.activityScheduleOther.activityScheduleOtherData
  );
  const [selectedMetode, setSelectedMetode] = useState(null);
  const [selectedTipe, setSelectedTipe] = useState(null);
  const [selectedJenis, setSelectedJenis] = useState(null);

  const { metode } = useMetode(1);
  const { tipe } = useTipe(selectedMetode);
  const { jenis } = useJenis(selectedTipe);
  const { tema } = useTema(selectedJenis);

  const [optionMetode, setOptionMetode] = useState([]);
  const [optionTipe, setOptionTipe] = useState([]);
  const [optionJenis, setOptionJenis] = useState([]);
  const [optionTema, setOptionTema] = useState([]);

  useEffect(() => {
    setCurrentModalStage(1);
  }, []);

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

  const handleChangeRef = (property, value) => {
    const updatedData = {
      ...activityScheduleOtherData,
      [property]: { kode: value.kode, nama: value.nama },
    };
    dispatch(setActivityScheduleOtherData(updatedData));
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

  const handleAddPIC = () => {
    const newData = [...activityScheduleOtherData.penanggung_jawab];
    newData.push({
      pn: "",
      nama: "",
      jabatan: "",
    });
    dispatch(
      setActivityScheduleOtherData({
        ...activityScheduleOtherData,
        penanggung_jawab: newData,
      })
    );
  };

  const handleChange = (props, value) => {
    const updatedData = {
      ...activityScheduleOtherData,
      [props]: value,
    };
    dispatch(setActivityScheduleOtherData(updatedData));
  };

  const handleChangePeriodActivity = (property, value) => {
    const updatedData = {
      ...activityScheduleOtherData,
      [property]: value !== "" ? parseDate(value, "/") : "",
    };
    dispatch(setActivityScheduleOtherData(updatedData));
  };

  const handleChangePIC = (idx, e) => {
    const picData = [...activityScheduleOtherData.penanggung_jawab];
    const updatedPIC = { ...picData[idx] };
    updatedPIC["pn"] = e.value.pn;
    updatedPIC["nama"] = e.value.name;
    updatedPIC["jabatan"] = e.value.jabatan;
    picData[idx] = updatedPIC;
    const updatedData = {
      ...activityScheduleOtherData,
      penanggung_jawab: picData,
    };
    dispatch(setActivityScheduleOtherData(updatedData));
  };

  useEffect(() => {
    console.log("activityScheduleData => ", activityScheduleOtherData);
  }, [activityScheduleOtherData]);

  return (
    <div className="w-[50rem]">
      <div className="w-1/2 pr-1">
        <TextInput
          icon={<IconClose size="medium" />}
          className={"font-bold text-5xl rounded text-brisma"}
          style={{ fontSize: "1.25rem" }}
          onChange={(e) => handleChange("nama", e.target.value)}
          value={activityScheduleOtherData.nama}
          placeholder="Masukan Judul Jadwal Kegiatan Lain"
        />
      </div>
      <div className="flex gap-3 justify-between my-3">
        <div className="w-1/2">
          <CardBodyContent>
            <FormWithLabel
              label={"Metode Kegiatan"}
              form={
                <ReactSelect
                  options={optionMetode}
                  control={control}
                  isSearchable={false}
                  handleChange={(e) => handleChangeRef("ref_metode", e.value)}
                  value={
                    activityScheduleOtherData?.ref_metode?.nama !== "" && {
                      label: activityScheduleOtherData?.ref_metode?.nama,
                      value: activityScheduleOtherData?.ref_metode?.kode,
                    }
                  }
                />
              }
            />
            <FormWithLabel
              label={"Tipe Kegiatan"}
              form={
                <ReactSelect
                  options={optionTipe}
                  control={control}
                  isSearchable={false}
                  handleChange={(e) => handleChangeRef("ref_tipe", e.value)}
                  value={
                    activityScheduleOtherData.ref_tipe?.nama !== "" && {
                      label: activityScheduleOtherData.ref_tipe?.nama,
                      value: activityScheduleOtherData.ref_tipe?.kode,
                    }
                  }
                />
              }
            />
            <FormWithLabel
              label={"Jenis Kegiatan"}
              form={
                <ReactSelect
                  options={optionJenis}
                  control={control}
                  isSearchable={false}
                  handleChange={(e) => handleChangeRef("ref_jenis", e.value)}
                  value={
                    activityScheduleOtherData.ref_jenis?.nama !== "" && {
                      label: activityScheduleOtherData.ref_jenis?.nama,
                      value: activityScheduleOtherData.ref_jenis?.kode,
                    }
                  }
                />
              }
            />
            <FormWithLabel
              label={"Tema Kegiatan"}
              form={
                <ReactSelect
                  options={optionTema}
                  control={control}
                  isSearchable={false}
                  handleChange={(e) => handleChangeRef("ref_tema", e.value)}
                  value={
                    activityScheduleOtherData.ref_tema?.nama !== "" && {
                      label: activityScheduleOtherData.ref_tema?.nama,
                      value: activityScheduleOtherData.ref_tema?.kode,
                    }
                  }
                />
              }
            />
            <FormWithLabel
              label={"Periode Kegiatan"}
              form={
                <DatepickerStartEnd
                  placeholderStart={"Mulai"}
                  placeholderEnd={"Akhir"}
                  handlerChangeStart={(e) =>
                    handleChangePeriodActivity("pelaksanaan_start", e)
                  }
                  handlerChangeEnd={(e) =>
                    handleChangePeriodActivity("pelaksanaan_end", e)
                  }
                  valueStart={
                    activityScheduleOtherData.pelaksanaan_start !== ""
                      ? convertDate(
                          activityScheduleOtherData?.pelaksanaan_start,
                          "-"
                        )
                      : ""
                  }
                  valueEnd={
                    activityScheduleOtherData.pelaksanaan_end !== ""
                      ? convertDate(
                          activityScheduleOtherData?.pelaksanaan_end,
                          "-"
                        )
                      : ""
                  }
                  format={"YYYY/MM/DD"}
                />
              }
              widthFull={true}
            />
            <FormWithLabel
              label={"Deskripsi Kegiatan"}
              form={
                <TextAreaField
                  maxHeight={"5rem"}
                  handleChange={(e) =>
                    handleChange("deskripsi", e.target.value)
                  }
                  value={activityScheduleOtherData.deskripsi}
                />
              }
              labelPositionTop={true}
              widthFull={true}
            />
          </CardBodyContent>
        </div>
        <div className="w-1/2">
          <CardFormInputTeam
            type={"P.I.C"}
            data={activityScheduleOtherData.penanggung_jawab}
            handlerChangeParent={handleChangePIC}
            handlerAddParent={handleAddPIC}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalBodyActivityInfo;

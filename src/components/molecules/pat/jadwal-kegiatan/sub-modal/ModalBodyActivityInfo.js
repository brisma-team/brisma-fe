import { useEffect, useState } from "react";
import {
  DatepickerStartEnd,
  ReactSelect,
  TextAreaField,
  TextInput,
} from "@/components/atoms";
import { IconClose } from "@/components/icons";
import { CardFormInputTeam } from "@/components/molecules/pat";
import { CardBodyContent, FormWithLabel } from "@/components/molecules/commons";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useJenis, useMetode, useTema, useTipe } from "@/data/reference";
import { setActivityScheduleData } from "@/slices/pat/activityScheduleSlice";
import { convertDate, parseDate } from "@/helpers";

const ModalBodyActivityInfo = ({ setCurrentModalStage, typeModal }) => {
  const { control } = useForm();
  const dispatch = useDispatch();
  const activityScheduleData = useSelector(
    (state) => state.activitySchedule.activityScheduleData
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
      ...activityScheduleData,
      [property]: { kode: value.kode, nama: value.nama },
    };
    dispatch(setActivityScheduleData(updatedData));
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
    const newData = [...activityScheduleData.penanggung_jawab];
    newData.push({
      pn: "",
      nama: "",
      jabatan: "",
    });
    dispatch(
      setActivityScheduleData({
        ...activityScheduleData,
        penanggung_jawab: newData,
      })
    );
  };

  const handleChange = (props, value) => {
    const updatedData = {
      ...activityScheduleData,
      [props]: value,
    };
    dispatch(setActivityScheduleData(updatedData));
  };

  const handleChangePeriodActivity = (property, value) => {
    const updatedData = {
      ...activityScheduleData,
      [property]: value !== "" ? parseDate(value, "/") : "",
    };
    dispatch(setActivityScheduleData(updatedData));
  };

  const handleChangePIC = (idx, e) => {
    const picData = [...activityScheduleData.penanggung_jawab];
    const updatedPIC = { ...picData[idx] };
    updatedPIC["pn"] = e.value.pn;
    updatedPIC["nama"] = e.value.name;
    updatedPIC["jabatan"] = e.value.jabatan;
    picData[idx] = updatedPIC;
    const updatedData = {
      ...activityScheduleData,
      penanggung_jawab: picData,
    };
    dispatch(setActivityScheduleData(updatedData));
  };

  useEffect(() => {
    console.log("activityScheduleData => ", activityScheduleData);
  }, [activityScheduleData]);

  return (
    <div className="w-[50rem]">
      <div className="w-1/2 pr-1">
        <TextInput
          icon={<IconClose size="medium" />}
          className={"font-bold text-5xl rounded text-brisma"}
          style={{ fontSize: "1.25rem" }}
          onChange={(e) => handleChange("nama", e.target.value)}
          value={activityScheduleData.nama}
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
                    activityScheduleData?.ref_metode?.nama !== "" && {
                      label: activityScheduleData?.ref_metode?.nama,
                      value: activityScheduleData?.ref_metode?.kode,
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
                    activityScheduleData.ref_tipe?.nama !== "" && {
                      label: activityScheduleData.ref_tipe?.nama,
                      value: activityScheduleData.ref_tipe?.kode,
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
                    activityScheduleData.ref_jenis?.nama !== "" && {
                      label: activityScheduleData.ref_jenis?.nama,
                      value: activityScheduleData.ref_jenis?.kode,
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
                    activityScheduleData.ref_tema?.nama !== "" && {
                      label: activityScheduleData.ref_tema?.nama,
                      value: activityScheduleData.ref_tema?.kode,
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
                    activityScheduleData.pelaksanaan_start !== ""
                      ? convertDate(
                          activityScheduleData?.pelaksanaan_start,
                          "-"
                        )
                      : ""
                  }
                  valueEnd={
                    activityScheduleData.pelaksanaan_end !== ""
                      ? convertDate(activityScheduleData?.pelaksanaan_end, "-")
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
                  value={activityScheduleData.deskripsi}
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
            data={activityScheduleData.penanggung_jawab}
            handlerChangeParent={handleChangePIC}
            handlerAddParent={handleAddPIC}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalBodyActivityInfo;

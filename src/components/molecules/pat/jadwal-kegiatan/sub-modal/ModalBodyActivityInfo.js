import { useEffect, useState } from "react";
import {
  ButtonIcon,
  DatepickerStartEnd,
  ErrorValidation,
  Select,
  TextAreaField,
  TextInput,
} from "@/components/atoms";
import { IconClose } from "@/components/icons";
import { CardFormInputTeam, ModalFooter } from "@/components/molecules/pat";
import { CardBodyContent, FormWithLabel } from "@/components/molecules/commons";
import { useDispatch, useSelector } from "react-redux";
import { useJenis, useMetode, useTema, useTipe } from "@/data/reference";
import { setActivityScheduleData } from "@/slices/pat/activityScheduleSlice";
import { addDaysToDate, dateNow } from "@/helpers";

const ModalBodyActivityInfo = ({
  setCurrentModalStage,
  isDisabled,
  currentModalStage,
  handleSubmit,
  handleNextStage,
  isDisabledButtonSave,
}) => {
  const dispatch = useDispatch();
  const activityScheduleData = useSelector(
    (state) => state.activitySchedule.activityScheduleData
  );
  const validationErrors = useSelector(
    (state) => state.activitySchedule.validationErrorsAI
  );

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

  const handleAdd = (property) => {
    const newData = [...activityScheduleData[property]];
    newData.push({ pn: "", nama: "", jabatan: "" });
    dispatch(
      setActivityScheduleData({ ...activityScheduleData, [property]: newData })
    );
  };

  const handleDelete = (property, idx) => {
    const newData = [...activityScheduleData[property]];
    newData.splice(idx, 1);
    dispatch(
      setActivityScheduleData({
        ...activityScheduleData,
        [property]: newData,
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
      [property]: value,
    };
    dispatch(setActivityScheduleData(updatedData));
  };

  const handleChangePIC = (property, index, e) => {
    const newData = [...activityScheduleData[property]];
    const updated = {
      ...newData[index],
      pn: e?.value?.pn,
      nama: e?.value?.name,
      jabatan: e?.value?.jabatan,
    };
    newData[index] = updated;
    dispatch(
      setActivityScheduleData({
        ...activityScheduleData,
        [property]: newData,
      })
    );
  };

  return (
    <div className="w-[63rem]">
      <div className="p-4 border-2 rounded-md shadow">
        <div className="w-full rounded-xl">
          <TextInput
            icon={
              <ButtonIcon
                handleClick={() => handleChange("nama", "")}
                icon={<IconClose size="large" />}
                className="h-full flex items-center"
              />
            }
            className={"font-medium text-3xl rounded text-brisma"}
            style={{ fontSize: "1.25rem" }}
            onChange={(e) => handleChange("nama", e.target.value)}
            value={activityScheduleData.nama}
            isDisabled={isDisabled}
            placeholder={"Masukkan Judul Jadwal Kegiatan"}
          />
          {validationErrors["nama"] && (
            <div className="mt-2">
              <ErrorValidation message={validationErrors["nama"]} />
            </div>
          )}
        </div>
        <div className="flex gap-3 justify-between my-3">
          <div className="w-1/2 h-fit">
            <CardBodyContent>
              <FormWithLabel
                label={"Metode Kegiatan"}
                form={
                  <Select
                    optionValue={optionMetode}
                    isSearchable={false}
                    onChange={(e) => handleChangeRef("ref_metode", e.value)}
                    value={
                      activityScheduleData.ref_metode?.nama !== "" && {
                        label: activityScheduleData.ref_metode?.nama,
                        value: activityScheduleData.ref_metode?.kode,
                      }
                    }
                    isDisabled={isDisabled}
                  />
                }
                errors={validationErrors["ref_metode.kode"]}
                widthLabel={"w-2/5"}
                widthForm={"w-3/5"}
              />
              <FormWithLabel
                label={"Tipe Kegiatan"}
                form={
                  <Select
                    optionValue={optionTipe}
                    isSearchable={false}
                    onChange={(e) => handleChangeRef("ref_tipe", e.value)}
                    value={
                      activityScheduleData.ref_tipe?.nama !== "" && {
                        label: activityScheduleData.ref_tipe?.nama,
                        value: activityScheduleData.ref_tipe?.kode,
                      }
                    }
                    isDisabled={isDisabled}
                  />
                }
                errors={validationErrors["ref_tipe.kode"]}
                widthLabel={"w-2/5"}
                widthForm={"w-3/5"}
              />
              <FormWithLabel
                label={"Jenis Kegiatan"}
                form={
                  <Select
                    optionValue={optionJenis}
                    isSearchable={false}
                    onChange={(e) => handleChangeRef("ref_jenis", e.value)}
                    value={
                      activityScheduleData.ref_jenis?.nama !== "" && {
                        label: activityScheduleData.ref_jenis?.nama,
                        value: activityScheduleData.ref_jenis?.kode,
                      }
                    }
                    isDisabled={isDisabled}
                  />
                }
                errors={validationErrors["ref_jenis.kode"]}
                widthLabel={"w-2/5"}
                widthForm={"w-3/5"}
              />
              <FormWithLabel
                label={"Tema Kegiatan"}
                form={
                  <Select
                    optionValue={optionTema}
                    isSearchable={false}
                    onChange={(e) => handleChangeRef("ref_tema", e.value)}
                    value={
                      activityScheduleData.ref_tema?.nama !== "" && {
                        label: activityScheduleData.ref_tema?.nama,
                        value: activityScheduleData.ref_tema?.kode,
                      }
                    }
                    isDisabled={isDisabled}
                  />
                }
                widthLabel={"w-2/5"}
                widthForm={"w-3/5"}
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
                    valueStart={activityScheduleData.pelaksanaan_start}
                    valueEnd={activityScheduleData.pelaksanaan_end}
                    isDisabled={isDisabled}
                    format={"DD/MM/YYYY"}
                    minDateStart={dateNow()}
                    maxDateStart={
                      addDaysToDate(
                        activityScheduleData?.pelaksanaan_end,
                        "-",
                        1
                      ) || null
                    }
                    minDateEnd={
                      addDaysToDate(
                        activityScheduleData?.pelaksanaan_start,
                        "+",
                        1
                      ) ||
                      addDaysToDate(dateNow(), "+", 1) ||
                      null
                    }
                  />
                }
                widthLabel={"w-2/5"}
                widthForm={"w-3/5"}
                errors={validationErrors["pelaksanaan_start"]}
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
                    isDisabled={isDisabled}
                  />
                }
                labelPositionTop={true}
                widthLabel={"w-2/5"}
                widthForm={"w-3/5"}
              />
            </CardBodyContent>
          </div>
          <div className="w-1/2 h-fit">
            <CardFormInputTeam
              type={"P.I.C"}
              data={activityScheduleData.penanggung_jawab}
              handlerChangeParent={handleChangePIC}
              handlerAddParent={handleAdd}
              handlerDeleteParent={handleDelete}
              property={"penanggung_jawab"}
              validationErrors={validationErrors}
            />
          </div>
        </div>
      </div>
      <div className="mt-3">
        <ModalFooter
          isDisabled={isDisabledButtonSave}
          currentModalStage={currentModalStage}
          handleSubmit={handleSubmit}
          handleNextStage={handleNextStage}
        />
      </div>
    </div>
  );
};

export default ModalBodyActivityInfo;

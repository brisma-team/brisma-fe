import { useEffect } from "react";
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
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useJenis, useMetode, useTema, useTipe } from "@/data/reference";
import { setActivityScheduleOtherData } from "@/slices/pat/activityScheduleOtherSlice";
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
  const activityScheduleOtherData = useSelector(
    (state) => state.activityScheduleOther.activityScheduleOtherData
  );
  const validationErrors = useSelector(
    (state) => state.activityScheduleOther.validationErrorsAI
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

  const handleAdd = (property) => {
    const newData = [...activityScheduleOtherData[property]];
    newData.push({ pn: "", nama: "", jabatan: "" });
    dispatch(
      setActivityScheduleOtherData({
        ...activityScheduleOtherData,
        [property]: newData,
      })
    );
  };

  const handleDelete = (property, idx) => {
    const newData = { ...activityScheduleOtherData };
    if (newData[property].length > 1) {
      const newData = [...activityScheduleOtherData[property]];
      newData.splice(idx, 1);
      dispatch(
        setActivityScheduleOtherData({
          ...activityScheduleOtherData,
          [property]: newData,
        })
      );
    }
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
      [property]: value,
    };
    dispatch(setActivityScheduleOtherData(updatedData));
  };

  const handleChangePIC = (property, index, e) => {
    const newData = [...activityScheduleOtherData[property]];
    const updated = {
      ...newData[index],
      pn: e?.value?.pn,
      nama: e?.value?.name,
      jabatan: e?.value?.jabatan,
    };
    newData[index] = updated;
    dispatch(
      setActivityScheduleOtherData({
        ...activityScheduleOtherData,
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
            value={activityScheduleOtherData.nama}
            isDisabled={isDisabled}
            placeholder={"Masukkan Judul Jadwal Kegiatan Lain"}
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
                      activityScheduleOtherData.ref_metode?.nama !== "" && {
                        label: activityScheduleOtherData.ref_metode?.nama,
                        value: activityScheduleOtherData.ref_metode?.kode,
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
                      activityScheduleOtherData.ref_tipe?.nama !== "" && {
                        label: activityScheduleOtherData.ref_tipe?.nama,
                        value: activityScheduleOtherData.ref_tipe?.kode,
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
                      activityScheduleOtherData.ref_jenis?.nama !== "" && {
                        label: activityScheduleOtherData.ref_jenis?.nama,
                        value: activityScheduleOtherData.ref_jenis?.kode,
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
                      activityScheduleOtherData.ref_tema?.nama !== "" && {
                        label: activityScheduleOtherData.ref_tema?.nama,
                        value: activityScheduleOtherData.ref_tema?.kode,
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
                    valueStart={activityScheduleOtherData.pelaksanaan_start}
                    valueEnd={activityScheduleOtherData.pelaksanaan_end}
                    isDisabled={isDisabled}
                    format={"DD/MM/YYYY"}
                    minDateStart={dateNow()}
                    maxDateStart={
                      addDaysToDate(
                        activityScheduleOtherData?.pelaksanaan_end,
                        "-",
                        1
                      ) || null
                    }
                    minDateEnd={
                      addDaysToDate(
                        activityScheduleOtherData?.pelaksanaan_start,
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
                    value={activityScheduleOtherData.deskripsi}
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
              data={activityScheduleOtherData.penanggung_jawab}
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

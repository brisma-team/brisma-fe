import { useEffect, useState } from "react";
import {
  ButtonIcon,
  DatepickerStartEnd,
  ReactSelect,
  TextAreaField,
  TextInput,
} from "@/components/atoms";
import { IconClose } from "@/components/icons";
import { CardBodyContent, FormWithLabel } from "@/components/molecules/commons";
import { useForm } from "react-hook-form";
import { useMetode, useTipe, useJenis, useTema } from "@/data/reference";
import { useAuditTeam } from "@/data/pat";
import { useDispatch, useSelector } from "react-redux";
import {
  setAuditScheduleData,
  setAuditTeamData,
} from "@/slices/pat/auditScheduleSlice";
import { useRouter } from "next/router";
import CardAuditTeam from "../../CardAuditTeam";

const ModalBodyInfoKegiatan = ({ setCurrentModalStage, typeModal }) => {
  const { control } = useForm();
  const { id } = useRouter().query;
  const dispatch = useDispatch();
  const auditScheduleData = useSelector(
    (state) => state.auditSchedule.auditScheduleData
  );

  const [isDisabled, setIsDisabled] = useState(false);
  const [selectedMetode, setSelectedMetode] = useState(null);
  const [selectedTipe, setSelectedTipe] = useState(null);
  const [selectedJenis, setSelectedJenis] = useState(null);

  const { metode } = useMetode("all", 1);
  const { tipe } = useTipe("all", selectedMetode);
  const { jenis } = useJenis(selectedTipe);
  const { tema } = useTema(selectedJenis);
  const { auditTeam } = useAuditTeam("list", { id });
  const auditTeamDetail = useAuditTeam("detail", {
    tim_id: auditScheduleData.tim_audit_id,
    id,
  });

  const [optionMetode, setOptionMetode] = useState([]);
  const [optionTipe, setOptionTipe] = useState([]);
  const [optionJenis, setOptionJenis] = useState([]);
  const [optionTema, setOptionTema] = useState([]);
  const [optionAuditTeam, setOptionAuditTeam] = useState([]);

  useEffect(() => {
    setCurrentModalStage(1);
    if (typeModal === "detail") {
      setIsDisabled(true);
    }
  }, []);

  useEffect(() => {
    const mappingAuditTeam = auditTeam?.data?.map((v) => ({
      label: v.name,
      value: v.id,
    }));
    setOptionAuditTeam(mappingAuditTeam);
  }, [auditTeam]);

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
      ...auditScheduleData,
      [property]: { kode: value.kode, nama: value.nama },
    };
    dispatch(setAuditScheduleData(updatedData));
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

  const handleChangePeriodActivity = (property, value) => {
    const updatedData = {
      ...auditScheduleData,
      [property]: value,
    };
    dispatch(setAuditScheduleData(updatedData));
  };

  const handleChangeAuditTeam = (e) => {
    const updatedData = {
      ...auditScheduleData,
      tim_audit_id: e.value,
    };
    dispatch(setAuditScheduleData(updatedData));
    auditTeamDetail.auditTeamMutate;
  };

  const handleChange = (props, value) => {
    const updatedData = {
      ...auditScheduleData,
      [props]: value,
    };
    dispatch(setAuditScheduleData(updatedData));
  };

  useEffect(() => {
    const mappedMA = auditTeamDetail.auditTeam?.data?.ref_tim_audit_mas?.map(
      (v) => {
        return { pn: v?.pn_ma, nama: v?.nama_ma, jabatan: v?.jabatan };
      }
    );
    const mappedKTA = auditTeamDetail.auditTeam?.data?.ref_tim_audit_kta?.map(
      (v) => {
        return { pn: v?.pn_kta, nama: v?.nama_kta, jabatan: v?.jabatan };
      }
    );
    const mappedATA = auditTeamDetail.auditTeam?.data?.ref_tim_audit_ata?.map(
      (v) => {
        return { pn: v?.pn_ata, nama: v?.nama_ata, jabatan: v?.jabatan };
      }
    );

    if (
      mappedMA !== undefined &&
      mappedKTA !== undefined &&
      mappedATA !== undefined
    ) {
      dispatch(setAuditTeamData([...mappedMA, ...mappedKTA, ...mappedATA]));
    }
  }, [auditTeamDetail.auditTeam]);

  const findAuditTeam = (id) => {
    const find = auditTeam?.data?.find((v) => v.id == id);
    return { label: find?.name, value: find?.id };
  };

  return (
    <div className="w-[60rem]">
      <div className="w-1/2 pr-1">
        <TextInput
          icon={
            <ButtonIcon
              handleClick={() => handleChange("name_kegiatan_audit", "")}
              icon={<IconClose size="medium" />}
            />
          }
          className={"font-bold text-5xl rounded text-brisma"}
          style={{ fontSize: "1.25rem" }}
          onChange={(e) => handleChange("name_kegiatan_audit", e.target.value)}
          value={auditScheduleData.name_kegiatan_audit}
          isDisabled={isDisabled}
        />
      </div>
      <div className="flex gap-3 justify-between my-3">
        <div className="w-1/2">
          <CardBodyContent>
            <FormWithLabel
              label={"Metode Audit"}
              form={
                <ReactSelect
                  options={optionMetode}
                  control={control}
                  isSearchable={false}
                  handleChange={(e) => handleChangeRef("ref_metode", e.value)}
                  value={
                    auditScheduleData?.ref_metode?.nama !== "" && {
                      label: auditScheduleData?.ref_metode?.nama,
                      value: auditScheduleData?.ref_metode?.kode,
                    }
                  }
                  isDisabled={isDisabled}
                />
              }
            />
            <FormWithLabel
              label={"Tipe Audit"}
              form={
                <ReactSelect
                  options={optionTipe}
                  control={control}
                  isSearchable={false}
                  handleChange={(e) => handleChangeRef("ref_tipe", e.value)}
                  value={
                    auditScheduleData.ref_tipe?.nama !== "" && {
                      label: auditScheduleData.ref_tipe?.nama,
                      value: auditScheduleData.ref_tipe?.kode,
                    }
                  }
                  isDisabled={isDisabled}
                />
              }
            />
            <FormWithLabel
              label={"Jenis Audit"}
              form={
                <ReactSelect
                  options={optionJenis}
                  control={control}
                  isSearchable={false}
                  handleChange={(e) => handleChangeRef("ref_jenis", e.value)}
                  value={
                    auditScheduleData.ref_jenis?.nama !== "" && {
                      label: auditScheduleData.ref_jenis?.nama,
                      value: auditScheduleData.ref_jenis?.kode,
                    }
                  }
                  isDisabled={isDisabled}
                />
              }
            />
            <FormWithLabel
              label={"Tema Audit"}
              form={
                <ReactSelect
                  options={optionTema}
                  control={control}
                  isSearchable={false}
                  handleChange={(e) => handleChangeRef("ref_tema", e.value)}
                  value={
                    auditScheduleData.ref_tema?.nama !== "" && {
                      label: auditScheduleData.ref_tema?.nama,
                      value: auditScheduleData.ref_tema?.kode,
                    }
                  }
                  isDisabled={isDisabled}
                />
              }
            />
            <FormWithLabel
              label={"Deskripsi Kegiatan"}
              form={
                <TextAreaField
                  maxHeight={"5rem"}
                  handleChange={(e) =>
                    handleChange("deskripsi", e.target.value)
                  }
                  value={auditScheduleData.deskripsi}
                  isDisabled={isDisabled}
                />
              }
              labelPositionTop={true}
              widthFull={true}
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
                  valueStart={auditScheduleData.pelaksanaan_start}
                  valueEnd={auditScheduleData.pelaksanaan_end}
                  isDisabled={isDisabled}
                />
              }
              widthFull={true}
            />
            <FormWithLabel
              label={"Tim Audit"}
              form={
                <ReactSelect
                  control={control}
                  options={optionAuditTeam}
                  handleChange={handleChangeAuditTeam}
                  value={
                    auditScheduleData.tim_audit_id !== ""
                      ? findAuditTeam(auditScheduleData.tim_audit_id)
                      : ""
                  }
                  isDisabled={isDisabled}
                />
              }
            />
          </CardBodyContent>
        </div>
        <div className="w-1/2">
          <CardAuditTeam
            header_title={auditTeamDetail.auditTeam?.data?.name}
            maker={auditTeamDetail.auditTeam?.data?.pic_maker_tim_audit?.nama}
            created_at={"23-06-2023"}
            manajer_audit={auditTeamDetail.auditTeam?.data?.ref_tim_audit_mas}
            ketua_tim_audit={auditTeamDetail.auditTeam?.data?.ref_tim_audit_kta}
            anggota_tim_audit={
              auditTeamDetail.auditTeam?.data?.ref_tim_audit_ata
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ModalBodyInfoKegiatan;

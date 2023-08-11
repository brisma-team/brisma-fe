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
import {
  AuditTeamSelect,
  CardBodyContent,
  FormWithLabel,
} from "@/components/molecules/commons";
import { useMetode, useTipe, useJenis, useTema } from "@/data/reference";
import { useAuditTeam } from "@/data/pat";
import { useDispatch, useSelector } from "react-redux";
import {
  setAuditScheduleData,
  setAuditTeamData,
} from "@/slices/pat/auditScheduleSlice";
import { useRouter } from "next/router";
import CardAuditTeam from "../../CardAuditTeam";
import { convertDate } from "@/helpers";

const ModalBodyInfoKegiatan = ({ setCurrentModalStage, isDisabled }) => {
  const { id } = useRouter().query;
  const dispatch = useDispatch();
  const auditScheduleData = useSelector(
    (state) => state.auditSchedule.auditScheduleData
  );
  const validationErrors = useSelector(
    (state) => state.auditSchedule.validationErrorsAI
  );

  const [selectedMetode, setSelectedMetode] = useState(null);
  const [selectedTipe, setSelectedTipe] = useState(null);
  const [selectedJenis, setSelectedJenis] = useState(null);

  const { metode } = useMetode("all", 1);
  const { tipe } = useTipe("all", selectedMetode);
  const { jenis } = useJenis("all", selectedTipe);
  const { tema } = useTema("all", selectedJenis);
  const { auditTeam, auditTeamMutate } = useAuditTeam("detail", {
    tim_id: auditScheduleData.tim_audit_id,
    id,
  });

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
    auditTeamMutate;
  };

  const handleChange = (props, value) => {
    const updatedData = {
      ...auditScheduleData,
      [props]: value,
    };
    dispatch(setAuditScheduleData(updatedData));
  };

  useEffect(() => {
    const mappedMA = auditTeam?.data?.ref_tim_audit_mas?.map((v) => {
      return { pn: v?.pn_ma, nama: v?.nama_ma, jabatan: v?.jabatan };
    });
    const mappedKTA = auditTeam?.data?.ref_tim_audit_kta?.map((v) => {
      return { pn: v?.pn_kta, nama: v?.nama_kta, jabatan: v?.jabatan };
    });
    const mappedATA = auditTeam?.data?.ref_tim_audit_ata?.map((v) => {
      return { pn: v?.pn_ata, nama: v?.nama_ata, jabatan: v?.jabatan };
    });

    if (
      mappedMA !== undefined &&
      mappedKTA !== undefined &&
      mappedATA !== undefined
    ) {
      dispatch(setAuditTeamData([...mappedMA, ...mappedKTA, ...mappedATA]));
    }
  }, [auditTeam]);

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
        {validationErrors["name_kegiatan_audit"] && (
          <div className="mt-2">
            <ErrorValidation
              message={validationErrors["name_kegiatan_audit"]}
            />
          </div>
        )}
      </div>
      <div className="flex gap-3 justify-between my-3">
        <div className="w-1/2">
          <CardBodyContent>
            <FormWithLabel
              label={"Metode Audit"}
              form={
                <Select
                  optionValue={optionMetode}
                  isSearchable={false}
                  onChange={(e) => handleChangeRef("ref_metode", e.value)}
                  value={
                    auditScheduleData.ref_metode?.nama !== "" && {
                      label: auditScheduleData.ref_metode?.nama,
                      value: auditScheduleData.ref_metode?.kode,
                    }
                  }
                  isDisabled={isDisabled}
                />
              }
              errors={validationErrors["ref_metode.kode"]}
            />
            <FormWithLabel
              label={"Tipe Audit"}
              form={
                <Select
                  optionValue={optionTipe}
                  isSearchable={false}
                  onChange={(e) => handleChangeRef("ref_tipe", e.value)}
                  value={
                    auditScheduleData.ref_tipe?.nama !== "" && {
                      label: auditScheduleData.ref_tipe?.nama,
                      value: auditScheduleData.ref_tipe?.kode,
                    }
                  }
                  isDisabled={isDisabled}
                />
              }
              errors={validationErrors["ref_tipe.kode"]}
            />
            <FormWithLabel
              label={"Jenis Audit"}
              form={
                <Select
                  optionValue={optionJenis}
                  isSearchable={false}
                  onChange={(e) => handleChangeRef("ref_jenis", e.value)}
                  value={
                    auditScheduleData.ref_jenis?.nama !== "" && {
                      label: auditScheduleData.ref_jenis?.nama,
                      value: auditScheduleData.ref_jenis?.kode,
                    }
                  }
                  isDisabled={isDisabled}
                />
              }
              errors={validationErrors["ref_jenis.kode"]}
            />
            <FormWithLabel
              label={"Tema Audit"}
              form={
                <Select
                  optionValue={optionTema}
                  isSearchable={false}
                  onChange={(e) => handleChangeRef("ref_tema", e.value)}
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
              errors={validationErrors["pelaksanaan_start"]}
            />
            <FormWithLabel
              label={"Tim Audit"}
              form={
                <AuditTeamSelect
                  handleChange={handleChangeAuditTeam}
                  isDisabled={isDisabled}
                  selectedValue={auditScheduleData.tim_audit_id}
                />
              }
              errors={validationErrors["pelaksanaan_end"]}
            />
          </CardBodyContent>
        </div>
        <div className="w-1/2">
          <CardAuditTeam
            header_title={auditTeam?.data?.name}
            maker={auditTeam?.data?.pic_maker_tim_audit?.nama}
            created_at={
              auditTeam?.data?.createdAt &&
              convertDate(auditTeam?.data?.createdAt, "-", "d")
            }
            manajer_audit={auditTeam?.data?.ref_tim_audit_mas}
            ketua_tim_audit={auditTeam?.data?.ref_tim_audit_kta}
            anggota_tim_audit={auditTeam?.data?.ref_tim_audit_ata}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalBodyInfoKegiatan;

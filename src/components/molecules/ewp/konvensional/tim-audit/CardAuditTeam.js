import { ButtonIcon, ErrorValidation } from "@/components/atoms";
import { IconClose } from "@/components/icons";
import {
  PekerjaSelect,
  CardFormInput,
  TypeTeamSelect,
} from "@/components/molecules/commons";
import { useSelector, useDispatch } from "react-redux";
import { setAuditTeamData } from "@/slices/ewp/konvensional/mapa/auditTeamMapaEWPSlice";

const CardAuditTeam = () => {
  const dispatch = useDispatch();
  const auditTeamData = useSelector(
    (state) => state.auditTeamMapaEWP.auditTeamData
  );
  const validationErrors = useSelector(
    (state) => state.auditTeamMapaEWP.validationErrors
  );

  const handleAdd = (property) => {
    const newTimAudit = [...auditTeamData.tim_audit[property]];
    newTimAudit.push({ pn: "", nama: "", is_initiator: false });

    const updatedData = {
      ...auditTeamData,
      tim_audit: {
        ...auditTeamData.tim_audit,
        [property]: newTimAudit,
      },
    };
    dispatch(setAuditTeamData(updatedData));
  };

  const handleDelete = (property, idx) => {
    const newAuditTeamData = { ...auditTeamData };
    const newArray = [...newAuditTeamData.tim_audit[property]];
    newArray.splice(idx, 1);
    const updatedAuditTeamData = {
      ...newAuditTeamData,
      tim_audit: {
        ...newAuditTeamData.tim_audit,
        [property]: newArray,
      },
    };
    dispatch(setAuditTeamData(updatedAuditTeamData));
  };

  const handleChangeAudit = (property, index, e) => {
    const newAuditTeamData = { ...auditTeamData };
    const newData = [...newAuditTeamData.tim_audit[property]];
    const updated = {
      ...newData[index],
      pn: e?.value?.pn,
      nama: e?.value?.name,
      is_initiator: false,
    };
    newData[index] = updated;
    const updatedAuditTeamData = {
      ...newAuditTeamData,
      tim_audit: {
        ...newAuditTeamData.tim_audit,
        [property]: newData,
      },
    };
    dispatch(setAuditTeamData(updatedAuditTeamData));
  };

  const handleChange = (property, value) => {
    const updateData = {
      ...auditTeamData,
      [property]: value,
    };
    dispatch(setAuditTeamData(updateData));
  };

  return (
    <div className="px-6 py-4 w-full gap-4 grid grid-cols-4">
      <CardFormInput
        title={"Manajer Audit"}
        className={"text-atlasian-blue-light"}
        buttonText={"Manajer"}
        buttonBottom={true}
        handleClickButtonBottom={() => handleAdd("ma")}
      >
        <div className="w-full -mb-2">
          {auditTeamData?.tim_audit?.ma?.length
            ? auditTeamData?.tim_audit?.ma.map((v, i) => {
                return (
                  <PekerjaSelect
                    key={i}
                    customIcon={
                      <ButtonIcon
                        icon={<IconClose />}
                        handleClick={() => handleDelete("ma", i)}
                      />
                    }
                    handleChange={(e) => handleChangeAudit("ma", i, e)}
                    className={"mb-2"}
                    selectedValue={{
                      label: `${v.pn} - ${v.nama}`,
                      value: { v },
                    }}
                  />
                );
              })
            : ""}
          {validationErrors["tim_audit.ma"] && (
            <div className="pl-2">
              <ErrorValidation message={validationErrors["tim_audit.ma"]} />
            </div>
          )}
        </div>
      </CardFormInput>
      <CardFormInput
        title={"Ketua Tim Audit"}
        className={"text-atlasian-red"}
        buttonText={"Ketua"}
        buttonBottom={true}
        handleClickButtonBottom={() => handleAdd("kta")}
      >
        <div className="w-full -mb-2">
          {auditTeamData?.tim_audit?.kta?.length
            ? auditTeamData?.tim_audit?.kta.map((v, i) => {
                return (
                  <PekerjaSelect
                    key={i}
                    customIcon={
                      <ButtonIcon
                        icon={<IconClose />}
                        handleClick={() => handleDelete("kta", i)}
                      />
                    }
                    handleChange={(e) => handleChangeAudit("kta", i, e)}
                    className={"mb-2"}
                    selectedValue={{
                      label: `${v.pn} - ${v.nama}`,
                      value: { v },
                    }}
                    isDisabled={v.is_initiator && true}
                  />
                );
              })
            : ""}
          {validationErrors["tim_audit.kta"] && (
            <div className="pl-2">
              <ErrorValidation message={validationErrors["tim_audit.kta"]} />
            </div>
          )}
        </div>
      </CardFormInput>
      <CardFormInput
        title={"Anggota Tim Audit"}
        className={"text-atlasian-green"}
        buttonText={"Anggota"}
        buttonBottom={true}
        handleClickButtonBottom={() => handleAdd("ata")}
      >
        <div className="w-full -mb-2">
          {auditTeamData?.tim_audit?.ata?.length
            ? auditTeamData?.tim_audit?.ata.map((v, i) => {
                return (
                  <div key={i}>
                    <PekerjaSelect
                      key={i}
                      customIcon={
                        <ButtonIcon
                          icon={<IconClose />}
                          handleClick={() => handleDelete("ata", i)}
                        />
                      }
                      handleChange={(e) => handleChangeAudit("ata", i, e)}
                      className={"mb-2"}
                      selectedValue={{
                        label: `${v.pn} - ${v.nama}`,
                        value: { v },
                      }}
                    />
                    {validationErrors[`ata[1].pn`] && (
                      <div className="pl-2">
                        <ErrorValidation
                          message={validationErrors[`ata[1].pn`]}
                        />
                      </div>
                    )}
                  </div>
                );
              })
            : ""}
          {validationErrors["tim_audit.ata"] && (
            <div className="pl-2">
              <ErrorValidation message={validationErrors["tim_audit.ata"]} />
            </div>
          )}
        </div>
      </CardFormInput>
      <CardFormInput title={"Tipe Tim"} className={"text-atlasian-yellow"}>
        <div className="w-full">
          <TypeTeamSelect
            isSearchable={false}
            handleChange={(e) => handleChange("ref_tipe_tim", e.value)}
            placeholder={"Tipe Tim"}
            selectedValue={{
              label: auditTeamData?.ref_tipe_tim?.nama,
              value: auditTeamData?.ref_tipe_tim,
            }}
          />
          {validationErrors["ref_tipe_tim.kode"] && (
            <div className="pl-2">
              <ErrorValidation
                message={validationErrors["ref_tipe_tim.kode"]}
              />
            </div>
          )}
        </div>
      </CardFormInput>
    </div>
  );
};

export default CardAuditTeam;

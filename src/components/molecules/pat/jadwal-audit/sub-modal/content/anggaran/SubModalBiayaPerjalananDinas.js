import { ReactSelect, TextInput } from "@/components/atoms";
import { FormWithLabel, CardBodyContent } from "@/components/molecules/commons";
import { setAuditScheduleData } from "@/slices/pat/auditScheduleSlice";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { CardTravelExpense } from "@/components/molecules/pat";

const SubModalBiayaPerjalananDinas = ({ typeModal }) => {
  console.log(typeModal);
  const { control } = useForm();
  const dispatch = useDispatch();
  const auditScheduleData = useSelector(
    (state) => state.auditSchedule.auditScheduleData
  );

  const auditTeamData = useSelector(
    (state) => state.auditSchedule.auditTeamData
  );

  const [isDisabled, setIsDisabled] = useState(true);
  const [selectedAuditor, setSelectedAuditor] = useState(null);
  const [budget, setBudget] = useState({
    pn_auditor: {
      pn: "",
      nama: "",
      jabatan: "",
    },
    biaya_tiket_pp: 0,
    biaya_transport_lokal: 0,
    biaya_perjalanan_hari: 0,
    biaya_akomodasi: 0,
  });

  const handleChange = (key, value) => {
    if (key === "pn_auditor") {
      setSelectedAuditor(value.value.pn);
      setBudget((prevBudget) => ({
        ...prevBudget,
        pn_auditor: {
          pn: value.value.pn,
          nama: value.value.nama,
          jabatan: value.value.jabatan,
        },
      }));
      setIsDisabled(false);
    } else {
      setBudget((prevBudget) => ({
        ...prevBudget,
        [key]: value,
      }));
    }
  };

  const handleAddBudget = () => {
    const newData = [...auditScheduleData.anggaran_dinas];
    const findByIndex = newData.findIndex(
      (v) => v?.pn_auditor?.pn === selectedAuditor
    );

    if (findByIndex !== -1) {
      newData[findByIndex] = budget;
    } else {
      newData.push(budget);
    }

    dispatch(
      setAuditScheduleData({ ...auditScheduleData, anggaran_dinas: newData })
    );
    setBudget({
      pn_auditor: {
        pn: "",
        nama: "",
        jabatan: "",
      },
      biaya_tiket_pp: 0,
      biaya_transport_lokal: 0,
      biaya_perjalanan_hari: 0,
      biaya_akomodasi: 0,
    });
    setIsDisabled(true);
    // console.log("TEST => ", newData);
  };

  const [optionAuditTeam, setOptionAuditTeam] = useState([]);
  useEffect(() => {
    console.log("auditScheduleData E-Channel => ", auditScheduleData);
  }, [auditScheduleData]);

  useEffect(() => {
    const mapping = auditTeamData?.map((v) => {
      return {
        label: `${v.pn} - ${v.nama}`,
        value: v,
      };
    });

    setOptionAuditTeam(mapping);
  }, [auditTeamData]);

  return (
    <div className="w-full gap-3 flex p-6">
      <div className="w-1/2">
        <CardBodyContent handler={handleAddBudget} buttonDisabled={isDisabled}>
          <FormWithLabel
            label={"Nama Anggota"}
            form={
              <ReactSelect
                control={control}
                options={optionAuditTeam.map((option, index) => ({
                  ...option,
                  index,
                }))}
                handleChange={(e) => handleChange("pn_auditor", e)}
                value={{
                  label: `${budget.pn_auditor.pn} - ${budget.pn_auditor.nama}`,
                  value: budget.pn_auditor,
                }}
              />
            }
            widthFull={true}
          />
          <FormWithLabel
            label={"Posisi Jabatan"}
            form={
              <TextInput isDisabled={true} value={budget.pn_auditor.jabatan} />
            }
            widthFull={true}
          />
          <FormWithLabel
            label={"Tiket PP"}
            form={
              <TextInput
                value={budget.biaya_tiket_pp}
                onChange={(e) =>
                  handleChange("biaya_tiket_pp", parseInt(e.target.value))
                }
              />
            }
            widthFull={true}
          />
          <FormWithLabel
            label={"Transport Lokal"}
            form={
              <TextInput
                value={budget.biaya_transport_lokal}
                onChange={(e) =>
                  handleChange(
                    "biaya_transport_lokal",
                    parseInt(e.target.value)
                  )
                }
              />
            }
            widthFull={true}
          />
          <FormWithLabel
            label={"Uang Harian"}
            form={
              <TextInput
                value={budget.biaya_perjalanan_hari}
                onChange={(e) =>
                  handleChange(
                    "biaya_perjalanan_hari",
                    parseInt(e.target.value)
                  )
                }
              />
            }
            widthFull={true}
          />
          <FormWithLabel
            label={"Biaya Akomodasi"}
            form={
              <TextInput
                value={budget.biaya_akomodasi}
                onChange={(e) =>
                  handleChange("biaya_akomodasi", parseInt(e.target.value))
                }
              />
            }
            widthFull={true}
          />
        </CardBodyContent>
      </div>
      <div className="w-1/2">
        <CardBodyContent>
          {auditScheduleData.anggaran_dinas?.length ? (
            <div className="font-bold text-base">
              Rincian Biaya Perjalanan Dinas
            </div>
          ) : (
            ""
          )}
          <CardTravelExpense data={auditScheduleData.anggaran_dinas} />
        </CardBodyContent>
      </div>
    </div>
  );
};

export default SubModalBiayaPerjalananDinas;

import { ReactSelect, TextInput, TextInputDecimal } from "@/components/atoms";
import { FormWithLabel, CardBodyContent } from "@/components/molecules/commons";
import { useEffect, useState } from "react";
import { setActivityScheduleOtherData } from "@/slices/pat/activityScheduleOtherSlice";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { CardTravelExpense } from "@/components/molecules/pat";

const SubModalTravelExpense = ({ typeModal }) => {
  console.log(typeModal);
  const { control } = useForm();
  const dispatch = useDispatch();
  const activityScheduleOtherData = useSelector(
    (state) => state.activityScheduleOther.activityScheduleOtherData
  );

  const [optionAuditTeam, setOptionAuditTeam] = useState([]);
  const [selectedAuditor, setSelectedAuditor] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
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
      if (isNaN(parseInt(value))) {
        setBudget((prevBudget) => ({
          ...prevBudget,
          [key]: 0,
        }));
      } else if (parseInt(value) > 2000000000) {
        setBudget((prevBudget) => ({
          ...prevBudget,
          [key]: 2000000000,
        }));
      } else {
        setBudget((prevBudget) => ({
          ...prevBudget,
          [key]: value,
        }));
      }
    }
  };

  const handleAddBudget = () => {
    const newData = [...activityScheduleOtherData.anggaran_dinas];
    const findByIndex = newData.findIndex(
      (v) => v?.pn_auditor?.pn === selectedAuditor
    );

    if (findByIndex !== -1) {
      newData[findByIndex] = budget;
    } else {
      newData.push(budget);
    }

    dispatch(
      setActivityScheduleOtherData({
        ...activityScheduleOtherData,
        anggaran_dinas: newData,
      })
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
  };

  useEffect(() => {
    const mapping = activityScheduleOtherData?.penanggung_jawab?.map((v) => {
      return {
        label: `${v.pn} - ${v.nama}`,
        value: v,
      };
    });

    setOptionAuditTeam(mapping);
  }, [activityScheduleOtherData]);

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
            widthLabel={"w-2/5"}
            widthForm={"w-3/5"}
          />
          <FormWithLabel
            label={"Posisi Jabatan"}
            form={
              <TextInput isDisabled={true} value={budget.pn_auditor.jabatan} />
            }
            widthLabel={"w-2/5"}
            widthForm={"w-3/5"}
          />
          <FormWithLabel
            label={"Tiket PP"}
            form={
              <TextInputDecimal
                value={budget.biaya_tiket_pp}
                onChange={(value) => handleChange("biaya_tiket_pp", value)}
              />
            }
            widthLabel={"w-2/5"}
            widthForm={"w-3/5"}
          />
          <FormWithLabel
            label={"Transport Lokal"}
            form={
              <TextInputDecimal
                value={budget.biaya_transport_lokal}
                onChange={(value) =>
                  handleChange("biaya_transport_lokal", value)
                }
              />
            }
            widthLabel={"w-2/5"}
            widthForm={"w-3/5"}
          />
          <FormWithLabel
            label={"Uang Harian"}
            form={
              <TextInputDecimal
                value={budget.biaya_perjalanan_hari}
                onChange={(value) =>
                  handleChange("biaya_perjalanan_hari", value)
                }
              />
            }
            widthLabel={"w-2/5"}
            widthForm={"w-3/5"}
          />
          <FormWithLabel
            label={"Biaya Akomodasi"}
            form={
              <TextInputDecimal
                value={budget.biaya_akomodasi}
                onChange={(value) => handleChange("biaya_akomodasi", value)}
              />
            }
            widthLabel={"w-2/5"}
            widthForm={"w-3/5"}
          />
        </CardBodyContent>
      </div>
      <div className="w-1/2">
        <CardBodyContent>
          {activityScheduleOtherData.anggaran_dinas?.length ? (
            <div className="font-bold text-base">
              Rincian Biaya Perjalanan Dinas
            </div>
          ) : (
            ""
          )}
          <CardTravelExpense data={activityScheduleOtherData.anggaran_dinas} />
        </CardBodyContent>
      </div>
    </div>
  );
};

export default SubModalTravelExpense;

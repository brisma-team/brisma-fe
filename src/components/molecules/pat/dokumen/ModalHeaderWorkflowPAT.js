import { setWorkflowData } from "@/slices/pat/documentSlice";
import { useEffect, useState } from "react";
import { CardFormInput } from "../../commons";
import { TextInput } from "@/components/atoms";
import CardFormInputTeam from "../CardFormInputTeam";
import Image from "next/image";
import { ImageCheck } from "@/helpers/imagesUrl";

const ModalHeaderWorkflowPAT = ({
  data,
  status,
  dispatch,
  validationErrors,
}) => {
  const [optionSigners, setOptionSigners] = useState([]);

  useEffect(() => {
    if (data.ref_tim_audit_approver.length) {
      const mappingSigners = data.ref_tim_audit_approver?.map((v) => {
        const { pn, nama } = v;
        return { label: `${v.pn} - ${v.nama}`, value: { pn, name: nama } };
      });
      setOptionSigners(mappingSigners);
    }
  }, [data]);

  const handleAdd = (property) => {
    const newData = [...data[property]];
    newData.push({
      pn: "",
      nama: "",
      is_signed: false,
    });
    dispatch(setWorkflowData({ ...data, [property]: newData }));
  };

  const handleDelete = (property, idx) => {
    const newData = { ...data };
    if (newData[property].length > 1) {
      const newData = [...data[property]];
      newData.splice(idx, 1);
      dispatch(setWorkflowData({ ...data, [property]: newData }));
    }
  };

  const handleChange = (property, index, e) => {
    const newData = [...data[property]];
    const updated = { ...newData[index] };
    updated["pn"] = e?.value?.pn;
    updated["nama"] = e?.value?.name;
    newData[index] = updated;
    dispatch(
      setWorkflowData({
        ...data,
        [property]: newData,
      })
    );
  };

  return (
    <div className="w-[61rem]">
      <div className="mx-3">
        {/* <PageTitle text={"Workflow"} /> */}
        <p className="font-bold text-xl text-brisma">Workflow</p>
      </div>
      <div className="flex w-full gap-4 p-3">
        <div className="w-1/3">
          <CardFormInput title={"Maker"}>
            <TextInput
              isDisabled={true}
              value={data?.ref_tim_audit_maker}
              className={"text-black"}
            />
          </CardFormInput>
        </div>
        <div className="w-1/3">
          <CardFormInputTeam
            data={data?.ref_tim_audit_approver}
            type={"Approver"}
            handlerAddParent={handleAdd}
            handlerChangeParent={handleChange}
            handlerDeleteParent={handleDelete}
            property={"ref_tim_audit_approver"}
            iconBeside={
              <div className="my-3 ml-2 flex items-center w-5">
                <Image alt="" src={ImageCheck} />
              </div>
            }
            childProperty={"is_signed"}
            validationErrors={validationErrors}
            withoutButtonAdd={status !== "On Progress" && true}
            isDisabled={status !== "On Progress" && true}
          />
        </div>
        <div className="w-1/3">
          <CardFormInputTeam
            data={data?.ref_tim_audit_signer}
            type={"Signer"}
            handlerAddParent={handleAdd}
            handlerChangeParent={handleChange}
            handlerDeleteParent={handleDelete}
            property={"ref_tim_audit_signer"}
            optionValue={optionSigners}
            validationErrors={validationErrors}
            withoutButtonAdd={status !== "On Progress" && true}
            isDisabled={status !== "On Progress" && true}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalHeaderWorkflowPAT;

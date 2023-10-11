import { setWorkflowData } from "@/slices/pat/documentSlice";
import { useEffect, useState } from "react";
import { CardFormInput } from "@/components/molecules/commons";
import { CloseModal, TextInput } from "@/components/atoms";
import { CardFormInputTeam } from "@/components/molecules/pat";
import Image from "next/image";
import { ImageCheck, ImageGroup } from "@/helpers/imagesUrl";
import { useDispatch } from "react-redux";

const ModalWorkflowHeader = ({
  user,
  data,
  status,
  validationErrors,
  handleCloseModal,
  showModal,
  headerTitle,
}) => {
  const dispatch = useDispatch();
  const [optionApprovers, setOptionApprovers] = useState([]);

  useEffect(() => {
    if (data.ref_tim_audit_approver.length) {
      const mappingSigners = data.ref_tim_audit_approver?.map((v) => {
        const { pn, nama } = v;
        return { label: `${v.pn} - ${v.nama}`, value: { pn, name: nama } };
      });
      setOptionApprovers(mappingSigners);
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
    <div className="w-[45rem] relative">
      <CloseModal handleCloseModal={handleCloseModal} showModal={showModal} />
      <div className="mx-3">
        <p className="font-bold text-xl text-brisma">{headerTitle}</p>
      </div>
      <div className="flex w-full gap-4 p-3">
        <div className="w-1/2">
          <CardFormInput
            title={"P.I.C"}
            className={"text-atlasian-blue-light"}
            icon={<Image src={ImageGroup} alt="" />}
          >
            <TextInput
              isDisabled={true}
              value={data?.ref_tim_audit_maker}
              className={"text-black"}
            />
          </CardFormInput>
        </div>
        <div className="w-1/2">
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
            withoutButtonAdd={
              status !== "On Progress" && data?.maker !== user?.pn && true
            }
            isDisabled={
              status !== "On Progress" && data?.maker !== user?.pn && true
            }
            isButtonChange={
              status === "On Approver" && data?.maker === user?.pn && "Ganti"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ModalWorkflowHeader;

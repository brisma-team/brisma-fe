import { Modal, ButtonField, TableField } from "@/components/atoms";
import CardFormInputTeam from "../CardFormInputTeam";
import { useDispatch, useSelector } from "react-redux";
import { setDocumentData } from "@/slices/pat/documentSlice";
import { useEffect } from "react";

const Header = ({ data, dispatch }) => {
  const handleAdd = (property) => {
    const newData = [...data[property]];
    newData.push({
      pn: "",
      nama: "",
      jabatan: "",
    });
    dispatch(setDocumentData({ ...data, [property]: newData }));
  };

  const handleDelete = (property, idx) => {
    const newData = { ...data };
    if (newData[property].length > 1) {
      const newData = [...data[property]];
      newData.splice(idx, 1);
      dispatch(setDocumentData({ ...data, [property]: newData }));
    }
  };

  const handleChange = (property, index, e) => {
    const newData = [...data[property]];
    const updated = { ...newData[index] };
    updated["pn"] = e?.value?.pn;
    updated["nama"] = e?.value?.name;
    newData[index] = updated;
    dispatch(
      setDocumentData({
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
          <CardFormInputTeam
            data={data.ref_tim_audit_maker}
            type={"Maker"}
            handlerAddParent={handleAdd}
            handlerChangeParent={handleChange}
            handlerDeleteParent={handleDelete}
            property={"ref_tim_audit_maker"}
          />
        </div>
        <div className="w-1/3">
          <CardFormInputTeam
            data={data.ref_tim_audit_approver}
            type={"Approver"}
            handlerAddParent={handleAdd}
            handlerChangeParent={handleChange}
            handlerDeleteParent={handleDelete}
            property={"ref_tim_audit_approver"}
          />
        </div>
        <div className="w-1/3">
          <CardFormInputTeam
            data={data.ref_tim_audit_signer}
            type={"Signer"}
            handlerAddParent={handleAdd}
            handlerChangeParent={handleChange}
            handlerDeleteParent={handleDelete}
            property={"ref_tim_audit_signer"}
          />
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <div className="w-full flex justify-end gap-3 -my-1">
      <div className="rounded w-28 bg-atlasian-red">
        <ButtonField text={"Reset Flow"} />
      </div>
      <div className="rounded w-28 bg-atlasian-blue-light">
        <ButtonField text={"Send Approval"} />
      </div>
    </div>
  );
};

const ModalWorkflow = ({ showModal, setShowModal }) => {
  const dispatch = useDispatch();
  const documentData = useSelector((state) => state.documentPAT.documentData);
  useEffect(() => {
    console.log("DOCUMENT DATA => ", documentData);
  }, [documentData]);
  const items = [
    {
      Approver: "123123123 - Dandy",
      Keterangan: "Sudah sesuai apa yang diharapkan",
      Status: "Approved",
      Tanggal: "22 Juni 2023",
    },
  ];
  return (
    <Modal
      showModal={showModal}
      onClickOutside={() => setShowModal(false)}
      header={<Header data={documentData} dispatch={dispatch} />}
      footer={<Footer />}
    >
      <div className="w-[61rem]">
        <div className="px-3">
          <p className="font-bold text-xl text-brisma">Riwayat Workflow</p>
          <div className="py-3">
            <TableField
              headers={["Approver", "Status", "Status", "Tanggal"]}
              columnWidths={["40%", "20%", "20%", "20%"]}
              items={[]}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalWorkflow;

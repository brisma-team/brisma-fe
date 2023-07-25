import {
  Modal,
  ButtonField,
  TextInput,
  ErrorValidation,
} from "@/components/atoms";
import { IconClose } from "@/components/icons";
import CardFormInputTeam from "../CardFormInputTeam";
import { usePostData, useUpdateData } from "@/helpers";
import { useState } from "react";
import { auditTeamSchema } from "@/helpers/schemas";

const ModalAddAuditTeam = ({
  showModal,
  setShowModal,
  typeModal,
  data,
  setData,
  isMutate,
}) => {
  console.log("TYPE MODAL => ", typeModal);
  // START ADD HANDLING
  const handleAddMA = () => {
    setData((prevData) => {
      const newTimAuditMA = [...prevData.ref_tim_audit_ma];
      newTimAuditMA.push({ pn: "", nama: "", jabatan: "" });
      const newData = { ...prevData, ref_tim_audit_ma: newTimAuditMA };
      return newData;
    });
  };

  const handleAddKTA = () => {
    setData((prevData) => {
      const newTimAuditKTA = [...prevData.ref_tim_audit_kta];
      newTimAuditKTA.push({ pn: "", nama: "", jabatan: "" });
      const newData = { ...prevData, ref_tim_audit_kta: newTimAuditKTA };
      return newData;
    });
  };

  const handleAddATA = () => {
    setData((prevData) => {
      const newTimAuditATA = [...prevData.ref_tim_audit_ata];
      newTimAuditATA.push({
        pn: "",
        nama: "",
        jabatan: "",
        uker_binaans: [
          {
            orgeh_kode: "",
            orgeh_name: "",
            branch_name: "",
            branch_kode: "",
          },
        ],
      });
      const newData = { ...prevData, ref_tim_audit_ata: newTimAuditATA };
      return newData;
    });
  };

  const handleAddUkerATA = (idx) => {
    setData((prevData) => {
      const newTimAuditATA = [...prevData.ref_tim_audit_ata];
      const newUkerBinaans = [...newTimAuditATA[idx].uker_binaans];
      newUkerBinaans.push({
        orgeh_kode: "",
        orgeh_name: "",
        branch_name: "",
        branch_kode: "",
      });
      newTimAuditATA[idx].uker_binaans = newUkerBinaans;
      return { ...prevData, ref_tim_audit_ata: newTimAuditATA };
    });
  };
  // END ADD HANDLING

  // START DELETE HANDLING
  const handleDeleteMA = (idx) => {
    const newData = { ...data };
    if (newData.ref_tim_audit_ma.length > 1) {
      newData.ref_tim_audit_ma.splice(idx, 1);
      setData(newData);
    }
  };

  const handleDeleteKTA = (idx) => {
    const newData = { ...data };
    if (newData.ref_tim_audit_kta.length > 1) {
      newData.ref_tim_audit_kta.splice(idx, 1);
      setData(newData);
    }
  };

  const handleDeleteATA = (idx) => {
    const newData = { ...data };
    if (newData.ref_tim_audit_ata.length > 1) {
      newData.ref_tim_audit_ata.splice(idx, 1);
      setData(newData);
    }
  };

  const handleDeleteUkerATA = (idxATA, idxUker) => {
    if (data?.ref_tim_audit_ata[idxATA]?.uker_binaans?.length > 1) {
      setData((prevData) => {
        const newRefTimAuditAta = [...prevData.ref_tim_audit_ata];
        const newUkerBinaans = [...newRefTimAuditAta[idxATA].uker_binaans];
        newUkerBinaans.splice(idxUker, 1);
        newRefTimAuditAta[idxATA].uker_binaans = newUkerBinaans;
        return { ...prevData, ref_tim_audit_ata: newRefTimAuditAta };
      });
    }
  };
  // END DELETE HANDLING

  // START CHANGE HANDLING
  const handleChangeMA = (index, value) => {
    setData((prevData) => {
      const newTimAuditMA = [...prevData.ref_tim_audit_ma];
      newTimAuditMA[index]["pn"] = value?.pn;
      newTimAuditMA[index]["nama"] = value?.name;
      newTimAuditMA[index]["jabatan"] = value?.jabatan;
      return { ...prevData, ref_tim_audit_ma: newTimAuditMA };
    });
  };

  const handleChangeKTA = (index, value) => {
    setData((prevData) => {
      const newTimAuditKTA = [...prevData.ref_tim_audit_kta];
      newTimAuditKTA[index]["pn"] = value?.pn;
      newTimAuditKTA[index]["nama"] = value?.name;
      newTimAuditKTA[index]["jabatan"] = value?.jabatan;
      return { ...prevData, ref_tim_audit_kta: newTimAuditKTA };
    });
  };

  const handleChangeATA = (index, value) => {
    setData((prevData) => {
      const newTimAuditATA = [...prevData.ref_tim_audit_ata];
      newTimAuditATA[index]["pn"] = value?.pn;
      newTimAuditATA[index]["nama"] = value?.name;
      newTimAuditATA[index]["jabatan"] = value?.jabatan;
      return { ...prevData, ref_tim_audit_ma: newTimAuditATA };
    });
  };

  const handleChangeUkerATA = (idxATA, idxUker, value, type) => {
    setData((prevData) => {
      const newRefTimAuditAta = [...prevData.ref_tim_audit_ata];
      const newUkerBinaans = [...newRefTimAuditAta[idxATA].uker_binaans];
      if (type === "orgeh") {
        newUkerBinaans[idxUker]["orgeh_kode"] = value?.child;
        newUkerBinaans[idxUker]["orgeh_name"] = value?.my_name;
      } else if (type === "branch") {
        newUkerBinaans[idxUker]["branch_name"] = value?.brdesc;
        newUkerBinaans[idxUker]["branch_kode"] = value?.branch;
      }
      newRefTimAuditAta[idxATA].uker_binaans = newUkerBinaans;
      return { ...prevData, ref_tim_audit_ata: newRefTimAuditAta };
    });
  };
  // END CHANGE HANDLING

  // START SAVE DATA
  const [validationErrors, setValidationErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    auditTeamSchema
      .validate(data, { abortEarly: false })
      .then(async () => {
        setValidationErrors({});
        if (typeModal === "update") {
          await useUpdateData(
            `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/tim_audit`,
            data
          );
        } else {
          await usePostData(
            `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/tim_audit/create`,
            data
          );
        }
        setShowModal(false);
        isMutate;
      })
      .catch((err) => {
        console.log("ERROR => ", err);
        if (err.inner) {
          const errors = {};
          err.inner.forEach((error) => {
            errors[error.path] = error.message;
          });
          console.log("ERROR => ", errors);
          setValidationErrors(errors);
        }
      });
  };
  // END SAVE DATA
  return (
    <Modal showModal={showModal} onClickOutside={() => setShowModal(false)}>
      <form className="w-[63rem]" onSubmit={handleSubmit}>
        <div className="w-2/3">
          <TextInput
            icon={<IconClose size="medium" />}
            className={"font-bold text-5xl rounded text-brisma"}
            style={{ fontSize: "1.25rem" }}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            value={data?.name}
          />
          {validationErrors.name && (
            <ErrorValidation message={validationErrors.name} />
          )}
        </div>
        <div className="flex gap-3 justify-between my-3">
          <div className="w-1/3">
            <CardFormInputTeam
              type={"Manajer Audit"}
              data={data?.ref_tim_audit_ma}
              handlerDeleteParent={handleDeleteMA}
              handlerAddParent={handleAddMA}
              handlerChangeParent={handleChangeMA}
              validationErrors={validationErrors}
            />
          </div>
          <div className="w-1/3">
            <CardFormInputTeam
              type={"Ketua Tim Audit"}
              data={data?.ref_tim_audit_kta}
              handlerDeleteParent={handleDeleteKTA}
              handlerAddParent={handleAddKTA}
              handlerChangeParent={handleChangeKTA}
              validationErrors={validationErrors}
            />
          </div>
          <div className="w-1/3">
            <CardFormInputTeam type={"Tipe Tim"} placeholder={"Tipe Tim"} />
            {typeModal !== "detail" && (
              <div className="w-full flex justify-end">
                <div className="w-[7.75rem] h-[2.4rem] bg-atlasian-green rounded mt-5 flex justify-center">
                  <ButtonField text={"Simpan"} type={"submit"} />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="my-3">
          <CardFormInputTeam
            type={"Anggota Tim Audit"}
            data={data.ref_tim_audit_ata}
            handlerDeleteParent={handleDeleteATA}
            handlerDeleteChild={handleDeleteUkerATA}
            handlerAddParent={handleAddATA}
            handlerAddChild={handleAddUkerATA}
            handlerChangeParent={handleChangeATA}
            handlerChangeChild={handleChangeUkerATA}
            validationErrors={validationErrors}
          />
        </div>
      </form>
    </Modal>
  );
};

export default ModalAddAuditTeam;

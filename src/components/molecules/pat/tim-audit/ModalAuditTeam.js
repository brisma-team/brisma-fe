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
import { useSelector, useDispatch } from "react-redux";
import { setAuditTeamData } from "@/slices/pat/auditTeamSlice";
import { useRouter } from "next/router";

const ModalAuditTeam = ({ showModal, setShowModal, typeModal, isMutate }) => {
  const { id } = useRouter().query;
  const dispatch = useDispatch();
  const auditTeamData = useSelector((state) => state.auditTeam.auditTeamData);

  // START ADD HANDLING
  const handleAdd = (property) => {
    const newTimAudit = [...auditTeamData[property]];
    newTimAudit.push({ pn: "", nama: "", jabatan: "" });
    dispatch(setAuditTeamData({ ...auditTeamData, [property]: newTimAudit }));
  };

  const handleAddATA = () => {
    const newTimAuditATA = [...auditTeamData.ref_tim_audit_ata];
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
    dispatch(
      setAuditTeamData({ ...auditTeamData, ref_tim_audit_ata: newTimAuditATA })
    );
  };

  const handleAddUkerATA = (idx) => {
    const newTimAuditATA = [...auditTeamData.ref_tim_audit_ata];
    const newUkerBinaans = [...newTimAuditATA[idx].uker_binaans];
    newUkerBinaans.push({
      orgeh_kode: "",
      orgeh_name: "",
      branch_name: "",
      branch_kode: "",
    });
    newTimAuditATA[idx] = {
      ...newTimAuditATA[idx],
      uker_binaans: newUkerBinaans,
    };

    dispatch(
      setAuditTeamData({ ...auditTeamData, ref_tim_audit_ata: newTimAuditATA })
    );
  };
  // END ADD HANDLING

  // START DELETE HANDLING
  const handleDelete = (property, idx) => {
    const newData = { ...auditTeamData };
    if (newData[property].length > 1) {
      const newData = [...auditTeamData[property]];
      newData.splice(idx, 1);
      dispatch(setAuditTeamData({ ...auditTeamData, [property]: newData }));
    }
  };

  const handleDeleteUkerATA = (idxATA, idxUker) => {
    const currentATA = auditTeamData.ref_tim_audit_ata[idxATA];
    if (currentATA?.uker_binaans?.length > 1) {
      const newRefTimAuditAta = [...auditTeamData.ref_tim_audit_ata];
      const newUkerBinaans = [...currentATA.uker_binaans];
      newUkerBinaans.splice(idxUker, 1);
      newRefTimAuditAta[idxATA] = {
        ...currentATA,
        uker_binaans: newUkerBinaans,
      };

      dispatch(
        setAuditTeamData({
          ...auditTeamData,
          ref_tim_audit_ata: newRefTimAuditAta,
        })
      );
    }
  };
  // END DELETE HANDLING

  // START CHANGE HANDLING
  const handleChangeUkerATA = (idxATA, idxUker, value, type) => {
    const newATAData = [...auditTeamData.ref_tim_audit_ata];
    const newUkerData = [...newATAData[idxATA].uker_binaans];

    if (type === "orgeh") {
      newUkerData[idxUker] = {
        ...newUkerData[idxUker],
        orgeh_kode: value?.child,
        orgeh_name: value?.my_name,
      };
    } else if (type === "branch") {
      newUkerData[idxUker] = {
        ...newUkerData[idxUker],
        branch_name: value?.brdesc,
        branch_kode: value?.branch,
      };
    }

    newATAData[idxATA] = {
      ...newATAData[idxATA],
      uker_binaans: newUkerData,
    };

    dispatch(
      setAuditTeamData({
        ...auditTeamData,
        ref_tim_audit_ata: newATAData,
      })
    );
  };

  const handleChange = (property, index, e) => {
    const newData = [...auditTeamData[property]];
    const updated = {
      ...newData[index],
      pn: e?.value?.pn,
      nama: e?.value?.name,
      jabatan: e?.value?.jabatan,
    };
    newData[index] = updated;
    dispatch(
      setAuditTeamData({
        ...auditTeamData,
        [property]: newData,
      })
    );
  };

  const handleChangeTypeTeam = (e) => {
    dispatch(
      setAuditTeamData({
        ...auditTeamData,
        ref_tipe_tim: e.value,
      })
    );
  };

  const handleChangeText = (property, e) => {
    dispatch(
      setAuditTeamData({
        ...auditTeamData,
        [property]: e.target.value,
      })
    );
  };
  // END CHANGE HANDLING

  // START SAVE DATA
  const [validationErrors, setValidationErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...auditTeamData, pat_id: id };
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
          console.log("CREATE");
          await usePostData(
            `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/tim_audit/create`,
            data
          );
        }
        setShowModal(false);
        isMutate;
      })
      .catch((err) => {
        if (err.inner) {
          const errors = {};
          err.inner.forEach((error) => {
            errors[error.path] = error.message;
          });
          setValidationErrors(errors);
          console.log("error ", errors);
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
            onChange={(e) => handleChangeText("name", e)}
            value={auditTeamData?.name}
          />
          {validationErrors.name && (
            <ErrorValidation message={validationErrors.name} />
          )}
        </div>
        <div className="flex gap-3 justify-between my-3">
          <div className="w-1/3">
            <CardFormInputTeam
              key={0}
              type={"Manajer Audit"}
              data={auditTeamData?.ref_tim_audit_ma}
              handlerDeleteParent={handleDelete}
              handlerAddParent={handleAdd}
              handlerChangeParent={handleChange}
              validationErrors={validationErrors}
              property={"ref_tim_audit_ma"}
            />
          </div>
          <div className="w-1/3">
            <CardFormInputTeam
              key={1}
              type={"Ketua Tim Audit"}
              data={auditTeamData?.ref_tim_audit_kta}
              handlerDeleteParent={handleDelete}
              handlerAddParent={handleAdd}
              handlerChangeParent={handleChange}
              validationErrors={validationErrors}
              property={"ref_tim_audit_kta"}
            />
          </div>
          <div className="w-1/3">
            <CardFormInputTeam
              type={"Tipe Tim"}
              data={auditTeamData?.ref_tipe_tim}
              placeholder={"Tipe Tim"}
              handlerChangeParent={handleChangeTypeTeam}
            />
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
            key={2}
            type={"Anggota Tim Audit"}
            data={auditTeamData?.ref_tim_audit_ata}
            handlerDeleteParent={handleDelete}
            handlerDeleteChild={handleDeleteUkerATA}
            handlerAddParent={handleAddATA}
            handlerAddChild={handleAddUkerATA}
            handlerChangeParent={handleChange}
            handlerChangeChild={handleChangeUkerATA}
            validationErrors={validationErrors}
            property={"ref_tim_audit_ata"}
          />
        </div>
      </form>
    </Modal>
  );
};

export default ModalAuditTeam;

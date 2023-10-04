import {
  Modal,
  ButtonField,
  TextInput,
  ErrorValidation,
  CloseModal,
} from "@/components/atoms";
import { IconClose } from "@/components/icons";
import CardFormInputTeam from "../CardFormInputTeam";
import {
  confirmationSwal,
  errorSwalTimeout,
  usePostData,
  useUpdateData,
} from "@/helpers";
import { useState } from "react";
import { auditTeamSchema } from "@/helpers/schemas";
import { useSelector, useDispatch } from "react-redux";
import {
  setAuditTeamData,
  resetAuditTeamData,
} from "@/slices/pat/auditTeamSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuditTeam } from "@/data/pat";

const ModalAuditTeam = ({
  showModal,
  setShowModal,
  typeModal,
  mutate,
  selectedTeamId,
}) => {
  const { id } = useRouter().query;
  const dispatch = useDispatch();
  const auditTeamData = useSelector((state) => state.auditTeam.auditTeamData);
  const [isDisabled, setIsDisabled] = useState(false);

  const { auditTeam, auditTeamMutate } = useAuditTeam("detail", {
    id: id,
    tim_id: selectedTeamId,
  });

  useEffect(() => {
    if (typeModal === "detail") {
      setIsDisabled(true);
    } else if (typeModal === "update") {
      const mapppedData = {
        pat_id: auditTeam?.data?.pat_id,
        tim_audit_id: auditTeam?.data?.id,
        name: auditTeam?.data?.name,
        ref_tipe_tim: auditTeam?.data?.ref_tipe_tim,
        ref_tim_audit_ma: auditTeam?.data?.ref_tim_audit_mas?.map((v) => ({
          pn: v?.pn_ma,
          nama: v?.nama_ma,
          jabatan: v?.jabatan,
        })),
        ref_tim_audit_kta: auditTeam?.data?.ref_tim_audit_kta?.map((v) => ({
          pn: v?.pn_kta,
          nama: v?.nama_kta,
          jabatan: v?.jabatan,
        })),
        ref_tim_audit_ata: auditTeam?.data?.ref_tim_audit_ata?.map((v) => ({
          pn: v?.pn_ata,
          nama: v?.nama_ata,
          jabatan: v?.jabatan,
          uker_binaans: v?.ref_ata_ukers?.map((x) => ({
            orgeh_kode: x?.orgeh_kode,
            orgeh_name: x?.orgeh_name,
            branch_kode: x?.branch_kode,
            branch_name: x?.branch_name,
          })),
        })),
      };
      dispatch(setAuditTeamData(mapppedData));
    }
  }, [auditTeam]);

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
    const newData = [...auditTeamData[property]];
    newData.splice(idx, 1);
    dispatch(setAuditTeamData({ ...auditTeamData, [property]: newData }));
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

  const handleSetNull = (property) => {
    dispatch(
      setAuditTeamData({
        ...auditTeamData,
        [property]: "",
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
        try {
          if (typeModal === "update") {
            await useUpdateData(
              `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/tim_audit`,
              data
            );
            auditTeamMutate();
          } else {
            await usePostData(
              `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/tim_audit/create`,
              data
            );
          }
          mutate();
          setShowModal(false);
          dispatch(resetAuditTeamData());
        } catch (err) {
          await errorSwalTimeout(err);
        }
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

  const handleCloseModal = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );

    if (!confirm.value) {
      return;
    }

    setShowModal(false);
    dispatch(resetAuditTeamData());
  };

  return (
    <Modal showModal={showModal}>
      <form className="w-[63rem] relative" onSubmit={handleSubmit}>
        <CloseModal handleCloseModal={handleCloseModal} showModal={showModal} />
        <div className="w-2/3">
          <TextInput
            icon={<IconClose size="medium" />}
            className={"font-bold text-5xl rounded text-brisma"}
            style={{ fontSize: "1.25rem" }}
            onChange={(e) => handleChangeText("name", e)}
            value={auditTeamData?.name}
            placeholder={"Masukkan nama tim audit"}
            handleClick={() => handleSetNull("name")}
            isDisabled={isDisabled}
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
              isDisabled={isDisabled}
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
              isDisabled={isDisabled}
            />
          </div>
          <div className="w-1/3">
            <CardFormInputTeam
              type={"Tipe Tim"}
              data={auditTeamData?.ref_tipe_tim}
              placeholder={"Tipe Tim"}
              handlerChangeParent={handleChangeTypeTeam}
              isDisabled={isDisabled}
            />
            {validationErrors["ref_tipe_tim.kode"] && (
              <div className="pl-2">
                <ErrorValidation
                  message={validationErrors?.["ref_tipe_tim.kode"]}
                />
              </div>
            )}
            {typeModal !== "detail" && (
              <div className="w-full flex justify-end">
                <div className="w-[7.75rem] bg-atlasian-green rounded mt-5 flex justify-center">
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
            isDisabled={isDisabled}
          />
        </div>
      </form>
    </Modal>
  );
};

export default ModalAuditTeam;

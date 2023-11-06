import {
  ButtonField,
  CloseModal,
  ErrorValidation,
  Modal,
} from "@/components/atoms";
import { SubActivitySelect } from "@/components/molecules/commons";
import {
  resetValidationErrorsPayloadSubActivity,
  setPayloadSubActivity,
  setValidationErrorsSubActivity,
} from "@/slices/ewp/konvensional/mapa/planningAnalysisMapaEWPSlice";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import SelectAuditTeamEWP from "../../SelectAuditTeamEWP";
import { IconPlus } from "@/components/icons";
import { confirmationSwal, setErrorValidation, usePostData } from "@/helpers";
import { subActivityMapaEWPSchema } from "@/helpers/schemas/ewp/konvensional/mapa/planningAnalysisMapaEWPSchema";
import useUser from "@/data/useUser";

const ModalFooter = ({ handleConfirm }) => {
  return (
    <div className="w-full flex justify-end -my-1">
      <div className="rounded w-28 bg-atlasian-green">
        <ButtonField text="Simpan" handler={handleConfirm} />
      </div>
    </div>
  );
};

const ModalAddSubActivity = ({
  showModal,
  setShowModal,
  activityId,
  handleSubmit,
}) => {
  const { id } = useRouter().query;
  const dispatch = useDispatch();

  const { user } = useUser();
  const payloadSubActivity = useSelector(
    (state) => state.planningAnalysisMapaEWP.payloadSubActivity
  );
  const validationErrors = useSelector(
    (state) => state.planningAnalysisMapaEWP.validationErrorsPayloadSubActivity
  );

  const schemaMappings = {
    schema: subActivityMapaEWPSchema,
    resetErrors: resetValidationErrorsPayloadSubActivity,
    setErrors: setValidationErrorsSubActivity,
  };

  const handleCloseModal = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );
    if (!confirm.value) {
      return;
    }

    setShowModal(false);
  };

  const handleConfirmWithClose = async () => {
    const validate = setErrorValidation(
      payloadSubActivity,
      dispatch,
      schemaMappings
    );

    const payload = JSON.parse(JSON.stringify(payloadSubActivity));

    payload.sub_aktivitas.map((item) => {
      if (!item.pn_pic_analisa) {
        item.pn_pic_analisa = user?.data?.pn;
        item.name_pic_analisa = user?.data?.fullName;
      }
    });

    if (validate) {
      await usePostData(
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/mapa/analisis_perencanaan/${id}/sub_aktivitas`,
        payload
      );
      handleSubmit();
    }
  };

  const handleChangeSelect = (property, idx, e) => {
    const updatedSubActivity = { ...payloadSubActivity };
    const subAktivitas = [...updatedSubActivity.sub_aktivitas];
    if (property === "sub_aktivitas") {
      subAktivitas[idx] = {
        ...subAktivitas[idx],
        mtd_sub_aktivitas_kode: e.value,
        mtd_sub_aktivitas_name: e.label,
      };
    } else if (property === "pic_analisa") {
      subAktivitas[idx] = {
        ...subAktivitas[idx],
        pn_pic_analisa: e.value,
        name_pic_analisa: e.label,
      };
    }
    updatedSubActivity.sub_aktivitas = subAktivitas;
    dispatch(setPayloadSubActivity(updatedSubActivity));
  };

  const handleAddSubActivity = () => {
    const newSubActivity = [...payloadSubActivity.sub_aktivitas];
    newSubActivity.push({
      id: null,
      mtd_sub_aktivitas_kode: "",
      mtd_sub_aktivitas_name: "",
      pn_pic_analisa: "",
      name_pic_analisa: "",
    });
    dispatch(
      setPayloadSubActivity({
        ...payloadSubActivity,
        sub_aktivitas: newSubActivity,
      })
    );
  };

  return (
    <Modal
      showModal={showModal}
      positionCenter={true}
      footer={<ModalFooter handleConfirm={handleConfirmWithClose} />}
    >
      <div className="w-[30rem] relative">
        <CloseModal handleCloseModal={handleCloseModal} showModal={showModal} />
        <div className="mb-2 font-semibold">Sub Aktifitas</div>
        <div className="max-h-[25rem] overflow-y-scroll">
          {payloadSubActivity.sub_aktivitas?.map((v, i) => {
            const {
              mtd_sub_aktivitas_kode,
              mtd_sub_aktivitas_name,
              pn_pic_analisa,
              name_pic_analisa,
            } = v;
            return (
              <div
                className="mb-2 flex justify-between gap-3 overflow-x-hidden"
                key={i}
              >
                <div className="w-1/2">
                  <SubActivitySelect
                    selectedValue={{
                      label: mtd_sub_aktivitas_name,
                      value: { mtd_sub_aktivitas_kode, mtd_sub_aktivitas_name },
                    }}
                    activityId={activityId}
                    handleChange={(e) =>
                      handleChangeSelect("sub_aktivitas", i, e)
                    }
                    placeholder={"Masukan Sub Aktivitas"}
                    width={"w-[14.5rem]"}
                  />
                  {validationErrors[
                    `sub_aktivitas[${i}].mtd_sub_aktivitas_kode`
                  ] && (
                    <div className="pl-2">
                      <ErrorValidation
                        message={
                          validationErrors[
                            `sub_aktivitas[${i}].mtd_sub_aktivitas_kode`
                          ]
                        }
                      />
                    </div>
                  )}
                </div>
                <div className="w-1/2">
                  <SelectAuditTeamEWP
                    selectedValue={{
                      label: `${pn_pic_analisa} - ${name_pic_analisa}`,
                      value: { pn_pic_analisa, name_pic_analisa },
                    }}
                    handleChange={(e) =>
                      handleChangeSelect("pic_analisa", i, e)
                    }
                    placeholder={"Masukan P.I.C (default K.T.A)"}
                    width={"w-[14.5rem]"}
                  />
                </div>
              </div>
            );
          })}
          {validationErrors["sub_aktivitas"] && (
            <div className="pl-2">
              <ErrorValidation message={validationErrors["sub_aktivitas"]} />
            </div>
          )}
        </div>
        <div className="bg-none w-48 mt-4">
          <ButtonField
            iconAfter={
              <div className="text-atlasian-purple">
                <IconPlus size="medium" />
              </div>
            }
            text={`Tambah Sub Aktifitas`}
            textColor={"purple"}
            handler={() => handleAddSubActivity()}
            className={"button"}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalAddSubActivity;

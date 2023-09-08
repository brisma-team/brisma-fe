import { ButtonField, CloseModal, Modal } from "@/components/atoms";
import { SubActivitySelect } from "@/components/molecules/commons";
import { setPayloadSubActivity } from "@/slices/ewp/konvensional/mapa/planningAnalysisMapaEWPSlice";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import SelectAuditTeamEWP from "../../SelectAuditTeamEWP";
import { IconPlus } from "@/components/icons";
import { usePostData } from "@/helpers";

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
  mutate,
  activityId,
}) => {
  const { id } = useRouter().query;
  const dispatch = useDispatch();
  const payloadSubActivity = useSelector(
    (state) => state.planningAnalysisMapaEWP.payloadSubActivity
  );

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmWithClose = async () => {
    console.log("payloadSubActivity => ", payloadSubActivity);
    await usePostData(
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/mapa/analisis_perencanaan/${id}/sub_aktivitas`,
      payloadSubActivity
    );
    mutate();
    setShowModal(false);
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
      positionCenter
      footer={<ModalFooter handleConfirm={handleConfirmWithClose} />}
    >
      <div className="w-[35rem] relative py-1.5">
        <CloseModal handleCloseModal={handleCloseModal} />
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
              <div className="mb-2 flex gap-3" key={i}>
                <div className="w-full">
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
                  />
                </div>
                <div className="w-full">
                  <SelectAuditTeamEWP
                    selectedValue={{
                      label: `${pn_pic_analisa} - ${name_pic_analisa}`,
                      value: { pn_pic_analisa, name_pic_analisa },
                    }}
                    handleChange={(e) =>
                      handleChangeSelect("pic_analisa", i, e)
                    }
                    placeholder={"Masukan P.I.C (default K.T.A)"}
                  />
                </div>
              </div>
            );
          })}
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
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalAddSubActivity;

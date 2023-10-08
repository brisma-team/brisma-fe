import { ButtonField, CloseModal, Modal, TextInput } from "@/components/atoms";
import { ActivitySelect } from "@/components/molecules/commons";
import { confirmationSwal, usePostData } from "@/helpers";
import { setPayloadActivity } from "@/slices/ewp/konvensional/mapa/planningAnalysisMapaEWPSlice";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

const ModalFooter = ({ handleConfirm }) => {
  return (
    <div className="w-full flex justify-end -my-1">
      <div className="rounded w-28 bg-atlasian-green">
        <ButtonField text="Simpan" handler={handleConfirm} />
      </div>
    </div>
  );
};

const ModalAddActivity = ({ showModal, setShowModal, mutate, ukerValue }) => {
  const { id } = useRouter().query;
  const dispatch = useDispatch();
  const payloadActivity = useSelector(
    (state) => state.planningAnalysisMapaEWP.payloadActivity
  );

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
    await usePostData(
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/mapa/analisis_perencanaan/${id}/aktivitas`,
      payloadActivity
    );
    mutate();
    setShowModal(false);
  };

  const handleChangeSelect = (e) => {
    dispatch(
      setPayloadActivity({
        mapa_uker_id: ukerValue.id,
        mtd_aktivitas_kode: e.value,
        mtd_aktivitas_name: e.label,
      })
    );
  };

  return (
    <Modal
      showModal={showModal}
      positionCenter
      footer={<ModalFooter handleConfirm={handleConfirmWithClose} />}
    >
      <div className="w-[19rem] relative">
        <CloseModal handleCloseModal={handleCloseModal} showModal={showModal} />
        <div className="mb-2 font-semibold">Aktifitas</div>
        <div className="mb-2">
          <TextInput isDisabled={true} value={ukerValue.name} />
        </div>
        <ActivitySelect handleChange={(e) => handleChangeSelect(e)} />
      </div>
    </Modal>
  );
};

export default ModalAddActivity;

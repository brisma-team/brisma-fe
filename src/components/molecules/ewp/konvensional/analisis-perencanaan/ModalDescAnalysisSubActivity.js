import { ButtonField, CloseModal, Modal } from "@/components/atoms";
import { useRouter } from "next/router";
import { confirmationSwal, usePostData } from "@/helpers";
import dynamic from "next/dynamic";
import { useState } from "react";
const Editor = dynamic(() => import("@/components/atoms/Editor"), {
  ssr: false,
});

const ModalFooter = ({ handleSubmit }) => {
  return (
    <div className="w-full flex justify-end -my-1">
      <div className="rounded w-28 bg-atlasian-green">
        <ButtonField text="Simpan" handler={handleSubmit} />
      </div>
    </div>
  );
};

const ModalDescAnlysisSubActivity = ({
  showModal,
  subActivityId,
  value,
  handleCloseModal,
}) => {
  const { id } = useRouter().query;

  const [desc, setDesc] = useState(value);

  const handleClose = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );
    if (!confirm.value) {
      return;
    }

    handleCloseModal();
  };

  const handleSubmit = async () => {
    await usePostData(
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/mapa/analisis_perencanaan/${id}/sub_aktivitas/uraian`,
      { sub_aktivitas_id: subActivityId, deskripsi: desc }
    );
    handleCloseModal();
  };

  const handleChange = (value) => {
    setDesc(value);
  };

  return (
    <Modal
      showModal={showModal}
      footer={<ModalFooter handleSubmit={handleSubmit} />}
      positionCenter={true}
    >
      <div className="h-[31.5rem] relative">
        <CloseModal handleCloseModal={handleClose} showModal={showModal} />
        <div className="px-3 pb-2 h-full">
          <p className="font-bold text-xl text-brisma">
            Deskripsi Analisa Sub Aktivitas
          </p>
          <div className="my-4" />
          <div className="ckeditor-modal">
            <Editor
              contentData={value}
              disabled={false}
              ready={true}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDescAnlysisSubActivity;

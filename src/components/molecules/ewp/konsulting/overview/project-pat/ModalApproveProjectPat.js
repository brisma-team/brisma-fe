import { ModalScroll } from "@/components/atoms";
import useUser from "@/data/useUser";
import { confirmationSwal } from "@/helpers";
import ModalWorkflowHeader from "./ModalWorkflowHeader";
import ModalWorkflowFooter from "./ModalWorkflowFooter";

const ModalApproveProjectPat = ({
  showModal,
  setShowModal,
  headerTitle,
  handleSubmit,
  handleReject,
  handleChangeSelect,
  objectId,
  data,
}) => {
  const { user } = useUser();

  console.log(objectId);
  const closeModal = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );

    if (!confirm.value) {
      return;
    }

    setShowModal(false);
  };

  return (
    <ModalScroll
      showModal={showModal}
      positionCenter={true}
      header={
        <ModalWorkflowHeader
          user={user?.data}
          data={data}
          handleCloseModal={closeModal}
          showModal={showModal}
          headerTitle={headerTitle}
          handleChange={handleChangeSelect}
        />
      }
      footer={
        <ModalWorkflowFooter
          user={user?.data}
          data={data}
          handleSubmit={handleSubmit}
          handleReject={handleReject}
        />
      }
    >
      <div className="p-5 w-[61rem] relative h-full">
        <p className="text-sm font-semibold">Deskripsi</p>
        <p className="text-sm text-justify">
          Sebagai auditor, saya dengan ini menyatakan kesediaan untuk
          melanjutkan dan menyetujui pembuatan proyek EWP P.A.T. ini. Saya
          berkomitmen untuk mengikuti segala proses, tahapan, dan tanggung jawab
          yang terkait dengan pelaksanaan proyek tersebut. Saya juga memahami
          dan menerima segala konsekuensi yang mungkin timbul selama pelaksanaan
          proyek ini, serta berjanji untuk mematuhi semua ketentuan dan prosedur
          yang telah ditetapkan demi keberhasilan proyek ini.
          <br />
          <br />
          Saya mengakui pentingnya peran saya dalam memastikan bahwa semua
          langkah dan tahapan dalam proyek ini dilaksanakan dengan baik dan
          sesuai dengan rencana. Oleh karena itu, saya akan memberikan dukungan
          penuh dan kerjasama yang diperlukan untuk mencapai tujuan yang telah
          ditetapkan. Saya juga berkomitmen untuk melaporkan setiap hambatan
          atau masalah yang mungkin terjadi selama proses pelaksanaan proyek,
          agar dapat segera diatasi demi kelancaran dan kesuksesan proyek ini,
          serta memastikan bahwa semua temuan dan rekomendasi audit
          ditindaklanjuti dengan tepat.
        </p>
      </div>
    </ModalScroll>
  );
};

export default ModalApproveProjectPat;

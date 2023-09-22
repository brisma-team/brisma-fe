import { ButtonIcon, Card, DivButton } from "@/components/atoms";
import { IconEdit, IconInfo, IconTrash } from "@/components/icons";
import { useActivitySchedule, useKategoriAnggaran } from "@/data/pat";
import { useDispatch } from "react-redux";
import { convertToRupiah, deleteSwal } from "@/helpers";
import { setActivityScheduleData } from "@/slices/pat/activityScheduleSlice";
import { ModalActivityScheduleDetail } from "./jadwal-kegiatan";

const Content = ({ title, text, textJustify }) => {
  return (
    <div className="w-full text-base my-2">
      <div className="font-semibold">{title}</div>
      {Array.isArray(text) ? (
        text.map((v, i) => {
          return (
            <div key={i} className={`${textJustify && `text-justify`}`}>
              {v}
            </div>
          );
        })
      ) : (
        <div className={textJustify && "text-justify"}>{text}</div>
      )}
    </div>
  );
};

const CardActivitySchedule = ({
  jadwal_sbp_id,
  pat_id,
  type,
  title,
  maker,
  audit_period,
  budget,
  pic,
  desc,
  setShowModal,
  setTypeModal,
  showModalDetail,
  setShowModalDetail,
  scheduleId,
  setScheduleId,
}) => {
  const dispatch = useDispatch();
  const { activitySchedule } = useActivitySchedule("detail", {
    id: pat_id,
    jadwal_sbp_id,
  });
  const { kategoriAnggaran } = useKategoriAnggaran();

  const handlerUpdate = () => {
    const jadwalData = activitySchedule.data.jadwal;

    const mappingUker = activitySchedule.data.auditee_jadwal_sbp.map((v) => {
      return {
        ref_auditee_orgeh_kode: v.ref_auditee_orgeh_kode,
        ref_auditee_orgeh_name: v.ref_auditee_orgeh_name,
        ref_auditee_branch_kode: v.ref_auditee_branch_kode,
        ref_auditee_branch_name: v.ref_auditee_branch_name,
        tipe_uker: v.tipe_uker,
        attachments: v.attachments,
      };
    });

    const mappingAnggaranKegiatan = activitySchedule.data.anggaran_kegiatan.map(
      (v) => {
        return {
          ref_sub_kategori_anggaran_kode: v.ref_sub_kategori_anggaran_kode,
          amount: parseInt(v.amount),
        };
      }
    );

    const getDataFromKategori = (ref_sub_kategori_anggaran_kode) => {
      const dataKategori = kategoriAnggaran.data.find((data) =>
        data.ref_sub_kategori_anggarans.some(
          (item) =>
            item.nama ===
            ref_sub_kategori_anggaran_kode.ref_sub_kategori_anggaran_name
        )
      );
      return dataKategori ? dataKategori.nama : null;
    };

    const anggaranKegiatan = mappingAnggaranKegiatan.reduce((result, data) => {
      const { ref_sub_kategori_anggaran_kode, amount } = data;
      const nama = getDataFromKategori(ref_sub_kategori_anggaran_kode);

      if (nama) {
        const existingData = result.find((item) => item.nama === nama);

        if (existingData) {
          existingData.ref_sub_kategori_anggarans.push({
            ref_sub_kategori_anggaran_kode,
            amount: parseInt(amount),
          });
        } else {
          result.push({
            nama,
            ref_sub_kategori_anggarans: [
              {
                ref_sub_kategori_anggaran_kode,
                amount: parseInt(amount),
              },
            ],
          });
        }
      }

      return result;
    }, []);

    const mappingAnggaranDinas = activitySchedule.data.anggaran_dinas.map(
      (v) => {
        const {
          pn_auditor,
          biaya_tiket_pp,
          biaya_transport_lokal,
          biaya_perjalanan_hari,
          biaya_akomodasi,
        } = v;

        return {
          pn_auditor,
          biaya_tiket_pp: parseInt(biaya_tiket_pp),
          biaya_transport_lokal: parseInt(biaya_transport_lokal),
          biaya_perjalanan_hari: parseInt(biaya_perjalanan_hari),
          biaya_akomodasi: parseInt(biaya_akomodasi),
        };
      }
    );

    const mappingPIC = activitySchedule.data.penanggung_jawab.map((v) => {
      const { pn, nama, jabatan } = v;
      return { pn, nama, jabatan };
    });

    const mapping = {
      jadwal_sbp_id: jadwalData.id,
      pat_id: jadwalData.pat_id,
      nama: jadwalData.nama,
      ref_metode: jadwalData.ref_metode,
      ref_tipe: jadwalData.ref_tipe,
      ref_jenis: jadwalData.ref_jenis,
      ref_tema: jadwalData.ref_tema,
      pelaksanaan_start: jadwalData.pelaksanaan_start,
      pelaksanaan_end: jadwalData.pelaksanaan_end,
      deskripsi: jadwalData.deskripsi,
      uker: mappingUker,
      penanggung_jawab: mappingPIC,
      anggaran_kegiatan: anggaranKegiatan,
      anggaran_dinas: mappingAnggaranDinas,
    };

    dispatch(setActivityScheduleData(mapping));
    setTypeModal("update");
    setShowModal(true);
  };

  const handleDelete = (jadwal_sbp_id) => {
    deleteSwal(
      "Apakah anda yakin ingin menghapus data ini?",
      "Data ini dihapus seacara permanen",
      `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/sbp?jadwal_sbp_id=${jadwal_sbp_id}&pat_id=${pat_id}`
    );
  };

  return (
    <DivButton
      className="my-2 hover:bg-gray-100 hover:rounded-[10px] hover:no-underline"
      handleClick={() => console.log("test")}
    >
      <Card>
        <div className="w-full px-5 py-3">
          <div className="flex mb-2 justify-between items-end -ml-5 -mt-5">
            <div
              className={`text-base font-semibold rounded-tl-lg text-brisma ${
                type?.toLowerCase() === "lain-lain"
                  ? "bg-[#C094C4]"
                  : "bg-[#AED3C3]"
              } px-5 h-9 flex items-center justify-center`}
            >
              <p>{type.toUpperCase()}</p>
            </div>
            {showModalDetail && (
              <ModalActivityScheduleDetail
                patId={pat_id}
                scheduleId={scheduleId}
                showModal={showModalDetail}
                setShowModal={setShowModalDetail}
              />
            )}
            <div className="flex w-20 justify-between -mb-1.5">
              <ButtonIcon
                color={"blue"}
                icon={<IconInfo size="medium" />}
                handleClick={() => (
                  setShowModalDetail(true), setScheduleId(jadwal_sbp_id)
                )}
              />
              <ButtonIcon
                color={"yellow"}
                icon={<IconEdit size="medium" />}
                handleClick={handlerUpdate}
              />
              <ButtonIcon
                color={"red"}
                icon={<IconTrash size="medium" />}
                handleClick={() => handleDelete(jadwal_sbp_id, pat_id)}
              />
            </div>
          </div>
          <div className="flex flex-row justify-between mb-3">
            <div className="text-xl font-bold text-atlasian-blue-dark">
              {title}
            </div>
          </div>
          <div className="leading-3">
            <div className="w-full">
              <div className="flex justify-between gap-2">
                <Content title={"Maker"} text={maker} />
                <Content title={"Periode Kegiatan"} text={audit_period} />
              </div>
              <Content
                title={"Anggaran"}
                text={`Rp. ${convertToRupiah(budget)}`}
              />
              <Content title={"P.I.C"} text={pic} />
              <Content title={"Deskripsi"} text={desc} textJustify={true} />
            </div>
          </div>
        </div>
      </Card>
    </DivButton>
  );
};

export default CardActivitySchedule;

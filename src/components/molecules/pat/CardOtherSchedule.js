import { Card, DivButton, LinkIcon } from "@/components/atoms";
import { IconEdit, IconInfo, IconTrash } from "@/components/icons";
import { useActivityScheduleOther, useKategoriAnggaran } from "@/data/pat";
import { useDispatch } from "react-redux";
import { setActivityScheduleOtherData } from "@/slices/pat/activityScheduleOtherSlice";
import { convertToRupiah, deleteSwal } from "@/helpers";
import { ModalOtherScheduleDetail } from "./jadwal-lainnya";

const Content = ({
  title,
  text,
  textJustify,
  justifyBetween,
  isArrayObject,
}) => {
  return (
    <div
      className={`w-full text-base my-2 ${
        justifyBetween && `flex justify-between`
      }`}
    >
      <div className="font-semibold">{title}</div>
      {isArrayObject ? (
        text.map((v, i) => {
          return (
            <div key={i} className={`flex justify-between`}>
              <div>{v.title}</div>
              <div>{v.value}</div>
            </div>
          );
        })
      ) : Array.isArray(text) ? (
        text.map((v, i) => {
          return (
            <div
              key={i}
              className={`${textJustify && `text-justify`} ${
                justifyBetween && `flex justify-end`
              }`}
            >
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

const CardOtherSchedule = ({
  kegiatan_lain_id,
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
  mutate,
}) => {
  const dispatch = useDispatch();
  const { activityScheduleOther } = useActivityScheduleOther("detail", {
    id: pat_id,
    kegiatan_lain_id,
  });
  const { kategoriAnggaran } = useKategoriAnggaran();

  const handlerUpdate = () => {
    const jadwalData = activityScheduleOther.data.jadwal;

    const mappingUker = activityScheduleOther.data.auditee_kegiatan_lain.map(
      (v) => {
        return {
          ref_auditee_orgeh_kode: v.ref_auditee_orgeh_kode,
          ref_auditee_orgeh_name: v.ref_auditee_orgeh_name,
          ref_auditee_branch_kode: v.ref_auditee_branch_kode,
          ref_auditee_branch_name: v.ref_auditee_branch_name,
          tipe_uker: v.tipe_uker,
          attachments: v.attachments,
        };
      }
    );

    const mappingAnggaranKegiatan =
      activityScheduleOther.data.anggaran_kegiatan.map((v) => {
        return {
          ref_sub_kategori_anggaran_kode: v.ref_sub_kategori_anggaran_kode,
          amount: parseInt(v.amount),
        };
      });

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

    const mappingAnggaranDinas = activityScheduleOther.data.anggaran_dinas.map(
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

    const mappingPIC = activityScheduleOther.data.penanggung_jawab.map((v) => {
      const { pn, nama, jabatan } = v;
      return { pn, nama, jabatan };
    });

    const mapping = {
      jadwal_audit_id: jadwalData.id,
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

    dispatch(setActivityScheduleOtherData(mapping));
    setTypeModal("update");
    setScheduleId(kegiatan_lain_id);
    setShowModal(true);
  };

  const handleDelete = (kegiatan_lain_id) => {
    deleteSwal(
      "Apakah anda yakin ingin menghapus data ini?",
      "Data ini dihapus seacara permanen",
      `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/lain?kegiatan_lain_id=${kegiatan_lain_id}`
    );
    mutate();
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
              <ModalOtherScheduleDetail
                patId={pat_id}
                scheduleId={scheduleId}
                showModal={showModalDetail}
                setShowModal={setShowModalDetail}
              />
            )}
            <div className="flex w-20 justify-between -mb-1.5">
              <LinkIcon
                color={"blue"}
                icon={<IconInfo size="medium" />}
                handler={() => (
                  setShowModalDetail(true), setScheduleId(kegiatan_lain_id)
                )}
              />
              <LinkIcon
                color={"yellow"}
                icon={<IconEdit size="medium" />}
                handler={handlerUpdate}
              />
              <LinkIcon
                color={"red"}
                icon={<IconTrash size="medium" />}
                handler={() => handleDelete(kegiatan_lain_id)}
              />
            </div>
          </div>
          <div className="flex flex-row justify-between mb-3">
            <div className="text-xl font-bold text-atlasian-blue-dark">
              {title}
            </div>
          </div>
          <div className="leading-3">
            <div className="w-full flex">
              <div className="w-8/12">
                <Content title={"Maker"} text={maker} />
              </div>
              <div className="w-4/12">
                <Content title={"Periode Kegiatan"} text={audit_period} />
              </div>
            </div>
            <Content
              title={"Anggaran"}
              text={`Rp. ${convertToRupiah(budget)}`}
            />
            <Content title={"P.I.C"} text={pic} />
            <Content title={"Deskripsi"} text={desc} textJustify={true} />
          </div>
        </div>
      </Card>
    </DivButton>
  );
};

export default CardOtherSchedule;

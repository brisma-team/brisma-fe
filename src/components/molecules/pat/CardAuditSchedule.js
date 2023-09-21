import { ButtonIcon, Card, DivButton } from "@/components/atoms";
import { IconEdit, IconInfo, IconTrash } from "@/components/icons";
import { convertDate, convertToRupiah, deleteSwal, splitWord } from "@/helpers";
import { setAuditScheduleData } from "@/slices/pat/auditScheduleSlice";
import { useDispatch } from "react-redux";
import { useAuditSchedule, useKategoriAnggaran } from "@/data/pat";
import { ModalAuditScheduleDetail } from "./jadwal-audit";

const CardBodyContent = ({ title, text, textJustify }) => {
  return (
    <div className="w-full text-base my-2">
      <div className="font-semibold">{title}</div>
      <div className={textJustify && "text-justify"}>{text}</div>
    </div>
  );
};

const CardAuditSchedule = ({
  jadwal_id,
  pat_id,
  type,
  title,
  maker,
  audit_team,
  start_date,
  end_date,
  budget,
  audit_type,
  tema,
  desc,
  setShowModal,
  setTypeModal,
  showModalDetail,
  setShowModalDetail,
  scheduleId,
  setScheduleId,
}) => {
  const dispatch = useDispatch();
  const { auditSchedule } = useAuditSchedule("detail", {
    id: pat_id,
    jadwal_id,
  });
  const { kategoriAnggaran } = useKategoriAnggaran();

  const handlerUpdate = () => {
    const jadwalData = auditSchedule?.data?.jadwal;
    const mappingEchannel = auditSchedule?.data?.echannel?.map((v) => {
      return {
        ref_echanel_type_kode: {
          kode: v.ref_echanel_type_kode.kode,
          name: splitWord(v.ref_echanel_type_kode.name, "."),
        },
        jumlah_existing: v.jumlah_existing,
        jumlah_target: v.jumlah_target,
        posisi_data: v.posisi_data,
      };
    });

    const mappingUker = auditSchedule?.data?.auditee_jadwal_audit?.map((v) => {
      return {
        ref_auditee_orgeh_kode: v.ref_auditee_orgeh_kode,
        ref_auditee_orgeh_name: v.ref_auditee_orgeh_name,
        ref_auditee_branch_kode: v.ref_auditee_branch_kode,
        ref_auditee_branch_name: v.ref_auditee_branch_name,
        tipe_uker: v.tipe_uker,
        attachments: v.attachments,
      };
    });

    const mappingAnggaranKegiatan = auditSchedule?.data?.anggaran_kegiatan?.map(
      (v) => {
        return {
          ref_sub_kategori_anggaran_kode: v.ref_sub_kategori_anggaran_kode,
          amount: parseInt(v.amount),
        };
      }
    );

    const getDataFromKategori = (ref_sub_kategori_anggaran_kode) => {
      const dataKategori = kategoriAnggaran?.data?.find((data) =>
        data.ref_sub_kategori_anggarans.some(
          (item) =>
            item.nama ===
            ref_sub_kategori_anggaran_kode.ref_sub_kategori_anggaran_name
        )
      );
      return dataKategori ? dataKategori.nama : null;
    };

    const anggaranKegiatan = mappingAnggaranKegiatan?.reduce((result, data) => {
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

    const mappingAnggaranDinas = auditSchedule?.data?.anggaran_dinas?.map(
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

    const mapping = {
      jadwal_audit_id: jadwalData?.id,
      pat_id: jadwalData?.pat_id,
      name_kegiatan_audit: jadwalData?.name_kegiatan_audit,
      ref_metode: jadwalData?.ref_metode,
      ref_tipe: jadwalData?.ref_tipe,
      ref_jenis: jadwalData?.ref_jenis,
      ref_tema: jadwalData?.ref_tema,
      pelaksanaan_start: jadwalData?.pelaksanaan_start,
      pelaksanaan_end: jadwalData?.pelaksanaan_end,
      deskripsi: jadwalData?.deskripsi,
      uker: mappingUker,
      echannel: mappingEchannel,
      tim_audit_id: jadwalData?.tim_audit_id,
      anggaran_kegiatan: anggaranKegiatan,
      anggaran_dinas: mappingAnggaranDinas,
    };

    dispatch(setAuditScheduleData(mapping));
    setTypeModal("update");
    setShowModal(true);
  };

  const handleDelete = (jadwal_id, pat_id) => {
    deleteSwal(
      "Apakah anda yakin ingin menghapus data ini?",
      "Data ini dihapus seacara permanen",
      `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/audit?jadwal_id=${jadwal_id}&pat_id=${pat_id}`
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
                type?.toLowerCase() === "individual"
                  ? "bg-blue-300"
                  : "bg-[#F4E3A4]"
              } px-5 h-9 flex items-center justify-center`}
            >
              <p>{type?.toUpperCase()}</p>
            </div>
            {showModalDetail && (
              <ModalAuditScheduleDetail
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
                  setShowModalDetail(true), setScheduleId(jadwal_id)
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
                handleClick={() => handleDelete(jadwal_id, pat_id)}
              />
            </div>
          </div>
          <div className="flex flex-row justify-between mb-6">
            <div className="text-xl font-bold text-atlasian-blue-dark">
              {title}
            </div>
          </div>
          <div className="leading-3">
            <div className="w-full flex">
              <div className="w-8/12">
                <CardBodyContent title={"Maker"} text={maker} />
              </div>
              <div className="w-4/12">
                <CardBodyContent title={"Jenis Audit"} text={audit_type} />
              </div>
            </div>
            <div className="w-full flex">
              <div className="w-8/12">
                <CardBodyContent title={"Tim Audit"} text={audit_team} />
              </div>
              <div className="w-4/12">
                <CardBodyContent title={"Tema"} text={tema} />
              </div>
            </div>
            <div className="w-full flex">
              <div className="w-8/12">
                <CardBodyContent
                  title={"Periode Kegiatan"}
                  text={`${convertDate(start_date, "-")} s/d ${convertDate(
                    end_date,
                    "-"
                  )}`}
                />
              </div>
              <div className="w-4/12">
                <CardBodyContent
                  title={"Anggaran"}
                  text={`Rp. ${convertToRupiah(budget)}`}
                />
              </div>
            </div>
            <div className="w-full">
              <CardBodyContent
                title={"Deskripsi"}
                text={desc}
                textJustify={true}
              />
            </div>
          </div>
        </div>
      </Card>
    </DivButton>
  );
};

export default CardAuditSchedule;

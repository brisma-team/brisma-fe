import { DivButton, ModalScroll } from "@/components/atoms";
import { useEffect, useState } from "react";
import {
  ModalBodyInfoKegiatan,
  ModalBodyObjekAudit,
  ModalBodyAnggaran,
} from "./sub-modal";
import { useSelector, useDispatch } from "react-redux";
import {
  confirmationSwal,
  setErrorValidation,
  splitWord,
  usePostData,
  useUpdateData,
} from "@/helpers";
import { useRouter } from "next/router";
import { ModalHeader, ModalFooter } from "@/components/molecules/pat";
import {
  activityInfoSchema,
  activityObjectSchema,
} from "@/helpers/schemas/pat/auditScheduleSchema";
import {
  setvalidationErrorsAI,
  setvalidationErrorsAO,
  resetvalidationErrorsAI,
  resetvalidationErrorsAO,
  resetAuditScheduleData,
  setAuditScheduleData,
} from "@/slices/pat/auditScheduleSlice";
import { useAuditSchedule, useKategoriAnggaran } from "@/data/pat";

const ModalAuditSchedule = ({
  showModal,
  setShowModal,
  typeModal,
  mutate,
  selectedScheduleId,
}) => {
  const { id } = useRouter().query;
  const dispatch = useDispatch();

  const [currentModalStage, setCurrentModalStage] = useState(1);
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const auditScheduleData = useSelector(
    (state) => state.auditSchedule.auditScheduleData
  );

  const { auditSchedule } = useAuditSchedule("detail", {
    id,
    jadwal_id: selectedScheduleId,
  });
  const { kategoriAnggaran } = useKategoriAnggaran();

  const schemaMappings = {
    1: {
      schema: activityInfoSchema,
      resetErrors: resetvalidationErrorsAI,
      setErrors: setvalidationErrorsAI,
    },
    2: {
      schema: activityObjectSchema,
      resetErrors: resetvalidationErrorsAO,
      setErrors: setvalidationErrorsAO,
    },
  };

  useEffect(() => {
    if (typeModal === "detail") {
      setIsFormDisabled(true);
    } else if (typeModal === "update") {
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

      const mappingUker = auditSchedule?.data?.auditee_jadwal_audit?.map(
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
        auditSchedule?.data?.anggaran_kegiatan?.map((v) => {
          return {
            ref_sub_kategori_anggaran_kode: v.ref_sub_kategori_anggaran_kode,
            amount: parseInt(v.amount),
          };
        });

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

      const anggaranKegiatan = mappingAnggaranKegiatan?.reduce(
        (result, data) => {
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
        },
        []
      );

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
    }
  }, [auditSchedule, typeModal, showModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const buttonName = e.target.textContent;
    const combinedAnggaranKegiatan = auditScheduleData.anggaran_kegiatan.reduce(
      (result, item) => {
        return [...result, ...item.ref_sub_kategori_anggarans];
      },
      []
    );

    const filterEchannel = auditScheduleData.echannel.filter(
      (v) => v.posisi_data !== ""
    );

    const data = {
      ...auditScheduleData,
      pat_id: id,
      anggaran_kegiatan: combinedAnggaranKegiatan,
      echannel: filterEchannel,
    };

    const validate = setErrorValidation(
      data,
      dispatch,
      schemaMappings[currentModalStage]
    );

    if ((validate && currentModalStage > 1) || currentModalStage === 3) {
      if (buttonName === "Simpan") {
        if (typeModal === "update") {
          await useUpdateData(
            `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/audit`,
            data
          );
        } else {
          await usePostData(
            `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/audit/create`,
            data
          );
        }
        mutate();
        setShowModal(false);
        setCurrentModalStage(1);
        dispatch(resetvalidationErrorsAI());
        dispatch(resetvalidationErrorsAO());
        dispatch(resetAuditScheduleData());
      }
    }
  };

  const handleNextStage = async () => {
    const validate = setErrorValidation(
      auditScheduleData,
      dispatch,
      schemaMappings[currentModalStage]
    );

    if (validate && currentModalStage < 3) {
      setCurrentModalStage(currentModalStage + 1);
    }
  };

  const handleCloseModal = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );

    if (!confirm.value) {
      return;
    }

    setShowModal(false);
    setCurrentModalStage(1);
    dispatch(resetvalidationErrorsAI());
    dispatch(resetvalidationErrorsAO());
    dispatch(resetAuditScheduleData());
  };

  const items = [
    {
      id: "step-1",
      label: (
        <DivButton handleClick={() => setCurrentModalStage(1)}>
          Info Kegiatan
        </DivButton>
      ),
      percentageComplete: currentModalStage > 1 ? 100 : 0,
      status: currentModalStage === 1 ? "current" : "visited",
    },
    {
      id: "step-2",
      label: (
        <DivButton handleClick={() => setCurrentModalStage(2)}>
          Objek Audit
        </DivButton>
      ),
      percentageComplete: currentModalStage > 2 ? 100 : 0,
      status: currentModalStage === 2 ? "current" : "visited",
    },
    {
      id: "step-3",
      label: (
        <DivButton handleClick={() => setCurrentModalStage(3)}>
          Anggaran
        </DivButton>
      ),
      percentageComplete: 0,
      status: currentModalStage === 3 ? "current" : "visited",
    },
  ];

  return (
    <ModalScroll
      showModal={showModal}
      header={
        <ModalHeader
          headerText={"Buat Jadwal Audit"}
          progressItems={items}
          handleCloseModal={handleCloseModal}
          showModal={showModal}
        />
      }
      footer={
        <ModalFooter
          currentModalStage={currentModalStage}
          handleSubmit={handleSubmit}
          handleNextStage={handleNextStage}
        />
      }
    >
      {currentModalStage === 1 && (
        <ModalBodyInfoKegiatan
          setCurrentModalStage={setCurrentModalStage}
          isDisabled={isFormDisabled}
        />
      )}
      {currentModalStage === 2 && (
        <ModalBodyObjekAudit
          setCurrentModalStage={setCurrentModalStage}
          isDisabled={isFormDisabled}
        />
      )}
      {currentModalStage === 3 && (
        <ModalBodyAnggaran
          setCurrentModalStage={setCurrentModalStage}
          isDisabled={isFormDisabled}
        />
      )}
    </ModalScroll>
  );
};

export default ModalAuditSchedule;

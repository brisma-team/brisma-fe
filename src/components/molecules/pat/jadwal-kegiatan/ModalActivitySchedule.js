import { DivButton, Modal } from "@/components/atoms";
import { useState } from "react";
import {
  ModalBodyActivityInfo,
  ModalBodyActivityObject,
  ModalBodyBudget,
} from "./sub-modal";
import { useSelector, useDispatch } from "react-redux";
import {
  confirmationSwal,
  setErrorValidation,
  usePostData,
  useUpdateData,
} from "@/helpers";
import { useRouter } from "next/router";
import { ModalHeader, ModalFooter } from "@/components/molecules/pat";
import {
  activityInfoSchema,
  activityObjectSchema,
} from "@/helpers/schemas/pat/activityScheduleSchema";
import {
  setvalidationErrorsAI,
  setvalidationErrorsAO,
  resetvalidationErrorsAI,
  resetvalidationErrorsAO,
  resetActivityScheduleData,
  setActivityScheduleData,
} from "@/slices/pat/activityScheduleSlice";
import { useEffect } from "react";
import { useActivitySchedule, useKategoriAnggaran } from "@/data/pat";

const ModalActivitySchedule = ({
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
  const [isDisabledButtonSave, setIsDisabledButtonSave] = useState(true);
  const activityScheduleData = useSelector(
    (state) => state.activitySchedule.activityScheduleData
  );

  const { activitySchedule, activityScheduleMutate } = useActivitySchedule(
    "detail",
    {
      id,
      jadwal_sbp_id: selectedScheduleId,
    }
  );
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
    const {
      nama,
      ref_metode,
      ref_tipe,
      ref_jenis,
      pelaksanaan_start,
      pelaksanaan_end,
      penanggung_jawab,
      uker,
    } = activityScheduleData;

    const areFieldsValid =
      nama &&
      ref_metode.kode &&
      ref_tipe.kode &&
      ref_jenis.kode &&
      pelaksanaan_start &&
      pelaksanaan_end &&
      penanggung_jawab.length &&
      uker.length;

    setIsDisabledButtonSave(!areFieldsValid);
  }, [activityScheduleData]);

  useEffect(() => {
    if (typeModal === "detail") {
      setIsFormDisabled(true);
    } else if (typeModal === "update") {
      const jadwalData = activitySchedule?.data?.jadwal;
      const mappingUker = activitySchedule?.data?.auditee_jadwal_sbp.map(
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
        activitySchedule?.data?.anggaran_kegiatan.map((v) => {
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

      const mappingAnggaranDinas = activitySchedule?.data?.anggaran_dinas.map(
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

      const mappingPIC = activitySchedule?.data?.penanggung_jawab.map((v) => {
        const { pn, nama, jabatan } = v;
        return { pn, nama, jabatan };
      });

      const mapping = {
        jadwal_sbp_id: jadwalData?.id,
        pat_id: jadwalData?.pat_id,
        nama: jadwalData?.nama,
        ref_metode: jadwalData?.ref_metode,
        ref_tipe: jadwalData?.ref_tipe,
        ref_jenis: jadwalData?.ref_jenis,
        ref_tema: jadwalData?.ref_tema,
        pelaksanaan_start: jadwalData?.pelaksanaan_start,
        pelaksanaan_end: jadwalData?.pelaksanaan_end,
        deskripsi: jadwalData?.deskripsi,
        uker: mappingUker,
        penanggung_jawab: mappingPIC,
        anggaran_kegiatan: anggaranKegiatan,
        anggaran_dinas: mappingAnggaranDinas,
      };

      dispatch(setActivityScheduleData(mapping));
    }
  }, [activitySchedule, showModal, typeModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const buttonName = e.target.textContent;
    const combinedActivityBudget =
      activityScheduleData.anggaran_kegiatan.reduce((result, item) => {
        return [...result, ...item.ref_sub_kategori_anggarans];
      }, []);

    const data = {
      ...activityScheduleData,
      pat_id: id,
      anggaran_kegiatan: combinedActivityBudget,
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
            `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/sbp`,
            data
          );
          activityScheduleMutate();
        } else {
          await usePostData(
            `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/sbp/create`,
            data
          );
        }
        mutate();
        setShowModal(false);
        setCurrentModalStage(1);
        dispatch(resetvalidationErrorsAI());
        dispatch(resetvalidationErrorsAO());
        dispatch(resetActivityScheduleData());
      }
    }
  };

  const handleNextStage = async () => {
    const validate = setErrorValidation(
      activityScheduleData,
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
    dispatch(resetActivityScheduleData());
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
    <Modal
      showModal={showModal}
      header={
        <ModalHeader
          headerText={"Buat Jadwal Kegiatan"}
          progressItems={items}
          handleCloseModal={handleCloseModal}
          showModal={showModal}
        />
      }
      footer={
        <ModalFooter
          isDisabled={isDisabledButtonSave}
          currentModalStage={currentModalStage}
          handleSubmit={handleSubmit}
          handleNextStage={handleNextStage}
        />
      }
    >
      {currentModalStage === 1 && (
        <ModalBodyActivityInfo
          setCurrentModalStage={setCurrentModalStage}
          isDisabled={isFormDisabled}
        />
      )}
      {currentModalStage === 2 && (
        <ModalBodyActivityObject
          setCurrentModalStage={setCurrentModalStage}
          isDisabled={isFormDisabled}
        />
      )}
      {currentModalStage === 3 && (
        <ModalBodyBudget
          setCurrentModalStage={setCurrentModalStage}
          isDisabled={isFormDisabled}
        />
      )}
    </Modal>
  );
};

export default ModalActivitySchedule;

import { DivButton, Modal } from "@/components/atoms";
import { useState } from "react";
import {
  ModalBodyActivityObject,
  ModalBodyActivityInfo,
  ModalBodyBudget,
} from "./sub-modal";
import {
  confirmationSwal,
  setErrorValidation,
  usePostData,
  useUpdateData,
} from "@/helpers";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { ModalHeader, ModalFooter } from "@/components/molecules/pat";
import {
  activityInfoSchema,
  activityObjectSchema,
} from "@/helpers/schemas/pat/otherScheduleSchema";
import {
  setvalidationErrorsAI,
  setvalidationErrorsAO,
  resetvalidationErrorsAI,
  resetvalidationErrorsAO,
  resetOtherScheduleData,
  setActivityScheduleOtherData,
} from "@/slices/pat/activityScheduleOtherSlice";
import { useEffect } from "react";
import { useActivityScheduleOther, useKategoriAnggaran } from "@/data/pat";

const ModalOtherSchedule = ({
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
  const activityScheduleOtherData = useSelector(
    (state) => state.activityScheduleOther.activityScheduleOtherData
  );

  const { activityScheduleOther, activityScheduleOtherMutate } =
    useActivityScheduleOther("detail", {
      id,
      kegiatan_lain_id: selectedScheduleId,
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
      const jadwalData = activityScheduleOther?.data?.jadwal;
      const mappingUker =
        activityScheduleOther?.data?.auditee_kegiatan_lain?.map((v) => {
          return {
            ref_auditee_orgeh_kode: v.ref_auditee_orgeh_kode,
            ref_auditee_orgeh_name: v.ref_auditee_orgeh_name,
            ref_auditee_branch_kode: v.ref_auditee_branch_kode,
            ref_auditee_branch_name: v.ref_auditee_branch_name,
            tipe_uker: v.tipe_uker,
            attachments: v.attachments,
          };
        });

      const mappingAnggaranKegiatan =
        activityScheduleOther?.data?.anggaran_kegiatan?.map((v) => {
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

      const mappingAnggaranDinas =
        activityScheduleOther?.data?.anggaran_dinas.map((v) => {
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
        });

      const mappingPIC = activityScheduleOther?.data?.penanggung_jawab?.map(
        (v) => {
          const { pn, nama, jabatan } = v;
          return { pn, nama, jabatan };
        }
      );

      const mapping = {
        kegiatan_lain_id: jadwalData?.id,
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

      dispatch(setActivityScheduleOtherData(mapping));
    }
  }, [activityScheduleOther]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const buttonName = e.target.textContent;
    const combinedActivityBudget =
      activityScheduleOtherData.anggaran_kegiatan.reduce((result, item) => {
        return [...result, ...item.ref_sub_kategori_anggarans];
      }, []);

    const data = {
      ...activityScheduleOtherData,
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
            `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/lain`,
            data
          );
          activityScheduleOtherMutate();
        } else {
          await usePostData(
            `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/lain/create`,
            data
          );
        }
        mutate();
        setShowModal(false);
        setCurrentModalStage(1);
        dispatch(resetvalidationErrorsAI());
        dispatch(resetvalidationErrorsAO());
        dispatch(resetOtherScheduleData());
      }
    }
  };

  const handleNextStage = async () => {
    const validate = setErrorValidation(
      activityScheduleOtherData,
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
    dispatch(resetOtherScheduleData());
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
          Objek Kegiatan
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
          headerText={"Buat Jadwal Kegiatan Lain"}
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

export default ModalOtherSchedule;

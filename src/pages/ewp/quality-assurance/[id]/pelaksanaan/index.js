import { Breadcrumbs, PageTitle } from "@/components/atoms";
import { LandingLayoutEWPQualityAssurance } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useAuditInfo } from "@/data/ewp/common/info";
import {
  usePelaksanaan,
  usePelaksanaanDetail,
} from "@/data/ewp/quality-assurance/pelaksanaan";
import {
  ModalDetailPelaksanaan,
  ModalEditJadwal,
  TablePelaksanaan,
} from "@/components/molecules/ewp/quality-assurance/pelaksanaan";
import _ from "lodash";
import {
  setObjData,
  setObjPayload,
  resetObjData,
  resetObjPayload,
} from "@/slices/ewp/quality-assurance/pelaksanaan/pelaksanaanEWPQualityAssuranceSlice";
import { useDispatch, useSelector } from "react-redux";
import { CardContentHeaderFooter } from "@/components/molecules/commons";
import { confirmationSwal, fetchApi, infoSwal, loadingSwal } from "@/helpers";
import useUser from "@/data/useUser";

const index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [params, setParams] = useState({
    id: 0,
  });
  const baseUrl = `/ewp/quality-assurance/${params?.id}`;
  const pathName = `${baseUrl}/pelaksanaan`;

  const [selectedId, setSelectedId] = useState(0);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [showModalDetailPelaksanaan, setShowModalDetailPelaksanaan] =
    useState(false);
  const [showModalEditSchedule, setShowModalEditSchedule] = useState(false);

  const [isCloseSubmodule, setIsCloseSubmodule] = useState(false);
  // const [isOnProgress, setIsOnProgress] = useState(true);
  const [isInitiator, setIsInitiator] = useState(false);

  const data = useSelector(
    (state) => state.pelaksanaanEWPQualityAssurance.objData
  );
  const payload = useSelector(
    (state) => state.pelaksanaanEWPQualityAssurance.objPayload
  );

  const { auditInfo } = useAuditInfo({ module: "qa", id: params?.id });
  const { pelaksanaan, pelaksanaanMutate } = usePelaksanaan({
    id: params?.id,
  });
  const {
    pelaksanaanDetail,
    pelaksanaanDetailMutate,
    pelaksanaanDetailIsLoading,
  } = usePelaksanaanDetail({
    id: selectedId,
  });

  const { user } = useUser();

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    setParams({
      id,
    });
  }, [router.isReady]);

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "EWP", path: "/ewp" },
      { name: "Overview", path: "/ewp/quality-assurance" },
      {
        name: `${auditInfo?.data?.project_info?.project_id?.toUpperCase()}`,
        path: baseUrl + "/info",
      },
      {
        name: `Pelaksanaan`,
        path: pathName,
      },
      {
        name: `Jadwal Survei`,
        path: pathName,
      },
    ]);
    setIsCloseSubmodule(
      Boolean(auditInfo?.data?.realisasi?.pelaksanaan_audit_real_end)
    );
    setIsInitiator(
      Boolean(auditInfo?.data?.project_info?.initiator?.pn == user?.data?.pn)
    );
  }, [auditInfo]);

  useEffect(() => {
    if (pelaksanaan?.data?.length) {
      const mapping = pelaksanaan?.data?.map((project) => {
        return {
          id: project?.id,
          ewp_id: project?.mapa_project_audit?.ewp_id,
          mapa_id: project?.mapa_project_id,
          tahun: project?.mapa_project_audit?.tahun,
          project_id: project?.mapa_project_audit?.project_id,
          judul: project?.mapa_project_audit?.project_name,
          project_survei_id: project?.project_survey?.project_survey_id,
          survei_id: project?.project_survey?.id,
          petugas: project?.mapa_project_audit?.mapa_project_petugas?.length
            ? project?.mapa_project_audit?.mapa_project_petugas?.map(
                (petugas) => {
                  return _.pick(petugas, ["pn", "nama"]);
                }
              )
            : [],
          status_survei: project?.project_survey?.status_name,
          mtd_tipe: project?.mapa_project_audit?.mtd_tipe,
          mtd_jenis: project?.mapa_project_audit?.mtd_jenis,
          analisa: project?.mapa_project_audit?.analisa,
          is_close: project?.is_na,
        };
      });
      dispatch(setObjData(mapping));
    } else {
      dispatch(resetObjData());
    }
  }, [pelaksanaan]);

  useEffect(() => {
    if (pelaksanaanDetail?.data) {
      const response = pelaksanaanDetail?.data;
      dispatch(
        setObjPayload({
          id: response?.id,
          project_id: response?.mapa_project_audit?.project_id,
          project_name: response?.mapa_project_audit?.project_name,
          survey_id: response?.project_survey?.project_survey_id,
          survey_name: response?.project_survey?.nama_survey,
          start_date: response?.project_survey?.pelaksanaan_start,
          end_date: response?.project_survey?.pelaksanaan_end,
          is_close: response?.is_na,
        })
      );
    } else {
      dispatch(resetObjPayload());
    }
  }, [pelaksanaanDetail, showModalDetailPelaksanaan]);

  // [ START ] handler for modal detail pelaksanaan
  const handleCloseModalDetailPelaksanaan = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );
    if (!confirm.value) {
      return;
    }

    setShowModalDetailPelaksanaan(false);
    dispatch(resetObjPayload());
  };

  const handleClickDetailObjectAudit = (id) => {
    setSelectedId(id);
    setShowModalDetailPelaksanaan(true);
  };

  const handleClickEditSchedule = async () => {
    setShowModalEditSchedule(true);
  };

  const handleClickCloseSurvey = async () => {
    const confirm = await confirmationSwal(
      "Apakah anda yakin ingin menutup survey ini?"
    );
    if (!confirm.value) {
      return;
    }

    loadingSwal();
    await fetchApi(
      "PATCH",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/kkpa/disable/${payload?.id}`,
      {}
    );
    pelaksanaanMutate();
    pelaksanaanDetailMutate();
    loadingSwal("close");
  };

  const handleClickReplicateSurvey = async () => {
    const confirm = await confirmationSwal(
      "Apakah anda yakin ingin mereplikasi survey ini?"
    );
    if (!confirm.value) {
      return;
    }

    loadingSwal();
    await fetchApi(
      "PATCH",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/kkpa/duplicate/${payload?.id}`,
      {}
    );
    pelaksanaanMutate();
    pelaksanaanDetailMutate();
    setShowModalDetailPelaksanaan(false);
    loadingSwal("close");
  };
  // [ END ] handler for modal detail pelaksanaan

  // [ START ] handler for modal edit jadwal
  const handleCloseModalEditJadwal = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );
    if (!confirm.value) {
      return;
    }

    setShowModalEditSchedule(false);
  };

  const handleChangePayloadJadwal = (property, value) => {
    dispatch(setObjPayload({ ...payload, [property]: value }));
  };

  const handleSubmitFormJadwal = async () => {
    if (!payload?.end_date) {
      await infoSwal("Mohon isi tanggal berakhir");
      return;
    }

    const confirm = await confirmationSwal(
      "Apakah anda yakin ingin merubah tanggal berakhir survey ini?"
    );
    if (!confirm.value) {
      return;
    }

    loadingSwal();
    await fetchApi(
      "PATCH",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/kkpa/update/${params?.id}`,
      { kkpa_id: payload?.id, end_date: payload?.end_date }
    );
    setShowModalEditSchedule(false);
    pelaksanaanDetailMutate();
    loadingSwal("close");
  };
  // [ END ] handler for modal edit jadwal

  return (
    <LandingLayoutEWPQualityAssurance>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-7">
        <PageTitle text="Pelaksanaan" />
      </div>
      {/* Start Content */}
      <CardContentHeaderFooter
        header={
          <div className="px-3 py-4">
            <p className="text-base font-semibold">Project Audit Terpilih</p>
          </div>
        }
        footer={<div className="min-h-[3rem]" />}
        width={"w-[95rem]"}
      >
        <div className="p-4">
          <TablePelaksanaan
            data={data}
            pathName={`/ewp/quality-assurance/${params?.id}`}
            handleClickDetailObjectAudit={handleClickDetailObjectAudit}
          />
        </div>
      </CardContentHeaderFooter>
      <ModalDetailPelaksanaan
        payload={payload}
        showModal={showModalDetailPelaksanaan}
        withoutButton={isCloseSubmodule || !isInitiator}
        isLoading={pelaksanaanDetailIsLoading}
        handleClickEdit={handleClickEditSchedule}
        handleCloseModal={handleCloseModalDetailPelaksanaan}
        handleClickClose={handleClickCloseSurvey}
        handleClickReplicate={handleClickReplicateSurvey}
      />
      <ModalEditJadwal
        payload={payload}
        showModal={showModalEditSchedule}
        handleChange={handleChangePayloadJadwal}
        handleCloseModal={handleCloseModalEditJadwal}
        handleSubmit={handleSubmitFormJadwal}
      />
      {/* End Content */}
    </LandingLayoutEWPQualityAssurance>
  );
};

export default index;

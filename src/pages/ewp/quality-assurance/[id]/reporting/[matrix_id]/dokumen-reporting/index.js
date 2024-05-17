import { Breadcrumbs, CardLanding, PageTitle } from "@/components/atoms";
import { useAuditInfo } from "@/data/ewp/common/info";
import { LandingLayoutEWPQualityAssurance } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useDokumenReporting } from "@/data/ewp/quality-assurance/reporting";

const index = () => {
  const router = useRouter();
  const [params, setParams] = useState({
    id: 0,
    matrix_id: 0,
  });
  const baseUrl = `/ewp/quality-assurance/${params?.id}`;
  const pathNameCarding = `${baseUrl}/reporting/${params?.matrix_id}/dokumen-reporting`;

  const [data, setData] = useState([]);
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const { auditInfo } = useAuditInfo({ module: "qa", id: params?.id });
  const { dokumenReporting } = useDokumenReporting({
    id: params?.matrix_id,
    page_type: "status",
  });

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "EWP", path: "/ewp" },
      { name: "Overview", path: "/ewp/quality-assurance" },
      {
        name: `${auditInfo?.data?.project_info?.project_id?.toUpperCase()}`,
        path: baseUrl + "/info",
      },
      { name: "Reporting", path: `${baseUrl}/reporting` },
      {
        name: "Dokumen Reporting",
        path: pathNameCarding,
      },
    ]);
  }, [auditInfo, params]);

  useEffect(() => {
    if (!router.isReady) return;
    const { id, matrix_id } = router.query;
    setParams({
      id,
      matrix_id,
    });
  }, [router.isReady]);

  useEffect(() => {
    if (dokumenReporting?.data) {
      setData([
        {
          title: "Latar Belakang",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In magna libero, lobortis non est quis, pharetra dignissim massa.",
          status: dokumenReporting?.data?.latar_belakang ? "success" : "failed",
          url: `${pathNameCarding}/latar-belakang`,
        },
        {
          title: "Tujuan",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In magna libero, lobortis non est quis, pharetra dignissim massa.",
          status: dokumenReporting?.data?.tujuan ? "success" : "failed",
          url: `${pathNameCarding}/tujuan`,
        },
        {
          title: "Standar Review",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In magna libero, lobortis non est quis, pharetra dignissim massa.",
          status: dokumenReporting?.data?.standar_review ? "success" : "failed",
          url: `${pathNameCarding}/standar-review`,
        },
        {
          title: "Ruang Lingkup",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In magna libero, lobortis non est quis, pharetra dignissim massa.",
          status: dokumenReporting?.data?.ruang_lingkup ? "success" : "failed",
          url: `${pathNameCarding}/ruang-lingkup`,
        },
        {
          title: "Metode Penilaian",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In magna libero, lobortis non est quis, pharetra dignissim massa.",
          status: dokumenReporting?.data?.metode_penilaian
            ? "success"
            : "failed",
          url: `${pathNameCarding}/metode-penilaian`,
        },
        {
          title: "Hasil Review Kualitas",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In magna libero, lobortis non est quis, pharetra dignissim massa.",
          status: dokumenReporting?.data?.hasil_review_kualitas
            ? "success"
            : "failed",
          url: `${pathNameCarding}/hasil-review`,
        },
        {
          title: "Peluang Peningkatan Kualitas",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In magna libero, lobortis non est quis, pharetra dignissim massa.",
          status: dokumenReporting?.data?.peluang_peningkatan_kualitas
            ? "success"
            : "failed",
          url: `${pathNameCarding}/peluang-peningkatan`,
        },
        {
          title: "Rencana Perbaikan",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In magna libero, lobortis non est quis, pharetra dignissim massa.",
          status: dokumenReporting?.data?.uraian_rencana_perbaikan
            ? "success"
            : "failed",
          url: `${pathNameCarding}/rencana-perbaikan`,
        },
        {
          title: "Dokumen",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In magna libero, lobortis non est quis, pharetra dignissim massa.",
          url: `${pathNameCarding}/dokumen`,
        },
      ]);
    } else {
      setData([]);
    }
  }, [dokumenReporting]);

  return (
    <LandingLayoutEWPQualityAssurance>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-7">
        <PageTitle text="Reporting Landing" />
      </div>
      {/* Start Content */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-3">
        {data.map((v, i) => {
          return (
            <CardLanding
              key={i}
              title={v.title}
              description={v.description}
              status={v.status}
              url={v.url}
            />
          );
        })}
      </div>
      {/* End Content */}
    </LandingLayoutEWPQualityAssurance>
  );
};

export default index;

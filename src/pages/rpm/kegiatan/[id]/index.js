import { Breadcrumbs, CardLanding, PageTitle } from "@/components/atoms";
import { useProjectDetail } from "@/data/ewp/konsulting";
import { useLandingStatus } from "@/data/ewp/konsulting/peluang-peningkatan/matrix";
import { LandingLayoutRPMKegiatan } from "@/layouts/rpm";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
// import { errorSwal } from "@/helpers";

const index = () => {
  const router = useRouter();
  const { id } = router.query;
  const baseUrl = `/rpm/kegiatan/overview/${id}`;

  const [dataCarding, setDataCarding] = useState([]);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [params, setParams] = useState({
    id: 1,
  });

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    setParams({
      id,
    });
  }, [router.isReady]);

  const { projectDetail } = useProjectDetail({ id: params?.id });
  const { landingStatus } = useLandingStatus(params?.id);

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "RPM", path: "/rpm" },
      { name: "Overview", path: "/rpm/kegiatan/overview" },
      {
        name: `Landing Monitoring`,
        path: `${baseUrl}`,
      },
    ]);
  }, [projectDetail]);

  useEffect(() => {
    if (landingStatus?.data) {
      const mappingDataCarding = [
        {
          title: "Peluang Peningkatan",
          description: "Rincian lanjut proses Peluang Peningkatan.",
          status: landingStatus?.data?.peluang_peningkatan
            ? "success"
            : "failed",
          url: `${baseUrl}/peluang-peningkatan`,
        },
        {
          title: "Dokumen",
          description: "Hasil dokumen proses Monitoring.",
          url: `${baseUrl}/dokumen`,
        },
      ];

      setDataCarding(mappingDataCarding);
    } else {
      setDataCarding([]);
    }
  }, [landingStatus]);

  return (
    <LandingLayoutRPMKegiatan>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-7">
        <PageTitle text="Monitoring" />
      </div>
      {/* Start Content */}
      <div className="flex flex-col gap-3">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {dataCarding.map((v, i) => {
            return (
              <CardLanding
                key={i}
                title={v?.title}
                description={v?.description}
                status={v?.status}
                url={v?.url}
              />
            );
          })}
        </div>
      </div>
      {/* End Content */}
    </LandingLayoutRPMKegiatan>
  );
};

export default index;

import { Breadcrumbs, CardLanding, PageTitle } from "@/components/atoms";
import { useProjectDetail } from "@/data/ewp/konsulting";
import { useLandingStatus } from "@/data/ewp/konsulting/peluang-peningkatan/matrix";
import { LandingLayoutEWPConsulting } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
// import { errorSwal } from "@/helpers";

const index = () => {
  const router = useRouter();
  const { id } = router.query;
  const [matrixId, setMatrixId] = useState(undefined);
  const baseUrl = `/ewp/konsulting/overview/${id}`;

  const [dataCarding, setDataCarding] = useState([]);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [
    isError,
    // setIsError
  ] = useState(false);
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
  const {
    landingStatus,
    // landingStatusError
  } = useLandingStatus(params?.id);

  const [pathName, setPathName] = useState({
    base: `${baseUrl}/peluang-peningkatan`,
    content: "",
  });

  // useEffect(() => {
  //   if (landingStatusError !== undefined) {
  //     setIsError(true);
  //     errorSwal("Selesaikan Analisa Data terlebih dahulu").then((response) => {
  //       if (response?.isConfirmed || response?.isDismissed) {
  //         router.push(`/ewp/konsulting/overview/${params?.id}/info`);
  //       }
  //     });
  //   }
  // }, [landingStatusError]);

  useEffect(() => {
    if (matrixId !== undefined) {
      setPathName({
        ...pathName,
        content: `${baseUrl}/peluang-peningkatan/${matrixId}`,
      });
    }
  }, [matrixId, baseUrl]);

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "EWP", path: "/ewp" },
      { name: "Overview", path: "/ewp/konsulting/overview" },
      {
        name: `${projectDetail?.data?.project_info?.project_id?.toUpperCase()}`,
        path: `${baseUrl}/info`,
      },
      {
        name: `Peluang Peningkatan / Landing Matrix `,
        path: `${pathName?.base}`,
      },
    ]);
  }, [projectDetail]);

  useEffect(() => {
    if (landingStatus?.data) {
      const mappingDataCarding = [
        {
          title: "Header Matrix Peluang",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In magna libero, lobortis non est quis, pharetra dignissim massa.",
          status: landingStatus?.data?.info_header ? "success" : "failed",
          url: `${pathName?.content}/header`,
        },
        {
          title: "Detail Peluang Peningkatan",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In magna libero, lobortis non est quis, pharetra dignissim massa.",
          status: landingStatus?.data?.peluang_peningkatan
            ? "success"
            : "failed",
          url: `${pathName?.content}/overview`,
        },
        {
          title: "Dokumen",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          status: landingStatus?.data?.doc === "Final" ? "success" : "failed",
          url: `${pathName?.content}/dokumen`,
        },
      ];

      setDataCarding(mappingDataCarding);
      setMatrixId(landingStatus?.data?.info?.id);
    } else {
      setDataCarding([]);
    }
  }, [landingStatus, pathName?.content]);

  return (
    <LandingLayoutEWPConsulting>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-7">
        <PageTitle text="Peluang Peningkatan" />
      </div>
      {/* Start Content */}
      {!isError ? (
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
      ) : (
        <div>
          <h5>
            <strong>Selesaikan Analisa Data terlebih dahulu</strong>
          </h5>
        </div>
      )}

      {/* End Content */}
    </LandingLayoutEWPConsulting>
  );
};

export default index;

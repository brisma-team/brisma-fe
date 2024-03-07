import { Breadcrumbs, CardLanding, PageTitle } from "@/components/atoms";
import { useProjectDetail } from "@/data/ewp/konsulting";
import { useLandingStatus } from "@/data/ewp/konsulting/peluang-peningkatan/matrix";
import { LandingLayoutEWPConsulting } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const index = () => {
  const { id } = useRouter().query;
  const [matrixId, setMatrixId] = useState(undefined);
  const baseUrl = `/ewp/konsulting/overview/${id}`;

  const [dataCarding, setDataCarding] = useState([]);
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const { projectDetail } = useProjectDetail({ id });
  const { landingStatus } = useLandingStatus(id);

  const [pathName, setPathName] = useState({
    base: `${baseUrl}/peluang-peningkatan`,
    content: "",
  });

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
    </LandingLayoutEWPConsulting>
  );
};

export default index;

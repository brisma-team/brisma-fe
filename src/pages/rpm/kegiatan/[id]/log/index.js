import { Breadcrumbs, Card, PageTitle } from "@/components/atoms";
import { LogTable } from "@/components/molecules/ewp/konsulting/log";
import { useProjectDetail } from "@/data/ewp/konsulting";
import { useLogSBP } from "@/data/ewp/konsulting/log";
import { useLandingStatus } from "@/data/rpm/kegiatan";
import { capitalizeEveryWord, convertDate } from "@/helpers";
import { LandingLayoutRPMKegiatan } from "@/layouts/rpm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const index = () => {
  const { id } = useRouter().query;
  const baseUrl = `/rpm/kegiatan/${id}`;
  const pathNameLog = `${baseUrl}/log`;

  const [dataTables, setDataTables] = useState([]);
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const [params, setParams] = useState({
    ewpId: "",
  });

  const { projectDetail } = useProjectDetail({ id: params?.ewpId });
  const { logSBP } = useLogSBP({ id: params?.ewpId });
  const { landingStatus } = useLandingStatus(id);

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "RPM", path: "/rpm" },
      { name: "Kegiatan Overview", path: "/rpm/kegiatan" },
      {
        name: `Log`,
        path: pathNameLog,
      },
    ]);
  }, [projectDetail]);

  useEffect(() => {
    const projectInfo = landingStatus?.data?.project;
    setParams({
      ewpId: projectInfo?.ewp_id,
    });
  }, [landingStatus]);

  useEffect(() => {
    if (logSBP?.data?.length) {
      const mappingLog = logSBP?.data?.map((v) => {
        let _subModule;
        switch (v?.jenis) {
          case "mapa":
            _subModule = "Perencanaan";
            break;
          case "kkpa":
            _subModule = "Analisa";
            break;
          case "peluang":
            _subModule = "Peluang Peningkatan";
            break;
          default:
            _subModule = v?.jenis;
            break;
        }
        return {
          tanggal: convertDate(v?.createdAt, "/", "d"),
          pnNama: v?.create_by?.nama,
          subModul: capitalizeEveryWord(_subModule),
          aktifitas: v?.perihal,
        };
      });
      setDataTables(mappingLog);
    } else {
      setDataTables([]);
    }
  }, [logSBP]);

  return (
    <LandingLayoutRPMKegiatan>
      <div className="w-[71.5rem]">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        <PageTitle text="Project Logs" />
        <div className="mt-7">
          <Card>
            <div className="px-6 pt-1 pb-3 w-full">
              <LogTable data={dataTables} />
            </div>
          </Card>
        </div>
      </div>
    </LandingLayoutRPMKegiatan>
  );
};

export default index;

import { Breadcrumbs, Card, PageTitle } from "@/components/atoms";
import { LogTable } from "@/components/molecules/ewp/konsulting/log";
import { useLog } from "@/data/ewp/common/log";
import { useProjectDetail } from "@/data/ewp/konsulting";
import { useLandingStatus } from "@/data/rpm/kegiatan";
import { capitalizeEveryWord, convertDate } from "@/helpers";
import { LandingLayoutRPM } from "@/layouts/rpm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const index = () => {
  const { id } = useRouter().query;
  const baseUrl = `/rpm/quality-assurance/${id}`;
  const pathNameLog = `${baseUrl}/log`;

  const [dataTables, setDataTables] = useState([]);
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const [params, setParams] = useState({
    ewpId: "",
  });

  const { projectDetail } = useProjectDetail({ id: params?.ewpId });
  const { log } = useLog({ id: params?.ewpId, module: "qa" });
  const { landingStatus } = useLandingStatus(id);

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "RPM", path: "/rpm" },
      { name: "Quality Assurance", path: "/rpm/quality-assurance" },
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
    if (log?.data?.length) {
      const mappingLog = log?.data?.map((v) => {
        let _subModule, _perihal;
        switch (v?.jenis) {
          case "mapa":
            _subModule = "Perencanaan (MAR)";
            _perihal = v?.perihal?.replace("Mapa", "Perencanaan (MAR)");
            break;
          case "kkpa":
            _subModule = "Pelaksanaan";
            _perihal = v?.perihal?.replace("Analisa", "Pelaksanaan");
            break;
          case "peluang":
            _subModule = "Peluang Peningkatan";
            break;
          default:
            _subModule = v?.jenis;
            _perihal = v?.perihal;
            break;
        }
        return {
          tanggal: convertDate(v?.createdAt, "/", "d"),
          pnNama: v?.create_by?.pn + " - " + v?.create_by?.nama,
          subModul: capitalizeEveryWord(_subModule),
          aktifitas: _perihal,
        };
      });
      setDataTables(mappingLog);
    } else {
      setDataTables([]);
    }
  }, [log]);

  return (
    <LandingLayoutRPM module_page={"quality-assurance"} module_data={"qa"}>
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
    </LandingLayoutRPM>
  );
};

export default index;

import { Breadcrumbs, Card, PageTitle } from "@/components/atoms";
import { LogTable } from "@/components/molecules/ewp/konsulting/log";
import { useProjectDetail } from "@/data/ewp/konsulting";
import { useLogSBP } from "@/data/ewp/konsulting/log";
import { capitalizeEveryWord, convertDate } from "@/helpers";
import { LandingLayoutEWPConsulting } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const index = () => {
  const { id } = useRouter().query;
  const baseUrl = `/ewp/konsulting/${id}`;
  const pathNameLog = `${baseUrl}/log`;

  const [dataTables, setDataTables] = useState([]);
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const { projectDetail } = useProjectDetail({ id });
  const { logSBP } = useLogSBP({ id });

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "EWP", path: "/ewp" },
      { name: "Overview", path: "/ewp/konsulting" },
      {
        name: `${projectDetail?.data?.project_info?.project_id?.toUpperCase()}`,
        path: `${baseUrl}/info`,
      },
      {
        name: `Log`,
        path: pathNameLog,
      },
    ]);
  }, [projectDetail]);

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
    <LandingLayoutEWPConsulting>
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
    </LandingLayoutEWPConsulting>
  );
};

export default index;

import { Breadcrumbs, Card, PageTitle } from "@/components/atoms";
import { LogTable } from "@/components/molecules/ewp/konsulting/log";
import { useAuditInfo } from "@/data/ewp/common/info";
import { useLog } from "@/data/ewp/common/log";
import { capitalizeEveryWord, convertDate } from "@/helpers";
import { LandingLayoutEWPQualityAssurance } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const index = () => {
  const router = useRouter();
  const [params, setParams] = useState({
    id: 0,
  });
  const baseUrl = `/ewp/quality-assurance/${params?.id}`;
  const pathNameLog = `${baseUrl}/log`;

  const [dataTables, setDataTables] = useState([]);
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const { auditInfo } = useAuditInfo({ module: "qa", id: params?.id });
  const { log } = useLog({ id: params?.id, module: "qa" });

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
        path: `${baseUrl}/info`,
      },
      {
        name: `Log`,
        path: pathNameLog,
      },
    ]);
  }, [auditInfo]);

  useEffect(() => {
    if (log?.data?.length) {
      const mappingLog = log?.data?.map((v) => {
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
          pnNama: v?.create_by?.pn + " - " + v?.create_by?.nama,
          subModul: capitalizeEveryWord(_subModule),
          aktifitas: v?.perihal,
        };
      });
      setDataTables(mappingLog);
    } else {
      setDataTables([]);
    }
  }, [log]);

  return (
    <LandingLayoutEWPQualityAssurance>
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
    </LandingLayoutEWPQualityAssurance>
  );
};

export default index;

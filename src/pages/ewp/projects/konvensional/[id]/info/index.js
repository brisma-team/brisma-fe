import { Breadcrumbs, Card, PageTitle } from "@/components/atoms";
import {
  ProjectDetail,
  InformativeLetter,
  RealizationTable,
} from "@/components/molecules/ewp/konvensional/info";
import { useAuditorEWP } from "@/data/ewp/konvensional";
import { errorSwalTimeout, fetchApi } from "@/helpers";
import { LandingLayoutEWP } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const index = () => {
  const { id } = useRouter().query;

  const [isError, setIsError] = useState(false);
  const [dataTables, setDataTables] = useState([]);
  const { auditorEWP, auditorEWPError, auditorEWPMutate } = useAuditorEWP({
    id,
  });

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "EWP", path: "/ewp" },
    {
      name: `${auditorEWP?.data?.project_info?.project_id} / Info`,
      path: `/ewp/projects/konvensional/${id}/info`,
    },
  ];

  useEffect(() => {
    const status_code =
      parseInt(auditorEWP?.data?.project_info?.status_kode) || 0;
    setDataTables([
      {
        is_open: status_code >= 2,
        is_close: auditorEWP?.data?.realisasi?.penyusunan_mapa_real_end
          ? true
          : false,
        status_code: 2,
        label: "Penyusunan M.A.P.A",
        start_date: auditorEWP?.data?.realisasi?.penyusunan_mapa_real_start,
        end_date: auditorEWP?.data?.realisasi?.penyusunan_mapa_real_end,
        log: "-",
      },
      {
        is_open: status_code >= 3,
        is_close: auditorEWP?.data?.realisasi?.entrance_meeting_real_end
          ? true
          : false,
        status_code: 3,
        label: "Entrance Meeting",
        start_date: auditorEWP?.data?.realisasi?.entrance_meeting_real_start,
        end_date: auditorEWP?.data?.realisasi?.entrance_meeting_real_end,
        log: "-",
      },
      {
        is_open: status_code >= 4,
        is_close: auditorEWP?.data?.realisasi?.pelaksanaan_audit_real_end
          ? true
          : false,
        status_code: 4,
        label: "Pelaksanaan Audit",
        start_date: auditorEWP?.data?.realisasi?.pelaksanaan_audit_real_start,
        end_date: auditorEWP?.data?.realisasi?.pelaksanaan_audit_real_end,
        log: "-",
      },
      {
        is_open: status_code >= 5,
        is_close: auditorEWP?.data?.realisasi?.exit_meeting_real_end
          ? true
          : false,
        status_code: 5,
        label: "Exit Meeting",
        start_date: auditorEWP?.data?.realisasi?.exit_meeting_real_start,
        end_date: auditorEWP?.data?.realisasi?.exit_meeting_real_end,
        log: "-",
      },
      {
        is_open: status_code >= 6,
        is_close: auditorEWP?.data?.realisasi?.Penyusunan_LHA_real_end
          ? true
          : false,
        status_code: 6,
        label: "Penyusunan LHA",
        start_date: auditorEWP?.data?.realisasi?.Penyusunan_LHA_real_start,
        end_date: auditorEWP?.data?.realisasi?.Penyusunan_LHA_real_end,
        log: "-",
      },
      {
        is_open: status_code >= 7,
        is_close: auditorEWP?.data?.realisasi?.Wrapup_Meeting_real_end
          ? true
          : false,
        status_code: 7,
        label: "Wrap-up Meeting",
        start_date: auditorEWP?.data?.realisasi?.Wrapup_Meeting_real_start,
        end_date: auditorEWP?.data?.realisasi?.Wrapup_Meeting_real_end,
        log: "-",
      },
    ]);
  }, [auditorEWP]);

  useEffect(() => {
    if (auditorEWPError) {
      setIsError(true);
    }
  }, [auditorEWPError]);

  const handleClickInitiate = async (statusCode, type) => {
    const pathMappings = {
      2: "mapa",
      3: "entrance",
      4: "kkpa",
    };

    let path = pathMappings[statusCode] || "";
    path += `/${type === "close" ? "close" : "initiate"}`;

    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/${path}/${id}`,
      {}
    );
    auditorEWPMutate();
  };

  if (isError) {
    errorSwalTimeout(auditorEWPError, "/ewp/projects/konvensional");
  }

  return (
    <LandingLayoutEWP>
      <div className="w-[71.5rem]">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        <PageTitle text="Project Info" />
        <div className="mt-7">
          <Card>
            <div className="px-6 pt-1 pb-3 w-full">
              <div className="flex gap-9">
                <ProjectDetail data={auditorEWP?.data?.project_info} />
                {
                  // Jika jadwalnya bukan dari PAT, maka tampilkan Informasi Surat
                  !auditorEWP?.data?.project_info?.is_pat ? (
                    <InformativeLetter data={auditorEWP?.data?.project_info} />
                  ) : (
                    // Jika dari jadwal PAT maka tidak perlu ditampilkan
                    <div className="w-full"></div>
                  )
                }
              </div>
              <div className="my-4"></div>
              <RealizationTable
                data={dataTables}
                currentStatusCode={parseInt(
                  auditorEWP?.data?.project_info?.status_kode
                )}
                handleClickInitiate={handleClickInitiate}
              />
            </div>
          </Card>
        </div>
      </div>
    </LandingLayoutEWP>
  );
};

export default index;

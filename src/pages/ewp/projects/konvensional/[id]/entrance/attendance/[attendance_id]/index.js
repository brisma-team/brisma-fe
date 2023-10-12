import { LandingLayoutEWP } from "@/layouts/ewp";
import { Breadcrumbs, Card, PageTitle, QRGenerator } from "@/components/atoms";
import { useAuditorEWP } from "@/data/ewp/konvensional";
import { useRouter } from "next/router";
import { PrevNextNavigation } from "@/components/molecules/commons";
import { TableAttendance } from "@/components/molecules/ewp/konvensional/entrance/attendance";
import { useEffect, useState } from "react";
import { useAttendanceEntranceEWP } from "@/data/ewp/konvensional/entrance/attendance";

const routes = [
  {
    name: "Daftar Kehadiran",
    slug: "attendance",
  },
  {
    name: "Notulen",
    slug: "notulen",
  },
  { name: "Berita Acara", slug: "berita-acara" },
];

const index = () => {
  const { id, attendance_id } = useRouter().query;
  const pathName = `/ewp/projects/konvensional/${id}/entrance`;
  const [valueQR, setValueQR] = useState("");
  const { auditorEWP } = useAuditorEWP({ id });
  const { attendanceEntranceEWP } = useAttendanceEntranceEWP({ attendance_id });
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "EWP", path: "/ewp" },
    {
      name: `${auditorEWP?.data?.project_info?.project_id} / Entrance`,
      path: `/ewp/projects/konvensional/${id}/entrance`,
    },
    {
      name: `Attendance`,
      path: `/ewp/projects/konvensional/${id}/entrance/attendance/${attendance_id}`,
    },
  ];

  useEffect(() => {
    setValueQR(
      `${window.location.protocol}//${window.location.host}/ewp/projects/konvensional/${id}/entrance/attendance/${attendance_id}/${attendanceEntranceEWP?.data?.attendance_info?.meet_code}`
    );
  }, [attendanceEntranceEWP]);

  return (
    <LandingLayoutEWP>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-3">
        <PageTitle text="Daftar Kehadiran" />
        <PrevNextNavigation
          baseUrl={pathName}
          routes={routes}
          prevUrl={""}
          nextUrl={"/notulen"}
        />
      </div>
      <div className="w-[82rem]">
        <Card>
          <div className="w-full flex justify-between gap-5 px-4 py-2">
            <div className="w-full">
              <TableAttendance data={[{ a: "test" }]} />
            </div>
            <div className="py-4">
              <div className="flex w-full justify-center">
                <QRGenerator value={valueQR} size={150} />
              </div>
              <div className="text-center pt-1 font-semibold text-base">
                BRISMA 2.0.2
              </div>
              <div className="mt-2 w-[200px] py-3 px-2 bg-slate-300 text-atlasian-blue-light rounded text-xs text-center">
                {valueQR}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </LandingLayoutEWP>
  );
};

export default index;

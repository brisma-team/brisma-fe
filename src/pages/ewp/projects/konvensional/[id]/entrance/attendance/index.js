import { LandingLayoutEWP } from "@/layouts/ewp";
import { Breadcrumbs, Card, PageTitle, QRGenerator } from "@/components/atoms";
import { useAuditorEWP } from "@/data/ewp/konvensional";
import { useRouter } from "next/router";
import { PrevNextNavigation } from "@/components/molecules/commons";
import {
  PageCheckIn,
  TableAttendance,
} from "@/components/molecules/ewp/konvensional/entrance/attendance";
import { useEffect, useState } from "react";
import { useAttendanceEntranceEWP } from "@/data/ewp/konvensional/entrance/attendance";
import Link from "next/link";
import { useLandingEntranceEWP } from "@/data/ewp/konvensional/entrance";
import { useDeleteData } from "@/helpers";

const index = () => {
  const { id, code } = useRouter().query;
  const pathName = `/ewp/projects/konvensional/${id}/entrance`;
  const [valueQR, setValueQR] = useState("");

  const { auditorEWP } = useAuditorEWP({ id });
  const { landingEntranceEWP } = useLandingEntranceEWP({ id });
  const { attendanceEntranceEWP, attendanceEntranceEWPMutate } =
    useAttendanceEntranceEWP({
      attendance_id: landingEntranceEWP?.data?.attendance_id,
    });

  const routes = [
    {
      name: "Daftar Kehadiran",
      slug: `attendance`,
    },
    {
      name: "Notulen",
      slug: `notulen`,
    },
    {
      name: "Berita Acara",
      slug: `berita-acara`,
    },
  ];

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "EWP", path: "/ewp" },
    {
      name: `${auditorEWP?.data?.project_info?.project_id} / Entrance`,
      path: pathName,
    },
    {
      name: `Attendance`,
      path: `${pathName}/attendance`,
    },
  ];

  useEffect(() => {
    setValueQR(
      `${window.location.protocol}//${window.location.host}/ewp/projects/konvensional/${id}/entrance/attendance?code=${attendanceEntranceEWP?.data?.attendance_info?.meet_code}`
    );
  }, [attendanceEntranceEWP]);

  const handleDelete = async (audience_id) => {
    await useDeleteData(
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/entrance/attendance/audience/${audience_id}`
    );
    attendanceEntranceEWPMutate();
  };

  if (code) {
    return <PageCheckIn />;
  }

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
          marginLeft={"-55px"}
        />
      </div>
      <div className="w-[82rem]">
        <Card>
          <div className="w-full flex justify-between gap-5 px-4 py-2">
            <div className="w-full">
              <TableAttendance
                data={attendanceEntranceEWP?.data?.attendance_audience}
                handleDelete={handleDelete}
              />
            </div>
            <div className="py-4">
              <div className="flex w-full justify-center">
                <QRGenerator value={valueQR} size={150} />
              </div>
              <div className="text-center pt-1 font-semibold text-base">
                BRISMA 2.0.2
              </div>
              <div className="mt-2 w-[200px] py-3 px-2 bg-slate-300 rounded text-xs text-center overflow-auto max-w-[200px]">
                <Link
                  href={valueQR}
                  target="_blank"
                  className="whitespace-normal"
                >
                  {valueQR}
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </LandingLayoutEWP>
  );
};

export default index;

import {
  CardTotalListSidebar,
  NavbarField,
} from "@/components/molecules/commons";
import { PatSidebarOverview } from "@/components/molecules/pat";
import { useEffect, useState } from "react";
import { useOverview } from "@/data/reference/admin-survey/overview";

const LandingLayoutSurvey = ({ overflowY, withoutRightSidebar, children }) => {
  const [data, setData] = useState(null);
  const { overview } = useOverview("count", {});

  useEffect(() => {
    setData([
      {
        color: "text-atlasian-purple",
        total: overview?.data?.total_templates.toString(),
        name: "Survei Dibuat",
      },
      {
        color: "text-atlasian-green",
        total: overview?.data?.active_templates.toString(),
        name: "Survei Berjalan",
      },
      {
        color: "text-atlasian-yellow",
        total: overview?.data?.inactive_templates.toString(),
        name: "Survei Selesai",
      },
      {
        color: "text-atlasian-red",
        total: overview?.data?.inactive_templates.toString(),
        name: "Survei Ditutup",
      },
    ]);
  }, [overview]);
  return (
    <div>
      <NavbarField />
      <PatSidebarOverview>
        <div>
          <div className="text-center text-base font-bold mt-4">
            Riwayat Survei
          </div>
          <div className="px-10 mt-5">
            <CardTotalListSidebar data={data} />
          </div>
        </div>
      </PatSidebarOverview>
      <div className="flex max-h-screen overflow-y-hidden">
        <div className="flex-1 mt-16" style={{ marginLeft: "260px" }}>
          <div className="main">
            <div
              className={`pl-5 relative ${
                !withoutRightSidebar && `flex justify-between`
              } ${overflowY && ` max-h-screen overflow-y-scroll`}`}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingLayoutSurvey;

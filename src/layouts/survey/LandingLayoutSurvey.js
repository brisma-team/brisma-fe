import {
  CardTotalListSidebar,
  NavbarField,
} from "@/components/molecules/commons";
import { PatSidebarOverview } from "@/components/molecules/pat";
import { useEffect, useState } from "react";
import { useOverview } from "@/data/survey/initiator/overview";

const LandingLayoutSurvey = ({ overflowY, withoutRightSidebar, children }) => {
  const [data, setData] = useState(null);
  const { overview } = useOverview("count", {});

  useEffect;

  useEffect(() => {
    setData([
      {
        color: "text-atlasian-purple",
        total: overview?.data?.total?.toString(),
        name: "Total Survei",
      },
      {
        color: "text-atlasian-green",
        total: overview?.data?.aktif?.toString(),
        name: "Aktif",
      },
      {
        color: "text-atlasian-red",
        total: overview?.data?.non_aktif?.toString(),
        name: "Non-Aktif",
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

import {
  CardTotalListSidebar,
  NavbarField,
} from "@/components/molecules/commons";
import { PatSidebarOverview } from "@/components/molecules/pat";

const LayoutSurveyReference = ({ children }) => {
  const data = [
    {
      color: "text-atlasian-purple",
      total: "18",
      name: "Total Template",
    },
    {
      color: "text-atlasian-green",
      total: "18",
      name: "Total Enabled",
    },
    {
      color: "text-atlasian-yellow",
      total: "18",
      name: "Total Disabled",
    },
    {
      color: "text-atlasian-red",
      total: "18",
      name: "Total Berakhir",
    },
  ];
  return (
    <div>
      <NavbarField />
      <PatSidebarOverview>
        <div>
          <div className="text-center text-base font-bold mt-4">
            Riwayat Template
          </div>
          <div className="px-10 mt-5">
            <CardTotalListSidebar data={data} />
          </div>
        </div>
      </PatSidebarOverview>
      <div className="flex max-h-screen overflow-y-hidden">
        <div className="flex-1 mt-16" style={{ marginLeft: "260px" }}>
          <div className="main">
            <div className="pl-5 relative flex justify-between">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutSurveyReference;

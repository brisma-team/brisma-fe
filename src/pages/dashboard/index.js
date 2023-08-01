import Main from "@/layouts/MainLayout";
// import {
//   BarChart,
//   LineChart,
//   PieChart,
//   HeatmapChart,
// } from "@/components/molecules/dashboard";
import SupersetDashboard from "@/components/molecules/dashboard/SupersetDashboard";

const breadcrumb = [
  {
    label: "Dashboard",
    current: true,
  },
];

export default function index() {
  return (
    <Main breadcrumb={breadcrumb}>
      <div className="px-5">
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1">
            <div className="text-3xl font-bold">Dashboard</div>
          </div>
        </div>
        <>
          <SupersetDashboard />
        </>
      </div>
    </Main>
  );
}

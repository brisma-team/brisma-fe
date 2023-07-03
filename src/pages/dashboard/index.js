import Main from "@/layouts/MainLayout";
import {
  BarChart,
  LineChart,
  PieChart,
  HeatmapChart,
} from "@/components/molecules/dashboard";

const breadcrumb = [
  {
    label: "Dashboard",
    current: true,
  },
];

export default function index() {
  return (
    <Main breadcrumb={breadcrumb}>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <BarChart />
        <LineChart />
        <PieChart />
        <HeatmapChart />
      </div>
    </Main>
  );
}

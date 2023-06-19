import Main from "@/layouts/Main";
import BarChart from "@/components/dashboard/BarChart";
import PieChart from "@/components/dashboard/PieChart";
import LineChart from "@/components/dashboard/LineChart";
import HeatmapChart from "@/components/dashboard/HeatmapChart";

import React from "react";

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

import Main from "@/layouts/MainLayout";
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
        <div className="flex items-center mb-6">
          <div className="text-3xl font-bold pl-5">Dashboard</div>
        </div>
        <>
          <SupersetDashboard />
        </>
      </div>
    </Main>
  );
}

import Main from "@/layouts/MainLayout";
import SupersetDashboard from "@/components/molecules/dashboard/SupersetDashboard";
import { useState, useEffect } from "react";
import useGetToken from "@/data/dashboard/useGetToken";
import useApacheToken from "@/data/dashboard/useApacheToken";
import { Select } from "@/components/atoms";

const breadcrumb = [
  {
    label: "Dashboard",
    current: true,
  },
];

export default function index() {
  const { data } = useGetToken();
  const { apacheToken } = useApacheToken();
  const [dashboardList, setDashboardList] = useState([]);
  const [selected, setSelected] = useState("");
  const [ctoken, setCtoken] = useState("");
  const [tagName, setTagName] = useState("");

  useEffect(() => {
    if (data && data) {
      const mapping = data.list.map((v) => {
        return {
          label: v.name,
          value: v.embed_id,
        };
      });
      setDashboardList(mapping);
      setTagName(mapping[0].label);
      setSelected(mapping[0].value);
    }
  }, [data]);
  useEffect(() => {
    apacheToken && setCtoken(apacheToken.token);
  }, [apacheToken]);
  return (
    <Main breadcrumb={breadcrumb}>
      <div className="px-5">
        <div className="flex items-center mb-6">
          <div className="text-3xl font-bold pl-5">{tagName}</div>
        </div>
        <div className="w-[15rem] pl-5">
          <Select
            optionValue={dashboardList}
            placeholder="Pilih Jenis Dashboard"
            onChange={(e) => setSelected(e.value)}
            isSearchable={true}
          />
        </div>
        {selected && apacheToken && (
          <SupersetDashboard token={ctoken} id={selected} />
        )}
      </div>
    </Main>
  );
}

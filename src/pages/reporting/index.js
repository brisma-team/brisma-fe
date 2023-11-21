import Main from "@/layouts/MainLayout";
import SupersetDashboard from "@/components/molecules/dashboard/SupersetDashboard";
import { useState, useEffect } from "react";
import useGetToken from "@/data/dashboard/useGetToken";
import { Select } from "@/components/atoms";

const breadcrumb = [
  {
    label: "Dashboard",
    current: true,
  },
];

const updateIntervalList = [
  {
    label: "10 Detik",
    value: 10
  },
  {
    label: "30 Detik",
    value: 30
  },
  {
    label: "1 Menit",
    value: 60
  },
  {
    label: "5 Menit",
    value: 300
  }
];

export default function index() {
  const [interval, setInterval] = useState(updateIntervalList[3].value * 1000); // default 5 menit
  const [dashboardList, setDashboardList] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState("");
  const [selectedID, setSelectedID] = useState("");
  const [ctoken, setCtoken] = useState("");
  const [tagName, setTagName] = useState("");
  const [noActiveDashboard, setNoActiveDashboard] = useState(false);
  const { data } = useGetToken("report", interval);

  useEffect(() => {
    if (data !== undefined && Array.isArray(data.list) && data.list.length > 0) {
      const mapping = data.list.map((v, i) => {
        return {
          label: v.name,
          value: i,
          id: v.embed_id,
        };
      });

      setDashboardList(mapping);
      if (selectedEntry === "") {
        setTagName(mapping[0].label);
        setSelectedEntry(mapping[0].value);
        setSelectedID(mapping[0].id);
      }

      setCtoken(data.token);
      setNoActiveDashboard(false)
    } else {
      setNoActiveDashboard(true);
    }
  }, [data, selectedEntry]);

  const handleSelectChange = (selectedOption) => {
    setSelectedEntry(selectedOption.value);
    setSelectedID(selectedOption.id);
    setTagName(selectedOption.label);
  };

  const handleSelectIntervalChange = (selectedOption) => {
    setInterval(selectedOption.value * 1000);
  }

  if (noActiveDashboard) {
    return (
      <Main breadcrumb={breadcrumb}>
        <div className="text-xl text-center justify-center">Tidak ada <i>report</i> yang aktif!</div>
      </Main>
    )
  } else {
    return (
      <Main breadcrumb={breadcrumb}>
        <div className="px-5">
          <div className="flex items-center mb-6">
            <div className="text-3xl font-bold pl-5">{tagName}</div>
          </div>
          <div className="flex w-[40rem] pl-5 mb-5">
            <div className="w-[14rem]">
              <Select
                optionValue={dashboardList}
                placeholder="Pilih Jenis Reporting"
                onChange={(e) => handleSelectChange(e)}
                isSearchable={true}
              />
            </div>
            <div className="w-[12rem] ml-2">
              <Select
                optionValue={updateIntervalList}
                placeholder="Pilih Interval Refresh"
                onChange={(e) => handleSelectIntervalChange(e)}
                isSearchable={false}
              />
            </div>
          </div>
          {selectedID && data.token && (
            <SupersetDashboard token={ctoken} id={selectedID} />
          )}
        </div>
      </Main>
    )
  }
}

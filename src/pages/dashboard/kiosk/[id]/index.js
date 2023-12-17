import SupersetDashboard from "@/components/molecules/dashboard/SupersetDashboard";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Select } from "@/components/atoms";
import useGetDashboardList from "@/data/dashboard/useGetDashboardList";
import useGetGuestToken from "@/data/dashboard/useGetGuestToken";

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
  const { id } = useRouter().query;
  const [ctoken, setCtoken] = useState("");
  const [tagName, setTagName] = useState(""); // Menambahkan state untuk tagName
  const [noGuestToken, setNoGuestToken] = useState(false);
  const { data } = useGetDashboardList("visual", interval);
  const { guestData } = useGetGuestToken(id, interval);

  useEffect(() => {
    if (data && data) {
      if (id) {
        // Cari label dari data yang sesuai dengan id yang dipilih
        const selectedDashboard = data.list.find(
          (dashboard) => dashboard.embed_id === id
        );
        if (selectedDashboard) {
          setTagName(selectedDashboard.name); // Setel tagName sesuai dengan label dashboard yang dipilih
        }
      }
    }
  }, [data, id]);

  useEffect(() => {
    if (guestData !== undefined) {
      if (guestData.hasOwnProperty("token")) {
        setNoGuestToken(false);
        setCtoken(guestData.token);
      } else {
        setNoGuestToken(true);
      }
    }
  }, [guestData]);

  const handleSelectIntervalChange = (selectedOption) => {
    setInterval(selectedOption.value * 1000);
  }

  return (
    <div className="p-5">
      <div className="flex items-center mb-6">
        <div className="text-3xl font-bold pl-5">{tagName}</div>
        <div className="w-[12rem] ml-2 pt-1">
            <Select
              optionValue={updateIntervalList}
              placeholder="Pilih Interval Refresh"
              onChange={(e) => handleSelectIntervalChange(e)}
              isSearchable={false}
            />
        </div>
      </div>
      { noGuestToken ? (
        <div className="text-xl text-center justify-center">
          Tidak dapat memuat <i>dashboard</i>!
        </div>
      ) : id && ctoken && <SupersetDashboard token={ctoken} id={id} />
      }
    </div>
  );
}

import SupersetDashboard from "@/components/molecules/dashboard/SupersetDashboard";
import { useState, useEffect } from "react";
import useGetToken from "@/data/dashboard/useGetToken";
import { useRouter } from "next/router";
export default function index() {
  const { data } = useGetToken();
  const { id } = useRouter().query;
  const [ctoken, setCtoken] = useState("");
  const [tagName, setTagName] = useState(""); // Menambahkan state untuk tagName

  useEffect(() => {
    if (data && data) {
      setCtoken(data.token);
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

  return (
    <div className="p-5">
      <div className="flex items-center mb-6">
        <div className="text-3xl font-bold pl-5">{tagName}</div>
      </div>
      {id && ctoken && <SupersetDashboard token={ctoken} id={id} />}
    </div>
  );
}

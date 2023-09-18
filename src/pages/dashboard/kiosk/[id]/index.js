import SupersetDashboard from "@/components/molecules/dashboard/SupersetDashboard";
import { useState, useEffect } from "react";
import useGetToken from "@/data/dashboard/useGetToken";
import { useRouter } from "next/router";
export default function index() {
  const { data } = useGetToken();
  const { id } = useRouter().query;
  const [ctoken, setCtoken] = useState("");

  useEffect(() => {
    if (data && data) {
      setCtoken(data.token);
    }
  }, [data]);

  return (
    <div className="p-5">
      <div className="flex items-center mb-6">
        <div className="text-3xl font-bold pl-5">{"Dashboard"}</div>
      </div>
      {id && ctoken && <SupersetDashboard token={ctoken} id={id} />}
    </div>
  );
}

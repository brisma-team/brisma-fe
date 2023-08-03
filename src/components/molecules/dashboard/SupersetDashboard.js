import React, { useEffect, useState } from "react";
import { embedDashboard } from "@superset-ui/embedded-sdk";
import useGetToken from "@/data/useGetToken";

const SupersetDashboard = () => {
  const { data } = useGetToken();
  const [token, setToken] = useState("");

  useEffect(() => {
    if (data && data) {
      setToken(data.token);
    }
  }, [data]);

  useEffect(() => {
    const embed = async () => {
      const dashboard = document.getElementById("dashboard");
      if (dashboard && token != null) {
        const config = {
          id: "c217f3a4-864f-4e82-98f9-9d6c19d74c0f",
          supersetDomain: process.env.NEXT_PUBLIC_API_URL_SUPERSET,
          mountPoint: dashboard,
          fetchGuestToken: () => token,
          dashboardUiConfig: {
            hideTitle: true,
            hideChartControls: true,
            hideTab: true,
          },
        };
        if (token) await embedDashboard(config);
      }
    };

    embed();
  }, [token]);

  return (
    <div className="superset">
      <div id="dashboard" />
    </div>
  );
};

export default SupersetDashboard;

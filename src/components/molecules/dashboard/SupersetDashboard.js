import React, { useEffect, useState } from "react";
import { embedDashboard } from "@superset-ui/embedded-sdk";
import useGetToken from "@/data/dashboard/useGetToken";

const SupersetDashboard = () => {
  const { data } = useGetToken();
  const [token, setToken] = useState("");
  const [dashboardid, setDashboardId] = useState("");
  useEffect(() => {
    if (data && data) {
      setToken(data.token);
      setDashboardId(data.id);
    }
  }, [data]);

  useEffect(() => {
    const embed = async () => {
      const dashboard = document.getElementById("dashboard");
      if (dashboard && token != null) {
        const config = {
          id: dashboardid,
          supersetDomain: process.env.NEXT_PUBLIC_API_URL_SUPERSET,
          mountPoint: dashboard,
          fetchGuestToken: () => token,
          dashboardUiConfig: {
            hideTitle: true,
            hideChartControls: true,
            hideTab: true,
          },
        };
        if (token) {
          try {
            embedDashboard(config);
          } catch (error) {
            console.log("Dashboard failed to load.");
          }
        }
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

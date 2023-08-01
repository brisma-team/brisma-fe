import React, { useEffect, useCallback } from "react";
import { embedDashboard } from "@superset-ui/embedded-sdk";

const SupersetDashboard = () => {
  const getToken = useCallback(async () => {
    const response = await fetch("http://192.168.100.110:4444/getGuestToken")
      .then(async (result) => {
        const token = await result.json();
        if (token) return token;
      })
      .catch((err) => console.log(err));
    return response;
  }, []);

  useEffect(() => {
    const embed = async () => {
      const dashboard = document.getElementById("dashboard");
      if (dashboard) {
        const guestToken = await getToken();
        const config = {
          // id: "c7f1e3c8-2bb4-4424-814a-4be727c56a42",
          id: "93b9cf71-481d-423a-8867-2709a861e6d3",
          supersetDomain: process.env.NEXT_PUBLIC_API_URL_SUPERSET,
          mountPoint: dashboard,
          fetchGuestToken: () => guestToken.token,
          dashboardUiConfig: {
            hideTitle: true,
            hideChartControls: true,
            hideTab: true,
          },
        };
        if (guestToken) await embedDashboard(config);
      }
    };

    embed();
  }, []);

  return (
    <div className="superset">
      <div id="dashboard" />
    </div>
  );
};

export default SupersetDashboard;

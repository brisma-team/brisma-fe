import React, { useEffect } from "react";
import { embedDashboard } from "@superset-ui/embedded-sdk";

const SupersetDashboard = ({ id, token }) => {
  useEffect(() => {
    const embed = async () => {
      const dashboard = document.getElementById("dashboard");
      if (dashboard && token != null) {
        const config = {
          id: id,
          supersetDomain: process.env.NEXT_PUBLIC_API_URL_SUPERSET,
          mountPoint: dashboard,
          fetchGuestToken: () => token,
          dashboardUiConfig: {
            hideTitle: true,
            hideChartControls: false,
            hideTab: false,
            filters: {
              visible: true,
              expanded: false,
            },
          },
        };
        if (token) {
          try {
            embedDashboard(config);
          } catch (error) {
            console.error("Dashboard failed to load.");
          }
        }
      }
    };

    embed();
  }, [id, token]);

  return (
    <div className="superset">
      <div id="dashboard" />
    </div>
  );
};

export default SupersetDashboard;

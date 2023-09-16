import React, { useEffect } from "react";
import { embedDashboard } from "@superset-ui/embedded-sdk";

const SupersetDashboard = ({ id, token }) => {
  // const [ctoken, setCtoken] = useState("");
  // const [cid, setCid] = useState("");
  // useEffect(() => {
  //   if (id && token) {
  //     // setCtoken(token);
  //     // setCid(id);
  //   }
  // }, [id, token]);
  console.log(`id : ${id}`, `token: ${token}`);

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

import useUser from "@/data/useUser";
import Loader from "@/components/Loader";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SidebarOverview } from "@/components/pat";
import Navbar from "@/components/Navbar";

const PatOverviewLayout = ({ children }) => {
  const router = useRouter();

  const { user, userError } = useUser();

  const [isShown, setIsShown] = useState(false);
  useState(false);

  useEffect(() => {
    if (userError) {
      router.push("/login");

      return;
    }

    if (user) {
      setIsShown(true);
    }
  }, [user, userError]);

  if (!isShown) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <SidebarOverview />
      <div className="flex">
        <div className="flex-1 mt-16 h-screen" style={{ marginLeft: "260px" }}>
          <div className="main">
            <div className="px-5 py-4 w-full">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatOverviewLayout;

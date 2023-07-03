import useUser from "@/data/useUser";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { SidebarLanding } from "@/components/molecules/commons";

const LandingLayout = ({ children }) => {
  const router = useRouter();

  const { user, userError } = useUser();

  useEffect(() => {
    if (!userError) {
      router.push("/dashboard");

      return;
    }
  }, [user, userError]);

  return (
    <div>
      <SidebarLanding />
      <div className="flex">
        <div className="flex-1 overflow-x-hidden ml-64 pt-16 h-screen overflow-y-scroll">
          <div className="p-4"></div>
          <div className="main">
            <div className="content p-4">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingLayout;

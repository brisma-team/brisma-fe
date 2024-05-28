import useUser from "@/data/useUser";
import { Loader, MainLayout } from "@/components/atoms";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NavbarField } from "@/components/molecules/commons";
import { SidebarObjectOverviewRPM } from "@/components/molecules/rpm/common";

const LandingLayoutRPM = ({ module_page, module_data, children }) => {
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
      <NavbarField />
      <SidebarObjectOverviewRPM
        module_page={module_page}
        module_data={module_data}
      />
      <MainLayout>{children}</MainLayout>
    </div>
  );
};

export default LandingLayoutRPM;

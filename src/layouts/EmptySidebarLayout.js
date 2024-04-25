import useUser from "@/data/useUser";
import { Loader, MainLayout as MainLayoutBackground } from "@/components/atoms";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NavbarField, ProfileDetail } from "@/components/molecules/commons";
import { NavigationHeader, SideNavigation } from "@atlaskit/side-navigation";

const EmptySidebarLayout = ({ children }) => {
  const router = useRouter();
  const [isShown, setIsShown] = useState(false);

  const { user, userError } = useUser();

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
      <div className="fixed h-screen w-64 pt-16 shadow bg-[#fafbfc] z-10">
        <SideNavigation label="project" testId="side-navigation">
          <NavigationHeader>
            <ProfileDetail />
          </NavigationHeader>
        </SideNavigation>
      </div>
      <MainLayoutBackground>{children}</MainLayoutBackground>
    </div>
  );
};

export default EmptySidebarLayout;

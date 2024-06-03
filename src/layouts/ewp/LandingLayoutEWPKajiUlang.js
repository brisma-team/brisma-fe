import useUser from "@/data/useUser";
import { Loader, MainLayout } from "@/components/atoms";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NavbarField } from "@/components/molecules/commons";
import { useProjectDetail } from "@/data/ewp/kaji-ulang";
import { errorSwalTimeout } from "@/helpers";
import SidebarLandingEWPKajiUlang from "@/components/molecules/ewp/kaji-ulang/SidebarLandingEWPKajiUlang";

const LandingLayoutEWPConsulting = ({ children }) => {
  const router = useRouter();
  const [params, setParams] = useState({
    id: 0,
  });

  const { user, userError } = useUser();
  const { projectDetailError, projectDetailIsLoading } = useProjectDetail({
    id: params?.id,
  });

  const [isShown, setIsShown] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    setParams({
      id,
    });
  }, [router.isReady]);

  useEffect(() => {
    if (!projectDetailIsLoading && params?.id) {
      setIsError(Boolean(projectDetailError));
    }
  }, [projectDetailError, projectDetailIsLoading, params]);

  useEffect(() => {
    if (userError) {
      router.push("/login");

      return;
    }

    if (user) {
      setIsShown(true);
    }
  }, [user, userError]);

  if (isError) {
    errorSwalTimeout(projectDetailError, "/ewp/kaji-ulang");
  }

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
      <SidebarLandingEWPKajiUlang />
      <MainLayout>{children}</MainLayout>
      {/* <div className="flex">
        <div className="flex-1 mt-16" style={{ marginLeft: "260px" }}>
          <div className="main">
            <div className="pl-5 py-4 w-[84rem]">{children}</div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default LandingLayoutEWPConsulting;

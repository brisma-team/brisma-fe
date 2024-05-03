import useUser from "@/data/useUser";
import { Loader, MainLayout } from "@/components/atoms";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NavbarField } from "@/components/molecules/commons";
import { errorSwalTimeout } from "@/helpers";
import { useAuditInfo } from "@/data/ewp/common/info";
import { SidebarLandingEWPQualityAssurance } from "@/components/molecules/ewp/quality-assurance";

const LandingLayoutEWPQualityAssurance = ({ children }) => {
  const router = useRouter();
  const [params, setParams] = useState({
    id: 0,
  });

  const { user, userError } = useUser();
  const { auditInfoIsLoading, auditInfoError } = useAuditInfo({
    id: params?.id,
    module: "qa",
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
    if (!auditInfoIsLoading && params?.id) {
      setIsError(Boolean(auditInfoError));
    }
  }, [auditInfoError, auditInfoIsLoading, params]);

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
    errorSwalTimeout(auditInfoError, "/ewp/quality-assurance");
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
      <SidebarLandingEWPQualityAssurance />
      <MainLayout>{children}</MainLayout>
    </div>
  );
};

export default LandingLayoutEWPQualityAssurance;

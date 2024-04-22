import useUser from "@/data/useUser";
import { Loader, MainLayout } from "@/components/atoms";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NavbarField } from "@/components/molecules/commons";
import SidebarLandingAddendumSBP from "@/components/molecules/ewp/konsulting/addendum/SidebarLandingAddendumSBP";
import { errorSwalTimeout, loadingSwal } from "@/helpers";
import { useProjectDetail } from "@/data/ewp/konsulting";
const LandingLayoutEWPSBPAddendum = ({ children }) => {
  const router = useRouter();
  const [params, setParams] = useState({
    id: 0,
  });

  const { user, userError } = useUser();
  const { projectDetail, projectDetailError, projectDetailIsLoading } =
    useProjectDetail({ id: params?.id });

  const [isShown, setIsShown] = useState(false);
  useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    setParams({
      id,
    });
  }, [router.isReady]);

  useEffect(() => {
    if (userError) {
      router.push("/login");
      return;
    }

    if (user) {
      setIsShown(true);
    }
  }, [user, userError]);

  useEffect(() => {
    loadingSwal();
    setTimeout(() => {
      if (!projectDetailIsLoading && params?.id) {
        setIsError(
          Boolean(
            projectDetail?.data?.project_info?.status_name !== "addendum" ||
              projectDetailError
          )
        );
      }
    }, 1000);
    loadingSwal("close");
  }, [projectDetail, projectDetailIsLoading, projectDetailError, params]);

  if (!isShown) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (isError) {
    errorSwalTimeout(
      projectDetailError || "Proyek tidak sedang dalam status addendum!",
      `/ewp/konsulting/${params?.id}/info`
    );
  }

  return (
    <div>
      <NavbarField />
      <SidebarLandingAddendumSBP />
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

export default LandingLayoutEWPSBPAddendum;

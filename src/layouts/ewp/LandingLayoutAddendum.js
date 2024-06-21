import useUser from "@/data/useUser";
import { Loader, MainLayout } from "@/components/atoms";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NavbarField } from "@/components/molecules/commons";
import { SidebarLandingAddendum } from "@/components/molecules/ewp";
import { errorSwalTimeout } from "@/helpers";
import { useProjectDetail } from "@/data/ewp/konsulting";
const LandingLayoutEWPAddendum = ({ children, type = "konsulting" }) => {
  //next hooks
  const router = useRouter();

  //state temporary variables
  const [params, setParams] = useState({
    id: 0,
  });
  const [isShown, setIsShown] = useState(false);
  const [isError, setIsError] = useState(false);

  //hooks data
  const { user, userError } = useUser();
  const { projectDetail, projectDetailError, projectDetailIsLoading } =
    useProjectDetail({ id: params?.id });

  //use effects
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
    setTimeout(() => {
      if (!projectDetailIsLoading && params?.id) {
        setIsError(
          Boolean(projectDetail?.data?.project_info?.status_name !== "addendum")
        );
      }
    }, 800);
  }, [projectDetail, projectDetailIsLoading]);

  //validation
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
      `/ewp/${type}/${params?.id}/info`
    );
  }

  return (
    <div>
      <NavbarField />
      <SidebarLandingAddendum type={type} />
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

export default LandingLayoutEWPAddendum;

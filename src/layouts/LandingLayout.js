import useUser from "@/data/useUser";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { SidebarLanding } from "@/components/molecules/commons";
import { Content, PageLayout, Main } from "@atlaskit/page-layout";

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
    <PageLayout>
      <Content testId="content">
        <SidebarLanding />
        <Main id="main-content" skipLinkTitle="Main Content">
          {children}
        </Main>
      </Content>
    </PageLayout>
  );
};

export default LandingLayout;

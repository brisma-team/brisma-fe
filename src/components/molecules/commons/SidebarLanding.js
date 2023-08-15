import React from "react";
import { LoginForm } from "../auth";
import { LeftSidebar } from "@atlaskit/page-layout";

const SidebarLanding = () => {
  return (
    <LeftSidebar
      isFixed={true}
      width={450}
      id="project-navigation"
      skipLinkTitle="Project Navigation"
      testId="left-sidebar"
    >
      <LoginForm />
    </LeftSidebar>
  );
};

export default SidebarLanding;

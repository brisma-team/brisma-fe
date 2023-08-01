import React from "react";
import {
  NavigationHeader,
  Section,
  SideNavigation,
  NavigationContent,
} from "@atlaskit/side-navigation";
import { ProfileDetail } from "../commons";
const PatSidebarOverview = ({ children }) => {
  return (
    <div className="fixed h-screen w-64 pt-14 shadow">
      <SideNavigation label="project" testId="side-navigation">
        <NavigationHeader>
          <ProfileDetail />
        </NavigationHeader>
        <NavigationContent showTopScrollIndicator>
          <Section>{children}</Section>
        </NavigationContent>
      </SideNavigation>
    </div>
  );
};
export default PatSidebarOverview;

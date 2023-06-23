import React from "react";

import {
  NavigationHeader,
  Section,
  SideNavigation,
  NavigationContent,
} from "@atlaskit/side-navigation";
import { Card, ProfileDetail } from "@/components";

const SidebarOverview = () => {
  return (
    <div className="fixed h-screen w-64 pt-16 shadow">
      <SideNavigation label="project" testId="side-navigation">
        <NavigationHeader>
          <ProfileDetail />
        </NavigationHeader>
        <NavigationContent showTopScrollIndicator>
          <Section>
            <div className="text-center text-base font-bold mt-4">
              Approval Information
            </div>
            <div className="px-10 mt-3">
              <div className="px-6 w-full my-3">
                <Card>
                  <p className="text-3xl font-semibold">6</p>
                  <p className="text-atlasian-purple text-base font-semibold -mt-1">
                    New
                  </p>
                </Card>
              </div>
              <div className="px-6 w-full my-3">
                <Card>
                  <p className="text-3xl font-semibold">6</p>
                  <p className="text-atlasian-green text-base font-semibold -mt-1">
                    Reject
                  </p>
                </Card>
              </div>
              <div className="px-6 w-full my-3">
                <Card>
                  <p className="text-3xl font-semibold">6</p>
                  <p className="text-atlasian-red text-base font-semibold -mt-1">
                    Approve
                  </p>
                </Card>
              </div>
            </div>
          </Section>
        </NavigationContent>
      </SideNavigation>
    </div>
  );
};

export default SidebarOverview;

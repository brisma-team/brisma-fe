import React from "react";

import {
  NavigationHeader,
  Section,
  SideNavigation,
  NavigationContent,
} from "@atlaskit/side-navigation";
import { Card, ProfileDetail } from "@/components";

export default function Sidebar() {
  return (
    <div className="fixed h-screen w-64 pt-16 shadow">
      <SideNavigation label="project" testId="side-navigation">
        <NavigationHeader>
          <ProfileDetail />
        </NavigationHeader>
        <NavigationContent showTopScrollIndicator>
          <Section>
            <div className="text-center font-bold mt-4">
              Approval Information
            </div>
            <div className="px-10 mt-3">
              <div className="px-4 my-3">
                <Card>
                  <h5 className="text-atlasian-purple">New</h5>
                  <div className="text-2xl font-bold">6</div>
                </Card>
              </div>
              <div className="px-4 my-3">
                <Card>
                  <h5 className="text-atlasian-green">Approve</h5>
                  <div className="text-2xl font-bold">6</div>
                </Card>
              </div>
              <div className="px-4 my-3">
                <Card>
                  <h5 className="text-atlasian-red">Reject</h5>
                  <div className="text-2xl font-bold">6</div>
                </Card>
              </div>
            </div>
          </Section>
        </NavigationContent>
      </SideNavigation>
    </div>
  );
}

import React from "react";
import {
  NavigationHeader,
  Section,
  SideNavigation,
  NavigationContent,
} from "@atlaskit/side-navigation";
import { ProfileDetail } from "../commons";

const Content = ({ title, value }) => {
  return (
    <div className="my-5 leading-3">
      <p className="font-bold">{title}</p>
      <p className="font-light text-sm">
        {!value || value === ""
          ? "-"
          : title === "Riwayat Addendum"
          ? `Addendum ke-${value}`
          : title === "Status Approver"
          ? `On ${value?.pn}`
          : value}
      </p>
    </div>
  );
};

const PatSidebarLanding = ({ data, content }) => {
  return (
    <div className="fixed h-screen w-64 pt-16 shadow">
      <SideNavigation label="project" testId="side-navigation">
        <NavigationHeader>
          <ProfileDetail />
        </NavigationHeader>
        <NavigationContent showTopScrollIndicator>
          <Section>
            <div className="px-8 mt-3 text-base font-bold">
              <div className="mt-5">
                <p>Plain Details</p>
              </div>
              <div className="mb-5 mt-3 leading-3">
                <p>{data?.pat_name}</p>
                <p>{data?.uka_name}</p>
                <p className="font-light">{data?.tahun}</p>
              </div>
              {content &&
                Array.isArray(content) &&
                content.map((v, i) => {
                  return <Content key={i} title={v.title} value={v.value} />;
                })}
            </div>
          </Section>
        </NavigationContent>
      </SideNavigation>
    </div>
  );
};

export default PatSidebarLanding;

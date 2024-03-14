import React from "react";
import {
  NavigationHeader,
  Section,
  SideNavigation,
  NavigationContent,
} from "@atlaskit/side-navigation";
import { ProfileDetail } from "../commons";

const Content = ({ title, value }) => {
  let displayedValue = value;

  if (title === "Riwayat Addendum") {
    displayedValue = `Addendum ke-${value}`;
  } else if (title === "Status Approver" && value) {
    displayedValue = `On ${value?.pn}`;
  } else if (!value || value === "") {
    displayedValue = "-";
  }

  return (
    <div className="my-5">
      <div className="font-bold">{title}</div>
      <div className="font-light text-sm">
        {typeof displayedValue === "object"
          ? displayedValue?.nama
          : displayedValue}
      </div>
    </div>
  );
};

const PatSidebarLanding = ({ data, content }) => {
  return (
    <div className="fixed h-screen w-64 pt-14 shadow z-10">
      <SideNavigation label="project" testId="side-navigation">
        <NavigationHeader>
          <ProfileDetail />
        </NavigationHeader>
        <NavigationContent showTopScrollIndicator>
          <Section>
            <div className="px-8 mt-3 text-base font-bold">
              <div className="mt-5 font-bold text-xl text-atlasian-blue-dark">
                <p>
                  {data?.tahun} {data?.uka_kode?.toUpperCase()}
                </p>
              </div>
              <div className="mb-5 mt-3 leading-3 font-bold text-xl text-atlasian-blue-dark">
                <p>{data?.pat_name}</p>
                <p>{data?.uka_name}</p>
              </div>
              <p className="font-light mt-10">Tahun Audit {data?.tahun}</p>
              {content &&
                Array.isArray(content) &&
                content.map((v, i) => {
                  return <Content key={i} title={v?.title} value={v?.value} />;
                })}
            </div>
          </Section>
        </NavigationContent>
      </SideNavigation>
    </div>
  );
};

export default PatSidebarLanding;

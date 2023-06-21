import React from "react";
import GraphBarIcon from "@atlaskit/icon/glyph/graph-bar";
import PeopleIcon from "@atlaskit/icon/glyph/people";
import MediaServicesDocumentIcon from "@atlaskit/icon/glyph/media-services/document";
import MediaServicesSpreadsheetIcon from "@atlaskit/icon/glyph/media-services/spreadsheet";
import FileIcon from "@atlaskit/icon/glyph/file";
import PreferencesIcon from "@atlaskit/icon/glyph/preferences";

import {
  ButtonItem,
  LinkItem,
  NestableNavigationContent,
  NavigationHeader,
  Section,
  SideNavigation,
} from "@atlaskit/side-navigation";
import { ProfileDetail } from "@/components";
import { useState } from "react";

export default function Sidebar({ handleSidebarItemClick }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (e, path) => {
    setSelectedItem(path);
    handleSidebarItemClick(e, path);
  };

  return (
    <div className="fixed h-screen w-64 pt-16 shadow">
      <SideNavigation label="project" testId="side-navigation">
        <NavigationHeader>
          <ProfileDetail />
        </NavigationHeader>
        <NestableNavigationContent
          initialStack={[]}
          testId="nestable-navigation-content"
        >
          <Section>
            {/* <NestingItem
              id="4"
              iconBefore={<DropboxIcon label="" />}
              title="Dropbox"
              testId="dropbox-nesting-item"
            >
              <span />
            </NestingItem> */}
            <ButtonItem
              iconBefore={<GraphBarIcon label="" />}
              href="/dashboard"
              isSelected={selectedItem === "/dashboard"}
              onClick={(e) => handleItemClick(e, "/dashboard")}
            >
              Dashboard
            </ButtonItem>
            <ButtonItem
              iconBefore={<PeopleIcon></PeopleIcon>}
              href="/users"
              isSelected={selectedItem === "/users"}
              onClick={(e) => handleItemClick(e, "/users")}
            >
              Users
            </ButtonItem>
            {/* <ButtonItem iconBefore={<MediaServicesDocumentIcon label="" />}>
                P.A.T
              </ButtonItem> */}
            <LinkItem
              href="/pat"
              iconBefore={<MediaServicesDocumentIcon label="" />}
            >
              P.A.T
            </LinkItem>
            <LinkItem
              href="#"
              iconBefore={<MediaServicesDocumentIcon label="" />}
            >
              E.W.P
            </LinkItem>
            <ButtonItem iconBefore={<MediaServicesDocumentIcon label="" />}>
              R.P.M
            </ButtonItem>
            <LinkItem href="#" iconBefore={<PreferencesIcon label="" />}>
              Reference
            </LinkItem>
            <ButtonItem iconBefore={<MediaServicesSpreadsheetIcon label="" />}>
              Catalogue
            </ButtonItem>
            <LinkItem
              href="#"
              iconBefore={<MediaServicesSpreadsheetIcon label="" />}
            >
              Reporting
            </LinkItem>
            <LinkItem href="#" iconBefore={<FileIcon label="" />}>
              NAF
            </LinkItem>
          </Section>
        </NestableNavigationContent>
      </SideNavigation>
    </div>
  );
}

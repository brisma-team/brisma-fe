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

const Sidebar = ({ handleSidebarItemClick }) => {
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

            <div className="items-center justify-center p-8">
              <h3 className="px-2 mb-2">Menu</h3>
              <ButtonItem
                iconBefore={<GraphBarIcon label="" />}
                href="/dashboard"
                isSelected={selectedItem === "/dashboard"}
                onClick={(e) => handleItemClick(e, "/dashboard")}
              >
                <p className="text-base">Dashboard</p>
              </ButtonItem>
              <ButtonItem
                iconBefore={<PeopleIcon></PeopleIcon>}
                href="/users"
                isSelected={selectedItem === "/users"}
                onClick={(e) => handleItemClick(e, "/users")}
              >
                <p className="text-base">Users</p>
              </ButtonItem>
              {/* <ButtonItem iconBefore={<MediaServicesDocumentIcon label="" />}>
                P.A.T
              </ButtonItem> */}
              <LinkItem
                href="/pat"
                iconBefore={<MediaServicesDocumentIcon label="" />}
              >
                <p className="text-base">P.A.T</p>
              </LinkItem>
              <LinkItem
                href="#"
                iconBefore={<MediaServicesDocumentIcon label="" />}
              >
                <p className="text-base">E.W.P</p>
              </LinkItem>
              <ButtonItem iconBefore={<MediaServicesDocumentIcon label="" />}>
                <p className="text-base">R.P.M</p>
              </ButtonItem>
              <LinkItem href="#" iconBefore={<PreferencesIcon label="" />}>
                <p className="text-base">Reference</p>
              </LinkItem>
              <ButtonItem
                iconBefore={<MediaServicesSpreadsheetIcon label="" />}
              >
                <p className="text-base">Catalogue</p>
              </ButtonItem>
              <LinkItem
                href="#"
                iconBefore={<MediaServicesSpreadsheetIcon label="" />}
              >
                <p className="text-base">Reporting</p>
              </LinkItem>
              <LinkItem href="#" iconBefore={<FileIcon label="" />}>
                <p className="text-base">NAF</p>
              </LinkItem>
            </div>
          </Section>
        </NestableNavigationContent>
      </SideNavigation>
    </div>
  );
};

export default Sidebar;

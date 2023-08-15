import {
  IconGraphBar,
  IconMediaServicesDocument,
  IconMediaServicesSpreadsheet,
  IconFile,
  IconPreferences,
} from "@/components/icons";
import {
  ButtonItem,
  LinkItem,
  NestableNavigationContent,
  NavigationHeader,
  Section,
  SideNavigation,
} from "@atlaskit/side-navigation";
import ProfileDetail from "./ProfileDetail";
import { useState } from "react";

const Sidebar = ({ handleSidebarItemClick }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (e, path) => {
    setSelectedItem(path);
    handleSidebarItemClick(e, path);
  };

  return (
    <div className="fixed h-screen w-64 pt-16 shadow bg-[#fafbfc]">
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
                iconBefore={<IconGraphBar label="" />}
                href="/dashboard"
                isSelected={selectedItem === "/dashboard"}
                onClick={(e) => handleItemClick(e, "/dashboard")}
              >
                <p className="text-base">Dashboard</p>
              </ButtonItem>
              {/* <ButtonItem iconBefore={<MediaServicesDocumentIcon label="" />}>
                P.A.T
              </ButtonItem> */}
              <LinkItem
                href="/pat"
                iconBefore={<IconMediaServicesDocument label="" />}
              >
                <p className="text-base">P.A.T</p>
              </LinkItem>
              <LinkItem
                href="#"
                iconBefore={<IconMediaServicesDocument label="" />}
              >
                <p className="text-base">E.W.P</p>
              </LinkItem>
              <ButtonItem iconBefore={<IconMediaServicesDocument label="" />}>
                <p className="text-base">R.P.M</p>
              </ButtonItem>
              <LinkItem
                href="/reference"
                iconBefore={<IconPreferences label="" />}
              >
                <p className="text-base">Reference</p>
              </LinkItem>
              <ButtonItem
                iconBefore={<IconMediaServicesSpreadsheet label="" />}
                href="/users"
                isSelected={selectedItem === "/catalogue"}
                onClick={(e) => handleItemClick(e, "/catalogue")}
              >
                <p className="text-base">Catalogue</p>
              </ButtonItem>
              <LinkItem
                href="#"
                iconBefore={<IconMediaServicesSpreadsheet label="" />}
              >
                <p className="text-base">Reporting</p>
              </LinkItem>
              <LinkItem href="#" iconBefore={<IconFile label="" />}>
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

import {
  IconGraphBar,
  IconMediaServicesDocument,
  IconMediaServicesSpreadsheet,
  IconFile,
  IconPreferences,
} from "@/components/icons";
import {
  ButtonItem,
  NestableNavigationContent,
  NavigationHeader,
  Section,
  SideNavigation,
} from "@atlaskit/side-navigation";
import ProfileDetail from "./ProfileDetail";
import { useEffect, useState } from "react";
import useUser from "@/data/useUser";

const Sidebar = ({ handleSidebarItemClick }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [listMenu, setListMenu] = useState([]);

  const { user } = useUser();
  const roleKodeSuperAdmin = Array.from({ length: 9 }, (_, i) =>
    (i + 1).toString()
  );

  useEffect(() => {
    if (user?.data) {
      const userRole = user?.data?.role_kode;
      const updatedListMenu = [
        {
          icon: <IconGraphBar label="" />,
          path: "/dashboard",
          name: "Dashboard",
          is_hide: false,
        },
        {
          icon: <IconMediaServicesDocument label="" />,
          path: "/pat",
          name: "P.A.T",
          is_hide: !userRole.some((role) => roleKodeSuperAdmin.includes(role)),
        },
        {
          icon: <IconMediaServicesDocument label="" />,
          path: "/ewp",
          name: "E.W.P",
          is_hide: !userRole.some(
            (role) =>
              roleKodeSuperAdmin.includes(role) ||
              role === "10" ||
              role === "11"
          ),
        },
        {
          icon: <IconMediaServicesDocument label="" />,
          path: "/rpm",
          name: "R.P.M",
          is_hide: !userRole.some(
            (role) => roleKodeSuperAdmin.includes(role) || role === "12"
          ),
        },
        {
          icon: <IconPreferences label="" />,
          path: "/reference",
          name: "Reference",
          is_hide: !userRole.some((role) => roleKodeSuperAdmin.includes(role)),
        },
        {
          icon: <IconMediaServicesSpreadsheet label="" />,
          path: "/catalogue",
          name: "Catalogue",
          is_hide: !userRole.some((role) => roleKodeSuperAdmin.includes(role)),
        },
        {
          icon: <IconMediaServicesSpreadsheet label="" />,
          path: "/survey",
          name: "Survey",
          is_hide: !userRole.some(
            (role) => roleKodeSuperAdmin.includes(role) || role === "13"
          ),
        },
        {
          icon: <IconGraphBar label="" />,
          path: "/reporting",
          name: "Reporting",
          is_hide: !userRole.some((role) => roleKodeSuperAdmin.includes(role)),
        },
        {
          icon: <IconFile label="" />,
          path: "/naf",
          name: "NAF",
          is_hide: !userRole.some((role) => roleKodeSuperAdmin.includes(role)),
        },
      ];
      const filterMapping = updatedListMenu.filter((v) => !v?.is_hide);
      setListMenu(filterMapping);
    } else {
      setListMenu([]);
    }
  }, [user]);

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
            <div className="items-center justify-center p-8">
              <h3 className="px-2 mb-2">Menu</h3>
              {listMenu?.length
                ? listMenu?.map((v, i) => {
                    return (
                      <ButtonItem
                        key={i}
                        iconBefore={v?.icon}
                        href="/dashboard"
                        isSelected={selectedItem === v?.path}
                        onClick={(e) => handleItemClick(e, v?.path)}
                      >
                        <p className="text-base">{v?.name}</p>
                      </ButtonItem>
                    );
                  })
                : ""}
            </div>
          </Section>
        </NestableNavigationContent>
      </SideNavigation>
    </div>
  );
};

export default Sidebar;

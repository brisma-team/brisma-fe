import {
  NestableNavigationContent,
  NavigationHeader,
  Section,
  SideNavigation,
} from "@atlaskit/side-navigation";
import { ProfileDetail } from "../commons";
import { useEffect, useState } from "react";
import useUser from "@/data/useUser";
import { useRouter } from "next/router";

const SidebarReferenceGeneral = () => {
  const router = useRouter();
  const [listMenu, setListMenu] = useState([]);

  const { user } = useUser();

  useEffect(() => {
    if (user?.data) {
      const updatedListMenu = [
        {
          path: "/metodologi",
          name: "Metodologi",
          isDisabled: true,
          is_hide: false,
          subMenu: [
            { path: "/sub1", name: "Submenu 1" },
            { path: "/sub2", name: "Submenu 2" },
          ],
        },
        {
          path: "/modul",
          name: "Modul",
          isDisabled: false,
          is_hide: false,
          subMenu: [
            { path: "/reference/modul/dashboard", name: "Dashboard" },
            { path: "/reference/modul/survey", name: "Survei" },
          ],
        },
        {
          path: "/organisasi",
          name: "Organisasi",
          isDisabled: false,
          is_hide: false,
          subMenu: [
            { path: "/reference/organisasi/uka", name: "Unit Kantor Audit" },
            { path: "/reference/organisasi/users/skai", name: "User S.K.A.I" },
          ],
        },
        {
          path: "/data",
          name: "Data",
          isDisabled: true,
          is_hide: false,
          subMenu: [
            { path: "/sub7", name: "Submenu 7" },
            { path: "/sub8", name: "Submenu 8" },
          ],
        },
      ];
      const filterMapping = updatedListMenu.filter((v) => !v?.is_hide);
      setListMenu(filterMapping);
    } else {
      setListMenu([]);
    }
  }, [user]);

  const handleSidebarItemClick = (e, path) => {
    e.preventDefault();
    // Redirect to the clicked path using router.push
    router.push(path);
  };

  const handleItemClick = (e, path) => {
    handleSidebarItemClick(e, path);
  };

  const [expandedMenu, setExpandedMenu] = useState(null);

  const toggleMenu = (path) => {
    if (expandedMenu === path) {
      setExpandedMenu(null);
    } else {
      setExpandedMenu(path);
    }
  };

  const renderArrow = (path) => {
    return expandedMenu === path ? "▼" : "▶";
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
              <h3 className="px-2 mb-2">References</h3>
              {listMenu?.length ? (
                <ul className="p-0">
                  {listMenu.map((parentItem, parentIndex) => (
                    <li key={parentIndex}>
                      <button
                        className={`bg-transparent border-none cursor-pointer p-2 ${
                          parentItem?.isDisabled == false
                            ? "font-bold"
                            : "font-normal text-slate-400"
                        }`}
                        disabled={parentItem?.isDisabled}
                        onClick={() => toggleMenu(parentItem.path)}
                      >
                        {renderArrow(parentItem.path)} {parentItem.name}
                      </button>
                      {expandedMenu === parentItem.path &&
                        parentItem.subMenu &&
                        parentItem.subMenu.length > 0 && (
                          <ul className="pl-4">
                            {parentItem.subMenu.map((childItem, childIndex) => (
                              <li key={childIndex}>
                                <button
                                  className="bg-transparent border-none cursor-pointer p-2"
                                  onClick={() =>
                                    handleItemClick(childItem.path)
                                  }
                                >
                                  {childItem.name}
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                    </li>
                  ))}
                </ul>
              ) : (
                ""
              )}
            </div>
          </Section>
        </NestableNavigationContent>
      </SideNavigation>
    </div>
  );
};

export default SidebarReferenceGeneral;

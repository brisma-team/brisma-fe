import useUser from "@/data/useUser";
import Loader from "@/components/Loader";

import React, { useEffect, useState } from "react";
import {
  //   Sidebar,
  //   Navbar,
  Avatar,
  Breadcrumb,
  Card,
  Button,
} from "flowbite-react";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import {
  ChartPieIcon,
  UserGroupIcon,
  BellIcon,
  Bars3Icon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

const notifications = [
  {
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam faucibus eget orci ac aliquet. Cras laoreet tellus sit amet dui tristique efficitur. Nunc varius accumsan mi at molestie. Maecenas feugiat, odio pharetra aliquam sodales, dolor purus tincidunt dolor, eget euismod tortor libero vel mauris.",
  },
  {
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam faucibus eget orci ac aliquet. Cras laoreet tellus sit amet dui tristique efficitur. Nunc varius accumsan mi at molestie. Maecenas feugiat, odio pharetra aliquam sodales, dolor purus tincidunt dolor, eget euismod tortor libero vel mauris.",
  },
];

export default function Main({ children, breadcrumb }) {
  const router = useRouter();

  const { user, userError, userMutate } = useUser();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isShown, setIsShown] = useState(false);
  const [isUserDropdownShown, setIsUserDropdownShown] = useState(false);
  const [isNotificationDropdownShown, setIsNotificationDropdownShown] =
    useState(false);

  useEffect(() => {
    if (userError) {
      router.push("/login");

      return;
    }

    if (user) {
      setIsShown(true);
    }
  }, [user, userError]);

  async function handleLogoutClick() {
    deleteCookie("token");

    userMutate();
  }

  function handleSidebarItemClick(e, href) {
    e.preventDefault();

    router.push(href);
  }

  function handleToggleSidebarClick() {
    const newState = !isSidebarCollapsed;

    setIsSidebarCollapsed(newState);
  }

  function handleToggleNotificationDropdownClick() {
    setIsNotificationDropdownShown(!isNotificationDropdownShown);
    setIsUserDropdownShown(false);
  }

  function handleToggleUserDropdownClick() {
    setIsUserDropdownShown(!isUserDropdownShown);
    setIsNotificationDropdownShown(false);
  }

  if (!isShown) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      {/* <Navbar fluid={true} border>
        <button onClick={() => handleToggleSidebarClick()}>
          <Bars3Icon className="w-6 h-6 text-gray-500" />
        </button>
        <div className="flex gap-x-4 items-center relative">
          <BellIcon
            className="w-6 h-6 text-gray-500"
            onClick={() => handleToggleNotificationDropdownClick()}
          />
          <Avatar
            alt="User settings"
            img="https://via.placeholder.com/150"
            rounded={true}
            onClick={() => handleToggleUserDropdownClick()}
          />
          {isUserDropdownShown && (
            <Card className="absolute -bottom-48 -left-24">
              <div className="space-y-2">
                <div className="block text-sm">John Doe</div>
                <div className="block truncate text-sm font-medium">
                  john.doe@mail.com
                </div>
              </div>
              <hr />
              <Button color="failure" onClick={() => handleLogoutClick()}>
                <ArrowLeftOnRectangleIcon className="w-6 h-6" />
                <span className="ml-2">Logout</span>
              </Button>
            </Card>
          )}
          {isNotificationDropdownShown && (
            <Card className="absolute top-16 right-12 w-96 z-10 space-y-2">
              {notifications.map((notif, i) => (
                <Card key={i}>
                  <div>Pesan Baru</div>
                  <hr />
                  <div>{notif.message}</div>
                </Card>
              ))}
            </Card>
          )}
        </div>
      </Navbar> */}

      <Navbar></Navbar>
      <Sidebar handleSidebarItemClick={handleSidebarItemClick}></Sidebar>
      <div className="flex">
        <div className="flex-1 overflow-x-hidden ml-64 pt-16 h-screen overflow-y-scroll">
          <div className="p-4"></div>
          <div className="main">
            <div className="p-4">
              {/* <Breadcrumb className="bg-gray-50 py-3 px-5 dark:bg-gray-900">
                {breadcrumb.map((br, i) => (
                  <Breadcrumb.Item
                    href={br.current === false ? br.href : undefined}
                    key={i}
                  >
                    {br.label}
                  </Breadcrumb.Item>
                ))}
              </Breadcrumb> */}
            </div>
            <div className="content p-4">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

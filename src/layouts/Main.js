import useUser from "@/data/useUser";
import Loader from "@/components/atoms/Loader";

// import { deleteCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Sidebar } from "@/components";
import Navbar from "@/components/molecules/commons/Navbar";

export default function Main({ children }) {
  const router = useRouter();

  const { user, userError } = useUser();

  const [isShown, setIsShown] = useState(false);
  // const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  // const [isUserDropdownShown, setIsUserDropdownShown] = useState(false);
  // const [isNotificationDropdownShown, setIsNotificationDropdownShown] =
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

  function handleSidebarItemClick(e, href) {
    e.preventDefault();

    router.push(href);
  }

  // async function handleLogoutClick() {
  //   deleteCookie("token");

  //   userMutate();
  // }

  // function handleToggleSidebarClick() {
  //   const newState = !isSidebarCollapsed;

  //   setIsSidebarCollapsed(newState);
  // }

  // function handleToggleNotificationDropdownClick() {
  //   setIsNotificationDropdownShown(!isNotificationDropdownShown);
  //   setIsUserDropdownShown(false);
  // }

  // function handleToggleUserDropdownClick() {
  //   setIsUserDropdownShown(!isUserDropdownShown);
  //   setIsNotificationDropdownShown(false);
  // }

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

      <Navbar />
      <Sidebar handleSidebarItemClick={handleSidebarItemClick} />
      <div className="flex">
        <div className="flex-1 overflow-x-hidden ml-64 pt-16 h-screen overflow-y-scroll">
          <div className="p-4"></div>
          <div className="main">
            <div className="content p-4">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

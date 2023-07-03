import useUser from "@/data/useUser";
import { Loader } from "@/components/atoms";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Sidebar, NavbarField } from "@/components/molecules/commons";

const MainLayout = ({ children }) => {
  const router = useRouter();

  const { user, userError } = useUser();

  const [isShown, setIsShown] = useState(false);

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

  if (!isShown) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <NavbarField />
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
};

export default MainLayout;

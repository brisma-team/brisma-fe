import useUser from "@/data/useUser";
import Loader from "@/components/Loader";

import React, { useEffect, useState } from "react";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function PatLayout({ children }) {
  const router = useRouter();

  const { user, userError, userMutate } = useUser();

  const [isShown, setIsShown] = useState(false);
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

  if (!isShown) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Sidebar handleSidebarItemClick={handleSidebarItemClick} />
      <div className="flex">
        <div className="flex-1 overflow-x-hidden ml-72 h-screen overflow-y-scroll">
          <div className="main flex items-center justify-center h-full">
            <div className="content p-4 w-full h-96">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

import useUser from "@/data/useUser";
import Loader from "@/components/Loader";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SidebarProjectOverview } from "@/components/pat";
import Navbar from "@/components/Navbar";

export default function PatProjectOverview({ children }) {
  const router = useRouter();

  const { user, userError } = useUser();

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
      <SidebarProjectOverview />
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

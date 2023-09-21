import useUser from "@/data/useUser";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NavbarField } from "@/components/molecules/commons";
import { Loader } from "@/components/atoms";
import { PatSidebarLanding } from "@/components/molecules/pat";

const PatLandingLayout = ({ data, content, children }) => {
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
      <NavbarField />
      <PatSidebarLanding data={data} content={content} />
      <div className="flex">
        <div className="flex-1 mt-16" style={{ marginLeft: "260px" }}>
          <div className="main">
            <div className="pl-5 pr-16 py-4 w-full">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatLandingLayout;

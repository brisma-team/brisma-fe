import useUser from "@/data/useUser";
import { Loader } from "@/components/atoms";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PatSidebarOverview } from "@/components/molecules/pat";
import { NavbarField, CardApprovalList } from "@/components/molecules/commons";

const PatOverviewLayout = ({ children, withContent = true, data, title }) => {
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
      <PatSidebarOverview>
        {withContent && (
          <div>
            <div className="text-center text-base font-bold mt-4">
              {title}
            </div>
            <div className="px-10 mt-5">
              <CardApprovalList data={data} />
            </div>
          </div>
        )}
      </PatSidebarOverview>
      <div className="flex">
        <div className="flex-1 mt-16 " style={{ marginLeft: "260px" }}>
          <div className="main">
            <div className="pl-5 py-4 w-[95rem]">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatOverviewLayout;

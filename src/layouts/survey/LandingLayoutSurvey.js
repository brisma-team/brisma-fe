import {
  CardTotalListSidebar,
  NavbarField,
} from "@/components/molecules/commons";
import { PatSidebarOverview } from "@/components/molecules/pat";
import { useEffect, useState } from "react";
import { useOverview } from "@/data/survey/initiator/overview";
import useUser from "@/data/useUser";
import { useRouter } from "next/router";
import { Loader } from "@/components/atoms";

const LandingLayoutSurvey = ({ overflowY, withoutRightSidebar, children }) => {
  const router = useRouter();

  const [data, setData] = useState(null);
  const [isShown, setIsShown] = useState(false);

  const { overview } = useOverview("count", {});
  const { user, userError } = useUser();

  useEffect(() => {
    if (userError) {
      router.push("/login");

      return;
    }

    if (user) {
      setIsShown(true);
    }
  }, [user, userError]);

  useEffect(() => {
    setData([
      {
        color: "text-atlasian-purple",
        total: overview?.data?.total?.toString(),
        name: "Total Survei",
      },
      {
        color: "text-atlasian-green",
        total: overview?.data?.aktif?.toString(),
        name: "Aktif",
      },
      {
        color: "text-atlasian-red",
        total: overview?.data?.non_aktif?.toString(),
        name: "Non-Aktif",
      },
    ]);
  }, [overview]);

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
        <div>
          <div className="text-center text-base font-bold mt-4">
            Riwayat Survei
          </div>
          <div className="px-10 mt-5">
            <CardTotalListSidebar data={data} />
          </div>
        </div>
      </PatSidebarOverview>
      <div className="flex max-h-screen overflow-y-hidden">
        <div className="flex-1 mt-16" style={{ marginLeft: "260px" }}>
          <div className="main">
            <div
              className={`pl-5 relative ${
                !withoutRightSidebar && `flex justify-between`
              } ${overflowY && ` max-h-screen overflow-y-scroll`}`}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingLayoutSurvey;

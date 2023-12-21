import { Loader } from "@/components/atoms";
import { NavbarField } from "@/components/molecules/commons";
import useUser from "@/data/useUser";
import { SideNavigation } from "@atlaskit/side-navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const RespondenLayoutSurvey = ({
  data,
  content,
  children,
  withoutRightSidebar,
  overflowY,
}) => {
  const router = useRouter();
  const [isShown, setIsShown] = useState(false);
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
      <div className="fixed h-screen w-64 pt-14 shadow z-10">
        <SideNavigation label="project" testId="side-navigation">
          <div className="pt-16 px-6">
            <p className="text-base font-bold">Survei Detail</p>
            <p className="text-lg font-bold">
              {data?.project_survey_id?.toUpperCase()}
            </p>
            <p className="text-xs text-justify">{data?.deskripsi}</p>
            <div className="mt-8 flex flex-col gap-3">
              {content?.length
                ? content.map((v, i) => {
                    return (
                      <div key={i}>
                        <div className="text-xs font-semibold">{v.title}</div>
                        <div className="text-xs">{v.desc}</div>
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>
        </SideNavigation>
      </div>
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

export default RespondenLayoutSurvey;

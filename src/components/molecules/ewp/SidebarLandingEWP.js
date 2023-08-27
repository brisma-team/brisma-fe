import { useEffect, useState } from "react";
import { AvatarGroupField } from "@/components/atoms";
import { useAuditorEWP } from "@/data/ewp/konvensional";
import {
  ImageEclipseGray,
  ImageEclipseRed,
  ImageEclipseYellow,
  ImageBar,
  ImageCircleCheck,
} from "@/helpers/imagesUrl";
import {
  NavigationHeader,
  Section,
  SideNavigation,
  NavigationContent,
} from "@atlaskit/side-navigation";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const SidebarLandingEWP = () => {
  const { id } = useRouter().query;
  const baseUrl = `/ewp/projects/konvensional/${id}`;
  const [data, setData] = useState();
  const { auditorEWP } = useAuditorEWP({ id });

  useEffect(() => {
    const projectInfo = auditorEWP?.data?.project_info;
    setData({
      projectId: projectInfo?.project_id,
      projectName: projectInfo?.project_name,
      auditTeam: projectInfo?.info_team_audit,
      statusName: projectInfo?.status_name,
      statusApprover: projectInfo?.status_approver
        ? `On ${projectInfo?.status_approver?.pn}`
        : `-`,
      addendum: `Addendum ke-${projectInfo?.number_adendum.toString()}`,
    });
  }, [auditorEWP]);

  const arrAvatars = [];

  const groups = ["ma", "kta", "ata"];

  groups.forEach((group) => {
    if (data?.auditTeam?.[group]) {
      const avatars = data?.auditTeam[group].map((member) => ({
        ...member,
        borderColor:
          group === "ma" ? "red" : group === "kta" ? "blue" : "green",
      }));
      arrAvatars.push(avatars);
    }
  });

  const allAvatars = arrAvatars.flat();

  const menu = [
    { name: "Info", href: `/info` },
    { name: "M.A.P.A", href: `/mapa` },
    { name: "Entrance", href: `/entrance` },
    { name: "K.K.P.A", href: `/kkpa` },
    { name: "K.K.P.T", href: `/kkpt` },
    { name: "Exit", href: `/exit` },
    { name: "LHA", href: `/lha` },
    { name: "NAF", href: `/naf` },
    { name: "Dokumen", href: `/dokumen` },
  ];

  return (
    <div className="fixed h-screen w-64 pt-8- shadow z-10">
      <SideNavigation label="project" testId="side-navigation">
        <NavigationHeader>
          <div className="flex flex-col px-5 pt-16 pb-3">
            <div className="text-base text-brisma font-bold">
              <p>Project Details</p>
              <p>{data?.projectId}</p>
            </div>
            <div className="text-sm text-brisma">{data?.projectName}</div>
            <AvatarGroupField data={allAvatars} />
            <div className="flex gap-2 my-0.5 items-center">
              <div>
                <Image src={ImageEclipseYellow} alt="" />
              </div>
              <div>{data?.statusName}</div>
            </div>
            <div className="flex gap-2 my-0.5 items-center">
              <div>
                <Image src={ImageEclipseRed} alt="" />
              </div>
              <div>{data?.statusApprover}</div>
            </div>
            <div className="flex gap-2 my-0.5 items-center">
              <div>
                <Image src={ImageEclipseGray} alt="" />
              </div>
              <div>{data?.addendum}</div>
            </div>
          </div>
        </NavigationHeader>
        <NavigationContent showTopScrollIndicator>
          <Section>
            <div className="-mx-2 pt-7">
              {menu.map((v, i) => {
                return (
                  <Link
                    key={i}
                    href={baseUrl + v.href}
                    className="flex text-black gap-2 items-center hover:no-underline no-underline py-2 px-7"
                  >
                    <div>
                      <Image
                        src={v.name === "Dokumen" ? ImageCircleCheck : ImageBar}
                        alt=""
                      />
                    </div>
                    <div className="font-semibold text-base">{v.name}</div>
                  </Link>
                );
              })}
            </div>
          </Section>
        </NavigationContent>
      </SideNavigation>
    </div>
  );
};
export default SidebarLandingEWP;

import { useEffect, useState } from "react";
import { AvatarGroupField } from "@/components/atoms";
// import { useAuditorEWP } from "@/data/ewp/konvensional";
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
import { useProjectDetail } from "@/data/ewp/konsulting";
// import { useDispatch } from "react-redux";
// import { setAuditorInfo } from "@/slices/ewp/auditorInfoEWPSlice";

const SidebarLandingEWPConsulting = () => {
  //   const dispatch = useDispatch();
  const router = useRouter();
  const { id } = useRouter().query;
  const baseUrl = `/ewp/konsulting/overview/${id}`;
  const [data, setData] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  //   const [currentPageSub, setCurrentPageSub] = useState(0);
  const { projectDetail } = useProjectDetail({ id });

  useEffect(() => {
    const projectInfo = projectDetail?.data?.project_info;
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

    // dispatch(
    //   setAuditorInfo({
    //     kta: projectInfo?.info_team_audit?.kta,
    //     initiator: projectInfo?.info_team_audit,
    //   })
    // );
  }, [projectDetail]);

  const arrAvatars = [];

  const groups = ["ma", "kta", "ata"];

  groups.forEach((group) => {
    if (data?.auditTeam?.[group]) {
      const avatars = data?.auditTeam[group].map((member) => ({
        ...member,
        borderColor:
          group === "ma" ? "blue" : group === "kta" ? "red" : "green",
      }));
      arrAvatars.push(avatars);
    }
  });

  const allAvatars = arrAvatars.flat();

  const menu = [
    { name: "Info", href: `/info` },
    { name: "Perencanaan", href: `/perencanaan` },
    { name: "Analisa", href: `/analisa` },
    { name: "Peluang Peningkatan", href: `/peluang-peningkatan` },
    { name: "Monitoring", href: `/monitoring` },
    { name: "Meeting", href: `/meeting` },
  ];

  const subMenu = [{ name: "Log", href: `/log` }];

  useEffect(() => {
    const getCurrentPage = () => {
      const currentPath = router.asPath;

      const regex = new RegExp(
        `^${menu.map((item) => `(${item.href})`).join("|")}$`,
        "i"
      );

      const match = currentPath.match(regex);

      if (match) {
        const matchedPath = match[0];
        const matchedIndex = menu.findIndex(
          (item) => item.href === matchedPath
        );

        if (matchedIndex !== -1) {
          return matchedIndex;
        }
      }

      return 0;
    };

    setCurrentPage(getCurrentPage());
  }, []);

  //   useEffect(() => {
  //     const getCurrentPageSub = () => {
  //       const currentPath = router.asPath;

  //       const regex = new RegExp(
  //         `^${subMenu.map((item) => `(${item.href})`).join("|")}$`,
  //         "i"
  //       );

  //       const match = currentPath.match(regex);

  //       if (match) {
  //         const matchedPath = match[0];
  //         const matchedIndex = menu.findIndex(
  //           (item) => item.href === matchedPath
  //         );

  //         if (matchedIndex !== -1) {
  //           return matchedIndex;
  //         }
  //       }

  //       return 0;
  //     };

  //     setCurrentPageSub(getCurrentPageSub());
  //   }, []);

  return (
    <div className="fixed h-screen w-64 pt-8- shadow z-10">
      <SideNavigation label="project" testId="side-navigation">
        <NavigationHeader>
          <div className="flex flex-col px-5 pt-16 pb-3">
            <div className="text-base text-brisma font-bold">
              <p>Project Details</p>
              <p>{data?.projectId?.toUpperCase()}</p>
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
          <div>
            <Section>
              <div className="-mx-2 pt-7">
                {menu.map((v, i) => {
                  return (
                    <Link
                      key={i}
                      href={baseUrl + v.href}
                      className={`flex ${
                        currentPage === i
                          ? `text-atlasian-blue-light`
                          : `text-black`
                      }  gap-2 items-center hover:no-underline no-underline py-2 px-7`}
                    >
                      <div>
                        <Image
                          src={
                            v.name === "Dokumen" ? ImageCircleCheck : ImageBar
                          }
                          alt=""
                        />
                      </div>
                      <div className="font-semibold text-base">{v.name}</div>
                    </Link>
                  );
                })}
              </div>
            </Section>

            <div className="border-b-2" />

            <Section>
              <div className="-mx-2 pt-7">
                {subMenu.map((v, i) => {
                  return (
                    <Link
                      key={i}
                      href={baseUrl + v.href}
                      className={`flex text-black gap-2 items-center hover:no-underline no-underline py-2 px-7`}
                    >
                      <div>
                        <Image
                          src={
                            v.name === "Dokumen" ? ImageCircleCheck : ImageBar
                          }
                          alt=""
                        />
                      </div>
                      <div className="font-semibold text-base">{v.name}</div>
                    </Link>
                  );
                })}
              </div>
            </Section>
          </div>
        </NavigationContent>
      </SideNavigation>
    </div>
  );
};
export default SidebarLandingEWPConsulting;

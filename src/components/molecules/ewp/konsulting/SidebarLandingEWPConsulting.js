import { useEffect, useState } from "react";
import { ImageBar, ImageCircleCheck } from "@/helpers/imagesUrl";
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
import { convertDate } from "@/helpers";

const SidebarLandingEWPConsulting = () => {
  //   const dispatch = useDispatch();
  const router = useRouter();
  const { id } = useRouter().query;
  const baseUrl = `/ewp/konsulting/overview/${id}`;
  const [data, setData] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  //   const [currentPageSub, setCurrentPageSub] = useState(0);
  const { projectDetail } = useProjectDetail({ id });
  console.log("projectDetail", projectDetail);

  useEffect(() => {
    const projectInfo = projectDetail?.data?.project_info;
    setData({
      projectId: projectInfo?.project_id,
      projectName: projectInfo?.project_name,
      statusName: projectInfo?.status_persetujuan_name,
      createdAt: convertDate(
        projectInfo?.info_periode_pelaksanaan_start,
        "/",
        "d"
      ),
      initiatorName: projectInfo?.initiator?.nama,
    });
  }, [projectDetail]);

  const menu = [
    { name: "Info", href: `/info`, isActive: true },
    {
      name: "Perencanaan",
      href: `/perencanaan`,
      isActive:
        projectDetail?.data?.realisasi?.penyusunan_mapa_real_start !== null,
    },
    {
      name: "Analisa",
      href: `/analisa/lingkup`,
      isActive:
        projectDetail?.data?.realisasi?.pelaksanaan_audit_real_start !== null,
    },
    {
      name: "Peluang Peningkatan",
      href: `/peluang-peningkatan`,
      isActive:
        projectDetail?.data?.realisasi?.peluang_peningkatan_real_start !== null,
    },
    {
      name: "Wrap up",
      href: `/wrap-up`,
      isActive:
        projectDetail?.data?.realisasi?.Wrapup_Meeting_real_start !== null,
    },
    {
      name: "Close",
      href: `/Close`,
      isActive:
        projectDetail?.data?.realisasi?.Wrapup_Meeting_real_start !== null,
    },
  ];

  const subMenu = [
    { name: "Log", href: `/log` },
    { name: "Dokumen", href: `/dokumen` },
    { name: "Meeting", href: `/meeting` },
  ];

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
            <div className="text-sm text-brisma font-bold mb-4">
              <p>{data?.projectName?.toUpperCase()}</p>
            </div>
            <div className="mb-2">
              <div className="text-sm text-brisma font-bold">PIC</div>
              <div className="text-sm text-brisma">
                {data?.initiatorName || "N/A"}
              </div>
            </div>
            <div className="mb-2">
              <div className="text-sm text-brisma font-bold">Created At</div>
              <div className="text-sm text-brisma">
                {data?.createdAt || "N/A"}
              </div>
            </div>
            <div className="mb-2">
              <div className="text-sm text-brisma font-bold">
                Document Status
              </div>
              <div className="text-sm text-brisma">
                {data?.statusName || "N/A"}
              </div>
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
                      }  gap-2 items-center hover:no-underline no-underline py-2 px-7 ${
                        v.isActive
                          ? `cursor-pointer`
                          : `hover:cursor-not-allowed pointer-events-none`
                      }`}
                      style={{
                        pointerEvents: v.isActive ? "auto" : "none",
                        opacity: v.isActive ? 1 : 0.5,
                        color: v.isActive ? "inherit" : "gray", // Change 'gray' to your desired color
                      }}
                    >
                      <div>
                        <Image
                          src={v.name === "Close" ? ImageCircleCheck : ImageBar}
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
                        <Image src={ImageBar} alt="" />
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

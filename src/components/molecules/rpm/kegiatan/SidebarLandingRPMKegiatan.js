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

const SidebarLandingRPMKegiatan = () => {
  const { id } = useRouter().query;
  const baseUrl = `/rpm/kegiatan/overview/${id}`;
  const [data, setData] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const { projectDetail } = useProjectDetail({ id });
  const [menu, setMenu] = useState([]);

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

    setMenu([
      {
        name: "Monitoring",
        href: `/peluang-peningkatan`,
        isActive: true,
      },
    ]);
  }, [projectDetail]);

  const subMenu = [
    { name: "Log", href: `/log` },
    { name: "Dokumen", href: `/dokumen` },
    { name: "Meeting", href: `/meeting` },
  ];

  useEffect(() => {
    const url = window.location.href;
    const regex = /\/overview\/\d+\/([^\/]+)/;
    const match = url.match(regex);

    if (match && match[1]) {
      setCurrentPage(match[1]);
    }
  }, []);

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
                {data?.initiatorName || "-"}
              </div>
            </div>
            <div className="mb-2">
              <div className="text-sm text-brisma font-bold">Created At</div>
              <div className="text-sm text-brisma">
                {data?.createdAt || "-"}
              </div>
            </div>
            <div className="mb-2">
              <div className="text-sm text-brisma font-bold">
                Document Status
              </div>
              <div className="text-sm text-brisma">
                {data?.statusName || "-"}
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
                      href={baseUrl + v?.href}
                      className={`flex ${
                        currentPage === v?.href?.replace(/\//g, "")
                          ? `text-atlasian-blue-light`
                          : `text-black`
                      } gap-2 items-center hover:no-underline no-underline py-2 px-7 ${
                        v?.isActive
                          ? `cursor-pointer`
                          : `hover:cursor-not-allowed pointer-events-none opacity-20`
                      }`}
                      style={{
                        pointerEvents: v?.isActive ? "auto" : "none",
                      }}
                    >
                      <div>
                        <Image
                          src={
                            v?.name === "Close" ? ImageCircleCheck : ImageBar
                          }
                          alt=""
                        />
                      </div>
                      <div className="font-semibold text-base">{v?.name}</div>
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
                      href={baseUrl + v?.href}
                      className={`flex gap-2 items-center ${
                        currentPage === v?.href?.replace(/\//g, "")
                          ? `text-atlasian-blue-light`
                          : `text-black`
                      } hover:no-underline no-underline py-2 px-7`}
                    >
                      <div>
                        <Image src={ImageBar} alt="" />
                      </div>
                      <div className="font-semibold text-base">{v?.name}</div>
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
export default SidebarLandingRPMKegiatan;

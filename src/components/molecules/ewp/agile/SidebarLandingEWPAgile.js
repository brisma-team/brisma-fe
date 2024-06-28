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
import { capitalizeEveryWord, convertDate } from "@/helpers";
import { useAuditInfo } from "@/data/ewp/common/info";

const SidebarLandingEWPAgile = () => {
  const { id } = useRouter().query;
  const baseUrl = `/ewp/agile/${id}`;
  const [data, setData] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const { auditInfo } = useAuditInfo({ module: "agile", id });
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    let subModule;
    const projectInfo = auditInfo?.data?.project_info;
    const projectRealisasi = auditInfo?.data?.realisasi;
    switch (projectInfo?.status_name) {
      case "mapa":
        subModule = "Project Plannings";
        break;
      case "pelaksanaan":
        subModule = "Project Executions";
        break;
      default:
        subModule = projectInfo?.status_name;
        break;
    }

    setData({
      projectId: projectInfo?.project_id,
      projectName: projectInfo?.project_name,
      documentName: subModule,
      statusName: projectInfo?.status_persetujuan_name,
      createdAt: convertDate(projectInfo?.createdAt, "/", "d"),
      initiatorName:
        projectInfo?.initiator?.pn + " - " + projectInfo?.initiator?.nama,
    });

    setMenu([
      { name: "Info", href: `/info`, isActive: true },
      {
        name: "Project Plannings",
        href: `/landing`,
        isActive: projectRealisasi?.penyusunan_mapa_real_start,
      },
      {
        name: "Project Executions",
        href: `/landing`,
        isActive: projectRealisasi?.pelaksanaan_audit_real_start,
      },
      {
        name: "Retro",
        href: `/landing`,
        isActive: projectRealisasi?.monitoring_real_start,
      },
      {
        name: "Wrap up",
        href: `/wrapup`,
        isActive: true,
      },
      {
        name: "Close",
        href: `/close`,
        isActive: projectRealisasi?.Wrapup_Meeting_real_end,
      },
    ]);
  }, [auditInfo]);

  const subMenu = [
    { name: "Log", href: `/log` },
    { name: "Dokumen", href: `/dokumen` },
    { name: "Meeting", href: `/meeting` },
  ];

  useEffect(() => {
    const url = window.location.href;
    const regex = /\/agile\/\d+\/([^\/]+)/;
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
              <div className="text-sm text-brisma font-bold">Initiator</div>
              <div className="text-sm text-brisma">
                {data?.initiatorName || "-"}
              </div>
            </div>
            <div className="mb-2">
              <div className="text-sm text-brisma font-bold">
                Tanggal Inisiasi
              </div>
              <div className="text-sm text-brisma">
                {data?.createdAt || "-"}
              </div>
            </div>
            <div className="mb-2">
              <div className="text-sm text-brisma font-bold">
                Project Status
              </div>
              <div className="text-sm text-brisma">
                {data?.statusName || "-"}
              </div>
            </div>
            <div className="mb-2">
              <div className="text-sm text-brisma font-bold">
                Document Status
              </div>
              <div className="text-sm text-brisma">
                {data?.documentName?.toLowerCase() == "final"
                  ? "Final"
                  : capitalizeEveryWord(data?.documentName) || "-"}
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
                        currentPage ===
                        v?.href?.split("/")?.filter((item) => item !== "")[0]
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
                        currentPage ===
                        v?.href?.split("/")?.filter((item) => item !== "")[0]
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
export default SidebarLandingEWPAgile;

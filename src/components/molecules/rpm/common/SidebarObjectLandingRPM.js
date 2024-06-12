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
import { useObjectAuditDetailRPM } from "@/data/rpm/common";
import { capitalizeEveryWord } from "@/helpers";

const SidebarObjectLandingRPM = ({ withMenu, module_page, module_data }) => {
  const router = useRouter();
  const [params, setParams] = useState({
    id: 0,
    kkpt_id: 0,
  });
  const baseUrl = `/rpm/${module_page}/${params?.id}/overview/${params?.kkpt_id}`;
  const [data, setData] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const { objectAuditDetailRPM } = useObjectAuditDetailRPM({
    id: params?.id,
    kkpt_id: params?.kkpt_id,
    module: module_data,
  });

  const [menu, setMenu] = useState([]);

  useEffect(() => {
    if (!router.isReady) return;
    const { id, kkpt_id } = router.query;
    setParams({
      id,
      kkpt_id,
    });
  }, [router.isReady]);

  useEffect(() => {
    const kkptInfo = objectAuditDetailRPM?.data?.kkpt;
    const projectInfo = objectAuditDetailRPM?.data?.project;
    setData({
      project_name: projectInfo?.nama_project,
      object: {
        id: kkptInfo?.kkpt_ewp?.kkpt?.kkpa?.mapa_project_audit?.project_id,
        name: kkptInfo?.kkpt_ewp?.kkpt?.kkpa?.mapa_project_audit?.project_name,
      },
      pic_submitter: projectInfo?.pic_auditee,
      pic_evaluator: projectInfo?.pic_auditor,
      pic_negotiator: projectInfo?.pic_nego,
    });

    setMenu([
      {
        name: "Tindak Lanjut",
        href: `/tindak-lanjut`,
      },
      {
        name: "Evaluasi",
        href: `/evaluasi`,
      },
      {
        name: "Negosiasi",
        href: `/negosiasi`,
      },
      {
        name: "Summary",
        href: `/summary`,
      },
    ]);
  }, [objectAuditDetailRPM]);

  const subMenu = [
    { name: "Log", href: `/log` },
    { name: "Dokumen", href: `/dokumen` },
    { name: "Meeting", href: `/meeting` },
  ];

  useEffect(() => {
    const url = window.location.href;

    const regexMenu = new RegExp(`/${module_page}/\\d+/([^/]+)`);
    const matchMenu = url.match(regexMenu);

    const regexSubMenu = new RegExp(
      `/${module_page}/\\d+/overview/\\d+/([^/]+)`
    );
    const matchSubMenu = url.match(regexSubMenu);

    if (matchSubMenu && matchSubMenu[1]) {
      const page = matchSubMenu[1];

      if (
        ["tindak-lanjut", "evaluasi", "negosiasi", "summary"].includes(page)
      ) {
        setCurrentPage(page);
      }
    } else if (matchMenu && matchMenu[1]) {
      setCurrentPage(matchMenu[1]);
    } else {
      setCurrentPage("");
    }
  }, [module_page]);

  return (
    <div className="fixed h-screen w-64 pt-8- shadow z-10">
      <SideNavigation label="project" testId="side-navigation">
        <NavigationHeader>
          <div className="flex flex-col gap-2.5 px-5 pt-16 pb-3">
            <div className="text-xs font-semibold text-atlasian-blue-light">
              RPM Kegiatan :{" "}
              {capitalizeEveryWord(module_page?.replace("-", " "))}
            </div>
            <div className="text-base text-brisma font-bold mb-4">
              {data?.project_name?.toUpperCase()}
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="text-sm text-brisma font-bold">Object Audit</div>
              <div className="text-sm text-brisma">
                {`[${data?.object?.id?.toUpperCase()}] ${data?.object?.name}`}
              </div>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="text-sm text-brisma font-bold">
                P.I.C Submitter
              </div>
              <div className="text-sm text-brisma">
                {data?.pic_submitter?.pn
                  ? `${data?.pic_submitter?.pn} - ${data?.pic_submitter?.nama}`
                  : "-"}
              </div>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="text-sm text-brisma font-bold">
                P.I.C Evaluator
              </div>
              <div className="text-sm text-brisma">
                {data?.pic_evaluator?.pn
                  ? `${data?.pic_evaluator?.pn} - ${data?.pic_evaluator?.nama}`
                  : "-"}
              </div>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="text-sm text-brisma font-bold">
                P.I.C Negotiator
              </div>
              <div className="text-sm text-brisma">
                {data?.pic_negotiator?.pn
                  ? `${data?.pic_negotiator?.pn} - ${data?.pic_negotiator?.nama}`
                  : "-"}
              </div>
            </div>
          </div>
        </NavigationHeader>
        <NavigationContent showTopScrollIndicator>
          <div>
            <Section>
              <div className="-mx-2 pt-7">
                {withMenu ? (
                  menu.map((v, i) => {
                    return (
                      <Link
                        key={i}
                        href={baseUrl + v?.href}
                        className={`flex ${
                          currentPage === v?.href?.replace(/\//g, "")
                            ? `text-atlasian-blue-light`
                            : `text-black`
                        } gap-2 items-center hover:no-underline no-underline py-2 px-7`}
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
                  })
                ) : (
                  <div className="min-h-[10rem]" />
                )}
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
export default SidebarObjectLandingRPM;

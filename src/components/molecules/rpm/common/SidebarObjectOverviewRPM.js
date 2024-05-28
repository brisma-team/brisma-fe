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
import { useProjectDetailRPM } from "@/data/rpm/common";
import { capitalizeEveryWord } from "@/helpers";

const SidebarObjectOverviewRPM = ({ module_page, module_data }) => {
  const router = useRouter();
  const [params, setParams] = useState({
    id: 0,
  });
  const baseUrl = `/rpm/${module_page}/${params?.id}`;
  const [data, setData] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const { projectDetailRPM } = useProjectDetailRPM({
    id: params?.id,
    module: module_data,
  });

  const [menu, setMenu] = useState([]);

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    setParams({
      id,
    });
  }, [router.isReady]);

  useEffect(() => {
    const projectInfo = projectDetailRPM?.data?.project;
    setData({
      project_name: projectInfo?.nama_project,
      pic_submitter: projectInfo?.pic_auditee,
      pic_evaluator: projectInfo?.pic_auditor,
      pic_negotiator: projectInfo?.pic_nego,
    });

    setMenu([
      {
        name: "Overview",
        href: `/overview`,
      },
      {
        name: "Team Management",
        href: `/tim`,
      },
    ]);
  }, [projectDetailRPM]);

  const subMenu = [
    { name: "Log", href: `/log` },
    { name: "Dokumen", href: `/dokumen` },
    { name: "Meeting", href: `/meeting` },
  ];

  useEffect(() => {
    const url = window.location.href;
    const regex = new RegExp(`/${module_page}/\\d+/([^/]+)`);
    const match = url.match(regex);

    if (match && match[1]) {
      setCurrentPage(match[1]);
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
                {menu.map((v, i) => {
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
export default SidebarObjectOverviewRPM;

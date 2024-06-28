import { Breadcrumbs, PageTitle } from "@/components/atoms";
import { CardContentLanding } from "@/components/molecules/ewp/agile/landing";
import { useAuditCanvas } from "@/data/ewp/agile/landing";
import { useAuditInfo } from "@/data/ewp/common/info";
import LandingLayoutEWPAgile from "@/layouts/ewp/LandingLayoutEWPAgile";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const index = () => {
  const router = useRouter();
  const [params, setParams] = useState({
    id: 0,
  });
  const baseUrl = `/ewp/agile/${params?.id}`;

  const [dataProjectName, setDataProjectName] = useState("");
  const [dataContentMenu, setDataContentMenu] = useState([]);
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const { auditInfo } = useAuditInfo({
    id: params?.id,
    module: "agile",
  });
  const { auditCanvas } = useAuditCanvas({ id: params?.id });

  useEffect(() => {
    if (auditInfo?.data) {
      setBreadcrumbs([
        { name: "Menu", path: "/dashboard" },
        { name: "EWP", path: "/ewp" },
        { name: "Agile / Overview", path: "/ewp/agile" },
        {
          name: `${auditInfo?.data?.project_info?.project_id?.toUpperCase()}`,
          path: baseUrl,
        },
      ]);
    } else {
      setBreadcrumbs([]);
    }
  }, [auditInfo]);

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    setParams({
      id,
    });
  }, [router.isReady]);

  useEffect(() => {
    console.log("auditCanvas => ", auditCanvas);
  }, [auditCanvas]);

  useEffect(() => {
    if (auditInfo?.data) {
      setDataProjectName(auditInfo?.data?.project_info?.project_name);
    } else {
      setDataProjectName("");
    }

    setDataContentMenu([
      {
        title: "Audit Canvas",
        description: "Project Mind-mapping BMC.",
        // status: landingStatus?.data?.sumber_informasi ? "success" : "failed",
        url: `${baseUrl}/landing/initiation/audit-canvas`,
      },
      {
        title: "Working Agreements",
        description: "Project guidelines.",
        // status: landingStatus?.data?.tim_audit ? "success" : "failed",
        url: `${baseUrl}/landing/initiation/working-agreements`,
      },
      {
        title: "Documents",
        description:
          "Tempat merangkum dan menginisiasi proposal workflow approval",
        // status: landingStatus?.data?.anggaran ? "success" : "failed",
        url: `${baseUrl}/landing/initiation/dokumen`,
      },
    ]);
  }, [auditInfo]);

  return (
    <LandingLayoutEWPAgile>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-7">
        <PageTitle text={dataProjectName || ""} />
      </div>
      {/* Start Content */}
      <div className="flex flex-col gap-3">
        <CardContentLanding
          title={"Project Initiation (High Level Overiview of Project)"}
          content={dataContentMenu}
        />
        <CardContentLanding
          title={"Project Plannings (Assessment Level of Project)"}
          content={dataContentMenu}
        />
        <CardContentLanding
          title={"Project Executions (Kick-Off)"}
          content={dataContentMenu}
        />
      </div>
      {/* End Content */}
    </LandingLayoutEWPAgile>
  );
};

export default index;

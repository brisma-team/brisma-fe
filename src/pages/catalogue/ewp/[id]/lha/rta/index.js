import { Breadcrumbs, PageTitle } from "@/components/atoms";
import { MainLayout } from "@/layouts";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
// import { eksumHtml } from "@/templates/catalog/ewp";
import {
  // DocumentViewer,
  ProjectInfo,
} from "@/components/molecules/catalog";

const index = () => {
  const router = useRouter();

  const [params, setParams] = useState({
    year: "2023",
    type: "2",
    id: "1",
  });

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    setParams({
      ...params,
      year: id?.split("x1c-")[2],
      type: id?.split("x1c-")[0],
      id: id?.split("x1c-")[1],
      uri: id,
    });
  }, [router.isReady]);

  const baseUrl = "/catalogue/ewp";
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "E.W.P", path: baseUrl },
    { name: "Daftar Dokumen", path: baseUrl + "/" + params.uri },
    {
      name: "Dokumen LHA-Rincian Temuan Audit",
      path: baseUrl + "/" + params.uri + "/lha/rta",
    },
  ];
  return (
    <MainLayout>
      <div className="px-5">
        <Breadcrumbs data={breadcrumbs} />
        <div className="flex justify-between items-center mb-6">
          <PageTitle text={"LHA-Rincian Temuan Audit"} />
        </div>
        <ProjectInfo
          type="ewp"
          year={params.year}
          source={params.type}
          id={params.id}
        />
        {/* ---Document---
          <DocumentViewer
            documentTitle="LHA-Rincian Temuan Audit"
            documentHtml={eksumHtml(params.year, params.type, params.id)}
          /> 
        */}
      </div>
    </MainLayout>
  );
};

export default index;

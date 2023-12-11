import { Breadcrumbs, PageTitle } from "@/components/atoms";
import { MainLayout } from "@/layouts";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import kkptHtml from "@/templates/catalog/ewp/kkpt";
import { DocumentViewer, ProjectInfo } from "@/components/molecules/catalog";

const index = () => {
  const router = useRouter();

  const [params, setParams] = useState({
    year: "2023",
    type: "2",
    id: "1",
    uri: "",
    kkptid: "",
  });

  useEffect(() => {
    if (!router.isReady) return;
    const { id, detail } = router.query;
    setParams({
      ...params,
      year: id?.split("x1c-")[2],
      type: id?.split("x1c-")[0],
      id: id?.split("x1c-")[1],
      uri: id,
      kkptid: detail.toUpperCase(),
    });
  }, [router.isReady]);

  const breadcrumbs = [
    { name: "Catalogue", path: "/catalogue" },
    { name: "E.W.P", path: "/catalogue/ewp" },
    { name: "Daftar Dokumen", path: "/catalogue/ewp/" + params.uri },
    { name: "Riwayat KKPT", path: "/catalogue/ewp/" + params.uri + "/kkpt" },
    {
      name: "Dokumen KKPT",
      path: "/catalogue/ewp/" + params.uri + "/kkpt/" + params.kkptid,
    },
  ];

  return (
    <MainLayout>
      <div className="px-5">
        <Breadcrumbs data={breadcrumbs} />
        <div className="flex justify-between items-center mb-6">
          <PageTitle text={"KKPT Dokumen"} />
        </div>
        <ProjectInfo
          type="ewp"
          id={params.id}
          year={params.year}
          source={params.type}
        />
        <DocumentViewer
          documentTitle="Kertas Kerja Pengawasan Temuan"
          documentHtml={kkptHtml(params.year, params.type, params.kkptid)}
        />
      </div>
    </MainLayout>
  );
};

export default index;

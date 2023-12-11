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
    const { id } = router.query;
    setParams({
      ...params,
      year: id?.split("x1c-")[2],
      type: id?.split("x1c-")[0],
      id: id?.split("x1c-")[1],
      uri: id,
      kkptid: id.toUpperCase(),
    });
  }, [router.isReady]);

  const breadcrumbs = [
    { name: "Catalogue", path: "/catalogue" },
    { name: "Pencarian Dokumen KKPT", path: "/catalogue/advance-filter/kkpt" },
    {
      name: "Dokumen KKPT",
      path: "/catalogue/advance-filter/kkpt/" + params.kkptid,
    },
  ];

  return (
    <MainLayout>
      <div className="px-5">
        <Breadcrumbs data={breadcrumbs} />
        <div className="flex justify-between items-center mb-6">
          <PageTitle text={"KKPT Dokumen"} />
        </div>
        {/* <ProjectInfo
          type="ewp"
          id={params.id}
          year={params.year}
          source={params.type}
        /> */}
        <DocumentViewer
          documentTitle="Kertas Kerja Pengawasan Temuan"
          documentHtml={kkptHtml(2022, 1, params.kkptid)}
        />
      </div>
    </MainLayout>
  );
};

export default index;

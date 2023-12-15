import { Breadcrumbs, PageTitle } from "@/components/atoms";
import { MainLayout } from "@/layouts";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import kkptHtml from "@/templates/catalog/ewp/kkpt";
import { DocumentViewer } from "@/components/molecules/catalog";

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
      kkptid: id.split("x1c-")[1].toUpperCase(),
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
        <DocumentViewer
          documentTitle="Kertas Kerja Pengawasan Temuan"
          documentHtml={kkptHtml(params.year, params.type, params.kkptid)}
        />
      </div>
    </MainLayout>
  );
};

export default index;

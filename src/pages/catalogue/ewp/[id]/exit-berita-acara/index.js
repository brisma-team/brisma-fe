import { Breadcrumbs, Card, PageTitle } from "@/components/atoms";
import { MainLayout } from "@/layouts";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { exitBaHtml } from "@/templates/catalog/ewp/exit-ba";

const index = () => {
  const { id } = useRouter().query;

  const [params, setParams] = useState({
    year: 2023,
    source: 2,
    id: 1,
  });

  useEffect(() => {
    if (id !== undefined) {
      setParams({
        year: id.split("x1c-")[2],
        source: id.split("x1c-")[0],
        id: id.split("x1c-")[1],
      });
    }
  }, [id]);

  const baseUrl = "/catalogue/ewp";
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "E.W.P", path: baseUrl },
    { name: "Daftar Dokumen", path: baseUrl + "/" + id },
    {
      name: "Dokumen Exit BA",
      path: baseUrl + "/" + id + "/exit-berita-acara",
    },
  ];

  return (
    <MainLayout>
      <div className="px-5">
        <Breadcrumbs data={breadcrumbs} />
        <div className="flex justify-between items-center mb-6">
          <PageTitle text={"Exit BA Dokumen"} />
        </div>

        {/* Start Content */}
        <div className="w-[70rem] gap-6">
          <div>
            <Card>
              <div className="overflow-y-scroll my-2">
                <div>
                  <div className="h-full w-full">
                    {params.id !== undefined && (
                      <div
                        className="mt-4 p-10"
                        dangerouslySetInnerHTML={{
                          __html: exitBaHtml(
                            params.year,
                            params.source,
                            params.id
                          ),
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
        {/* End Content */}
      </div>
    </MainLayout>
  );
};

export default index;

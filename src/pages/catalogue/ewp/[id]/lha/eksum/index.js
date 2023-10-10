import { Breadcrumbs, Card, PageTitle } from "@/components/atoms";
import { useSHAById } from "@/data/catalog";
import { MainLayout } from "@/layouts";
import { useRouter } from "next/router";

import { useState, useEffect } from "react";

const index = () => {
  const id = useRouter().query.id;

  const [selectedId, setSelectedId] = useState("");
  const [data, setData] = useState({});

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "E.W.P", path: "/catalogue/ewp" },
    { name: "Daftar Dokumen", path: "/catalogue/ewp/" + selectedId },
    {
      name: "Dokumen LHA-SHA",
      path: "/catalogue/ewp/" + selectedId + "/lha/sha",
    },
  ];
  useEffect(() => {
    if (id !== undefined) setSelectedId(id);
  }, [id]);

  const { shaDetail } = useSHAById(
    selectedId.split("x1c-")[2],
    selectedId.split("x1c-")[0],
    selectedId.split("x1c-")[1]
  );

  useEffect(() => {
    if (shaDetail !== undefined) {
      setData(shaDetail.data.sha);
    }
  }, [shaDetail]);
  return (
    <MainLayout>
      <div className="px-5">
        <Breadcrumbs data={breadcrumbs} />
        <div className="flex justify-between items-center mb-6">
          <PageTitle text={"Dokumen LHA-SHA"} />
        </div>
        {/* Start Content */}
        <div className="w-[70rem] gap-6">
          <div>
            <Card>
              <div className="overflow-y-scroll my-2">
                <div className={``}>
                  <div className="h-full w-full">
                    <div
                      className="mt-4 p-10"
                      dangerouslySetInnerHTML={{
                        __html: `<!DOCTYPE html>
                        <html lang="en">
                          <head>
                            <meta charset="UTF-8" />
                            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                            <title>Entrance Notulen</title>
                          </head>
                          <body>
                            <main>
                              ${data?.Content}
                            </main>
                          </body>
                        </html>
                        `,
                      }}
                    />
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

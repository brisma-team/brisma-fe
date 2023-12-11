import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { MainLayout } from "@/layouts";
import { Breadcrumbs, Card } from "@/components/atoms";
import Button from "@atlaskit/button";
import { TableField } from "@/components/atoms";
import { ProjectInfo } from "@/components/molecules/catalog";
import { useAddendumMAPAList } from "@/data/catalog/ewp";

const index = () => {
  const router = useRouter();

  const [addendumList, setAddendumList] = useState([]);
  const [mappedAddendum, setMappedAddendum] = useState([]);
  const [params, setParams] = useState({
    id: "1",
    year: "2023",
    source: "2",
    uri: "",
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
    { name: "Catalogue", path: "/catalogue" },
    { name: "E.W.P", path: baseUrl },
    { name: "Daftar Dokumen", path: baseUrl + "/" + params.uri },
    {
      name: "Daftar Dokumen Addendum MAPA",
      path: "/catalogue/ewp/" + params.uri + "/addendum-mapa",
    },
  ];

  const { addendumMAPA } = useAddendumMAPAList(params.id);

  useEffect(() => {
    if (addendumMAPA !== undefined) {
      setAddendumList(addendumMAPA.data.addendum_mapa_list);
    }
  }, [addendumMAPA]);

  useEffect(() => {
    if (addendumList !== undefined) {
      const mappingTypeList = addendumList.map((data, key) => {
        return {
          No: key + 1,
          "PN Maker": data.AddendumPNMaker,
          "Nama Maker": data.AddendumNamaMaker,
          "Addendum Ke": data.AddendumNumber,
          Aksi: (
            <Button
              href={"addendum-mapa/" + data.AddendumMapaID}
              isDisabled={data.isDisabled}
              appearance="primary"
            >
              {data.title != undefined ? data.title : "Lihat Pustaka"}
            </Button>
          ),
        };
      });
      setMappedAddendum(mappingTypeList);
    }
  }, [addendumList]);

  return (
    <MainLayout>
      <div className="px-5">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1">
            <div className="text-3xl font-bold">
              Kumpulan Dokumen Addendum MAPA
            </div>
          </div>
        </div>
        <ProjectInfo
          type="ewp"
          year={params.year}
          source={params.type}
          id={params.id}
        />
        <div className="mt-5 mr-40">
          <Card>
            <div className="w-full h-full px-6">
              <div className="text-xl font-bold p-5">
                Pustaka Dokumen Addendum MAPA
              </div>
              <div className="max-h-[29rem] overflow-y-scroll px-2 mb-5">
                <TableField
                  headers={[
                    "No",
                    "PN Maker",
                    "Nama Maker",
                    "Addendum Ke",
                    "Aksi",
                  ]}
                  columnWidths={["10%", "20%", "30%", "20%", "20%"]}
                  items={mappedAddendum}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default index;

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { MainLayout } from "@/layouts";
import { Breadcrumbs, Card } from "@/components/atoms";
import Button from "@atlaskit/button";
import { TableField } from "@/components/atoms";
import { ProjectInfo } from "@/components/molecules/catalog";
import { useAddendumPATList } from "@/data/catalog/pat";

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
      id: id,
      uri: id,
    });
  }, [router.isReady]);

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "P.A.T", path: "/catalogue/pat" },
    { name: "Daftar Dokumen", path: "/catalogue/pat/" + params.uri },
    {
      name: "Daftar Dokumen Addendum PAT",
      path: "/catalogue/pat/addendum-pat/" + params.uri,
    },
  ];

  const { addendumPAT } = useAddendumPATList(params.id);

  useEffect(() => {
    if (addendumPAT !== undefined) {
      setAddendumList(addendumPAT.data.addendum_pat_list);
    }
  }, [addendumPAT]);

  useEffect(() => {
    if (addendumList !== undefined) {
      const mappingTypeList = addendumList.map((data, key) => {
        return {
          No: key + 1,
          "PN Maker": data.AddendumMaker.pn,
          "Nama Maker": data.AddendumMaker.nama,
          "Jabatan Maker": data.AddendumMaker.jabatan,
          "Addendum Ke": data.AddendumNumber,
          "Tanggal Addendum": data.AddendumTime.split(".")[0],
          Aksi: (
            <Button
              href={"addendum-pat/" + data.AddendumPATID}
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
              Kumpulan Dokumen Addendum PAT
            </div>
          </div>
        </div>
        <ProjectInfo
          type="pat"
          year={params.year}
          source={params.type}
          id={params.id}
        />
        <div className="mt-5 mr-40">
          <Card>
            <div className="w-full h-full px-6">
              <div className="text-xl font-bold p-5">
                Pustaka Dokumen Addendum PAT
              </div>
              <div className="max-h-[29rem] overflow-y-scroll px-2 mb-5">
                <TableField
                  headers={[
                    "No",
                    "PN Maker",
                    "Nama Maker",
                    "Jabatan Maker",
                    "Addendum Ke",
                    "Tanggal Addendum",
                    "Aksi",
                  ]}
                  columnWidths={[
                    "5%",
                    "10%",
                    "20%",
                    "20%",
                    "15%",
                    "18%",
                    "12%",
                  ]}
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

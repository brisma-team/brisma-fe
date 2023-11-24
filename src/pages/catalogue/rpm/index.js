import { useState, useEffect } from "react";
import Link from "next/link";
import { MainLayout } from "@/layouts";
import { Breadcrumbs, Card, Pagination, TableField } from "@/components/atoms";
import Button from "@atlaskit/button";
import { IconArrowRight, IconPlus } from "@/components/icons";

import useCatalogRPM from "@/data/catalog/useCatalogRPM";
import { ModalSelectSourceData } from "@/components/molecules/catalog";

const index = () => {
  const { data } = useCatalogRPM();
  const breadcrumbs = [
    { name: "Catalogue", path: "/catalogue" },
    { name: "R.P.M", path: "/catalogue/rpm" },
  ];
  const [catRpm, setCatRpm] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    console.log(currentPage);
    if (data !== undefined) {
      const mappingCatRpm = data.data.map((v, key) => {
        return {
          No: key + 1,
          "Project ID": v?.ProjectID,
          "Nama Project": v?.NamaProject,
          "Jenis Audit": "SPESIAL",
          "Periode Audit": "Triwulan " + "I" + " - " + 2023,
          Aksi: (
            <div className="rounded-full overflow-hidden border-2 border-atlasian-blue-light w-7 h-7 pt-0.5 mx-auto active:bg-slate-100">
              <Link href={"/catalogue/rpm/" + v?.ProjectID}>
                <Button
                  shouldFitContainer
                  iconBefore={
                    <IconArrowRight primaryColor="#0051CB" size="medium" />
                  }
                  className="bottom-1.5"
                />
              </Link>
            </div>
          ),
        };
      });
      setCatRpm(mappingCatRpm);
    }
  }, [data]);
  return (
    <MainLayout>
      <ModalSelectSourceData
        showModal={showFilter}
        setShowModal={setShowFilter}
        sourceType={3}
      />
      <div className="px-5">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1">
            <div className="text-3xl font-bold">Catalogue R.P.M</div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            appearance="warning"
            iconBefore={IconPlus}
            onClick={() => setShowFilter(!showFilter)}
          >
            Sumber Data
          </Button>
        </div>
        <div className="mt-5 mr-40">
          <Card>
            <div className="w-full h-full px-6">
              <div className="text-xl font-bold p-5">Pustaka Dokumen</div>
              <div className="max-h-[40rem] overflow-y-scroll px-2 mb-5">
                <TableField
                  headers={[
                    "No",
                    "Project ID",
                    "Nama Project",
                    "Jenis Audit",
                    "Periode Audit",
                    "Aksi",
                  ]}
                  columnWidths={["5%", "15%", "30%", "15%", "17%", "5%"]}
                  items={catRpm}
                />
              </div>
              <div className="flex justify-center mt-5">
                <Pagination pages={1} setCurrentPage={setCurrentPage} />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default index;

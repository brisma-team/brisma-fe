import { useState, useEffect } from "react";
import Link from "next/link";
import { MainLayout } from "@/layouts";
import { Breadcrumbs, Card, Pagination, TableField } from "@/components/atoms";
import Button from "@atlaskit/button";
import { IconArrowRight, IconPlus } from "@/components/icons";
import { useSelector } from "react-redux";
import useCatalogEWP from "@/data/catalog/useCatalogEWP";
import ModalSelectSourceData from "@/components/molecules/catalog/ModalSelectSourceData";

const index = () => {
  // const router = useRouter();
  const [catEwp, setCatEwp] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "E.W.P", path: "/catalogue/ewp" },
  ];
  const searchParamObject = useSelector(
    (state) => state.catalogEWP.searchParamObjectCAT
  );

  useEffect(() => {
    if (!searchParamObject.year || !searchParamObject.source) {
      setShowFilter(true);
    }
  }, [searchParamObject]);

  const { ewpData } = useCatalogEWP(
    searchParamObject.year,
    searchParamObject.source
  );

  useEffect(() => {
    if (ewpData != undefined) {
      const mappingCatEwp = ewpData.data.map((EwpList, key) => ({
        No: key + 1,
        "Project ID": EwpList?.ProjectID,
        "Nama Project":
          EwpList?.ProjectName.length > 35
            ? EwpList?.ProjectName.substring(0, 35) + "..."
            : EwpList?.ProjectName,
        "Kantor Audit": EwpList?.OfficeName,
        "Tahun Audit": EwpList?.Year,
        "Objek Audit": EwpList?.ObjectName,
        Aksi: (
          <div className="rounded-full overflow-hidden border-2 border-atlasian-blue-light w-7 h-7 pt-0.5 mx-auto active:bg-slate-100">
            <Link
              href={
                "/catalogue/ewp/" +
                searchParamObject.source +
                "x1c-" +
                EwpList.ProjectID +
                "x1c-" +
                searchParamObject.year
              }
              prefetch={true}
            >
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
      }));
      setCatEwp(mappingCatEwp);
    }
  }, [ewpData]);

  return (
    <MainLayout>
      <ModalSelectSourceData
        showModal={showFilter}
        setShowModal={setShowFilter}
        sourceType={2}
      />
      <div className="px-5">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1">
            <div className="text-3xl font-bold">Catalogue E.W.P</div>
          </div>
        </div>
        <Button
          appearance="primary"
          iconBefore={IconPlus}
          onClick={() => setShowFilter(!showFilter)}
        >
          Filter Data
        </Button>

        <div className="mt-5 mr-40">
          <Card>
            <div className="w-full h-full px-6">
              <div className="text-xl font-bold p-5">Pustaka Dokumen</div>
              <div className="max-h-[29rem] overflow-y-scroll px-2 mb-5">
                <TableField
                  headers={[
                    "No",
                    "Project ID",
                    "Nama Project",
                    "Kantor Audit",
                    "Tahun Audit",
                    "Objek Audit",
                    "Aksi",
                  ]}
                  columnWidths={[
                    "5%",
                    "15%",
                    "40%",
                    "20%",
                    "16%",
                    "20%",
                    // "14%",
                    "7%",
                  ]}
                  items={catEwp}
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

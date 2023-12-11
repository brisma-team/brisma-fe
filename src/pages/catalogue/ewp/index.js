import { useState, useEffect } from "react";
import Link from "next/link";
import { MainLayout } from "@/layouts";
import {
  Breadcrumbs,
  Card,
  Pagination,
  TableField,
  TooltipField,
} from "@/components/atoms";
import Button from "@atlaskit/button";
import { IconArrowRight, IconPlus } from "@/components/icons";
import { useSelector } from "react-redux";
import useCatalogEWP from "@/data/catalog/useCatalogEWP";
import ModalSelectSourceData from "@/components/molecules/catalog/ModalSelectSourceData";
import shortenWord from "@/helpers/shortenWord";
import { loadingSwal } from "@/helpers";

const index = () => {
  const [catEwp, setCatEwp] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const breadcrumbs = [
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
    searchParamObject.source,
    currentPage,
    5,
    searchParamObject.projectName || "",
    searchParamObject.auditType || ""
  );

  useEffect(() => {
    if (ewpData != undefined) {
      loadingSwal("close");
      setTotalPages(ewpData.data.total_page);
      const mappingCatEwp = ewpData.data.ewp_list.map((EwpList, key) => ({
        No: (currentPage - 1) * 5 + key + 1,
        "Project ID": EwpList?.ProjectID,
        "Nama Project": (
          <TooltipField
            textButton={
              <p className="hover:text-blue-800 hover:underline">
                {shortenWord(EwpList?.ProjectName, 0, 30)}
              </p>
            }
            content={EwpList?.ProjectName}
            isLink={false}
            isText={false}
          />
        ),
        "Tahun Audit": EwpList?.Year,
        "Tipe Audit": EwpList?.ProjectType,
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
              <div className="max-h-[29rem] overflow-y-scroll px-2 mb-5">
                <TableField
                  headers={[
                    "No",
                    "Project ID",
                    "Nama Project",
                    "Tahun Audit",
                    "Tipe Audit",
                    "Aksi",
                  ]}
                  columnWidths={["5%", "25%", "40%", "16%", "20%", "17%"]}
                  items={catEwp}
                />
              </div>
              <div className="flex justify-center mt-5">
                <Pagination
                  pages={totalPages}
                  setCurrentPage={setCurrentPage}
                  withLoading={true}
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

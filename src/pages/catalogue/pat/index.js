import { useEffect, useState } from "react";
import Link from "next/link";
import { MainLayout } from "@/layouts";
import { Breadcrumbs, Card, TableField, Pagination } from "@/components/atoms";
import { IconArrowRight, IconPlus } from "@/components/icons";
import Button from "@atlaskit/button";
import useCatalogPAT from "@/data/catalog/useCatalogPAT";
import { ModalSelectSourceData } from "@/components/molecules/catalog";
import { useSelector } from "react-redux";

const index = () => {
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "P.A.T", path: "/catalogue/pat" },
  ];
  const [catPat, setCatPat] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [totalPage, setTotalPage] = useState(1);

  const searchParamObject = useSelector(
    (state) => state.catalogPAT.searchParamObjectCAT
  );

  useEffect(() => {
    if (!searchParamObject.year || !searchParamObject.source) {
      setShowFilter(true);
    }
  }, [searchParamObject]);

  const { patListData } = useCatalogPAT(
    searchParamObject.year,
    searchParamObject.source,
    currentPage,
    5,
    searchParamObject.projectName || "",
    searchParamObject.auditOffice || "",
    searchParamObject.faseAddendum || 0
  );

  useEffect(() => {
    if (patListData !== undefined) {
      setTotalPage(patListData.totalPages);
      const mappingCatPat = patListData?.data?.map((v, key) => {
        return {
          No: (currentPage - 1) * 5 + key + 1,
          "Nama Project": v?.name,
          "Kantor Audit": v?.uka_name,
          "Tahun Audit": v?.tahun,
          "Addendum Ke": v?.riwayat_adendum,
          Aksi: (
            <div className="rounded-full overflow-hidden border-2 border-atlasian-blue-light w-7 h-7 pt-0.5 mx-auto active:bg-slate-100">
              <Link href={"/catalogue/pat/" + v?.id}>
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
      setCatPat(mappingCatPat);
    }
  }, [patListData]);

  return (
    <MainLayout>
      <ModalSelectSourceData
        showModal={showFilter}
        setShowModal={setShowFilter}
        sourceType={1}
      />
      <div className="px-5">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-3xl font-bold">Catalogue P.A.T</div>
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
                    "Nama Project",
                    "Kantor Audit",
                    "Tahun Audit",
                    "Addendum Ke",
                    "Aksi",
                  ]}
                  columnWidths={["5%", "23%", "20%", "15%", "18%", "12%", "7%"]}
                  items={catPat}
                />
              </div>
              <div className="flex justify-center mt-5">
                <Pagination pages={totalPage} setCurrentPage={setCurrentPage} />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default index;

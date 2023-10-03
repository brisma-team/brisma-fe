import { useState, useEffect } from "react";
import Link from "next/link";
import { MainLayout } from "@/layouts";
import { Breadcrumbs, Card, Pagination, TableField } from "@/components/atoms";
import Button from "@atlaskit/button";
import { IconArrowRight, IconPlus } from "@/components/icons";
import { useSelector } from "react-redux";
import useCatalogEWP from "@/data/catalog/useCatalogEWP";
import ModalSelectSourceData from "@/components/molecules/catalog/ModalSelectSourceData";
import shortenWord from "@/helpers/shortenWord";

const index = () => {
  // const router = useRouter();
  const [catEwp, setCatEwp] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchFilter, setSearchFilter] = useState("");

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
      const mappingCatEwp = ewpData.data.ewp_list
        .filter(
          (list) =>
            list.ProjectID.toString()
              .toLowerCase()
              .includes(searchFilter.toLowerCase()) ||
            list.ProjectName.toLowerCase().includes(searchFilter.toLowerCase())
        )
        .map((EwpList, key) => ({
          No: key + 1,
          "Project ID": EwpList?.ProjectID,
          "Nama Project": shortenWord(EwpList?.ProjectName, 0, 35),
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
  }, [ewpData, searchFilter]);

  useEffect(() => {
    console.log(currentPage);
  }, []);

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
              {/* <input
                type="text"
                name=""
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
              /> */}
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

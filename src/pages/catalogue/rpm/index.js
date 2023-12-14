import { useState, useEffect } from "react";
import Link from "next/link";
import { MainLayout } from "@/layouts";
import {
  Breadcrumbs,
  Card,
  CustomPagination,
  TableField,
  TooltipField,
} from "@/components/atoms";
import Button from "@atlaskit/button";
import { IconArrowRight, IconPlus } from "@/components/icons";
import useCatalogRPM from "@/data/catalog/useCatalogRPM";
import { ModalSelectSourceData } from "@/components/molecules/catalog";
import { useSelector } from "react-redux";
import shortenWord from "@/helpers/shortenWord";

const index = () => {
  const breadcrumbs = [
    { name: "Catalogue", path: "/catalogue" },
    { name: "R.P.M", path: "/catalogue/rpm" },
  ];
  const [catRpm, setCatRpm] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalData, setTotalData] = useState(1);

  const searchParamObject = useSelector(
    (state) => state.catalogRPM.searchParamObjectCAT
  );

  useEffect(() => {
    if (!searchParamObject.year || !searchParamObject.source) {
      setShowFilter(true);
    }
  }, [searchParamObject]);

  const { data } = useCatalogRPM(
    searchParamObject.year,
    searchParamObject.source,
    currentPage,
    5,
    searchParamObject.projectName || ""
  );

  function formatTimestampToQuarterYear(timestamp) {
    const dateObject = new Date(timestamp);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1; // Month is zero-based, so we add 1

    const quarterMap = {
      1: "I",
      2: "I",
      3: "I",
      4: "II",
      5: "II",
      6: "II",
      7: "III",
      8: "III",
      9: "III",
      10: "IV",
      11: "IV",
      12: "IV",
    };
    const quarter = quarterMap[month];

    return "Triwulan " + quarter + " - " + year;
  }

  useEffect(() => {
    if (data !== undefined) {
      setTotalData(data?.data?.total_data);
      const mappingCatRpm = data?.data?.rpm?.map((v, key) => {
        return {
          No: key + 1,
          "Project ID": v?.ProjectID,
          "Nama Project": (
            <TooltipField
              textButton={
                <p className="hover:text-blue-800 hover:underline">
                  {shortenWord(v?.NamaProject, 0, 30)}
                </p>
              }
              content={v?.NamaProject}
              isLink={false}
              isText={false}
            />
          ),
          "Jenis Audit": v?.ProjectType,
          "Periode Audit": formatTimestampToQuarterYear(v?.CreatedAt),
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
                <CustomPagination
                  defaultCurrentPage={1}
                  perPage={5}
                  totalData={totalData}
                  handleSetPagination={async (start, end, pageNow) =>
                    setCurrentPage(pageNow)
                  }
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

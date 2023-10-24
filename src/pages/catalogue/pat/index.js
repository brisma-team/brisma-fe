import { useEffect, useState } from "react";
import Link from "next/link";
import { MainLayout } from "@/layouts";
import { Breadcrumbs, Card, TableField, Pagination } from "@/components/atoms";
import { IconArrowRight, IconClose, IconPlus } from "@/components/icons";
import Button from "@atlaskit/button";
import Textfield from "@atlaskit/textfield";
import useCatalogPAT from "@/data/catalog/useCatalogPAT";

const index = () => {
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "P.A.T", path: "/catalogue/pat" },
  ];
  const [showFilter, setShowFilter] = useState(false);
  const [catPat, setCatPat] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [patData, setPatData] = useState([]);

  const { data } = useCatalogPAT(2023, 2, currentPage);

  useEffect(() => {
    if (data !== undefined) {
      setPatData(data.data);
      setTotalPage(data.totalPages);
    }
  }, [data]);

  useEffect(() => {
    if (patData !== undefined) {
      const mappingCatPat = patData.map((v, key) => {
        return {
          No: key + 1,
          "Nama Project": v?.name,
          "Kantor Audit": v?.uka + " - ",
          "Tahun Audit": v?.tahun,
          "Addendum Ke": "Fase ke - " + 0,
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
  }, [patData]);

  return (
    <MainLayout>
      <div className="px-5">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-3xl font-bold">Catalogue P.A.T</div>
        </div>
        {/* Start Filter */}
        <div className="my-3 w-40">
          <Button
            appearance="primary"
            iconBefore={IconPlus}
            shouldFitContainer
            onClick={() => setShowFilter(!showFilter)}
          >
            Tampilkan Filter
          </Button>
        </div>
        {showFilter && (
          <div className="flex justify-between w-96">
            <Card>
              <div className="flex p-2">
                <div className="w-1/2">
                  <Textfield
                    placeholder="ID Projek"
                    className="mr-1"
                    elemAfterInput={
                      <button className="justify-center">
                        <IconClose size="large" />
                      </button>
                    }
                  />
                </div>
                <div className="w-1/2">
                  <Textfield
                    placeholder="Nama Projek"
                    className="ml-1"
                    elemAfterInput={
                      <button className="justify-center">
                        <IconClose size="large" />
                      </button>
                    }
                  />
                </div>
              </div>
              <div className="flex p-2">
                <div className="w-1/2">
                  <Textfield
                    placeholder="Kantor Audit"
                    className="mr-1"
                    elemAfterInput={
                      <button className="justify-center">
                        <IconClose size="large" />
                      </button>
                    }
                  />
                </div>
                <div className="w-1/2">
                  <Textfield
                    placeholder="Triwulan"
                    className="ml-1"
                    elemAfterInput={
                      <button className="justify-center">
                        <IconClose size="large" />
                      </button>
                    }
                  />
                </div>
              </div>
            </Card>
          </div>
        )}
        {/* End Filter */}

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

import { useEffect, useState } from "react";
import Link from "next/link";
import { MainLayout } from "@/layouts";
import { Breadcrumbs, Card, TableField } from "@/components/atoms";
import { IconArrowRight, IconClose, IconPlus } from "@/components/icons";
import Button from "@atlaskit/button";
import Textfield from "@atlaskit/textfield";
import useCatalogPAT from "@/data/catalog/useCatalogPAT";
import EditorPanelIcon from "@atlaskit/icon/glyph/editor/panel";

const index = () => {
  const [showFilter, setShowFilter] = useState(false);
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "P.A.T", path: "/catalogue/pat" },
  ];
  const [catPat, setCatPat] = useState([]);
  const { data } = useCatalogPAT();
  useEffect(() => {
    if (data != undefined) {
      const mappingCatPat = data?.data.map((v, key) => {
        return {
          No: key + 1,
          "Nama Project": v?.project_name,
          "Kantor Audit":
            v?.audit_office.uka_kode + " - " + v?.audit_office.uka_name,
          "Tahun Audit": v?.audit_year,
          "Tim Audit": v?.audit_team.map((d, key) => {
            return (
              <div key={key} className="flex justify-between">
                <p className="mr-2">{d.name}</p>
                <div className="rounded-full overflow-hidden w-5 h-[21px] mx-auto active:bg-slate-100">
                  <Button
                    appearance="default"
                    shouldFitContainer
                    onClick={() => alert("info")}
                    iconBefore={
                      <EditorPanelIcon primaryColor="#0051CB" size="large" />
                    }
                    className="bottom-1.5"
                  />
                </div>
              </div>
            );
          }),
          "Addendum Ke": "Fase ke - " + v?.addendum_phase,
          Aksi: (
            <div className="rounded-full overflow-hidden border-2 border-atlasian-blue-light w-7 h-7 pt-0.5 mx-auto active:bg-slate-100">
              <Link href={"/catalogue/pat/" + v?._id} prefetch={false}>
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
  }, [data]);
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
                    // "Periode Audit",
                    "Tim Audit",
                    "Addendum Ke",
                    "Aksi",
                  ]}
                  columnWidths={[
                    "5%",
                    "23%",
                    "20%",
                    "15%",
                    // "15%",
                    "18%",
                    "12%",
                    "7%",
                  ]}
                  items={catPat}
                />
              </div>
              {/* <div className="flex justify-center mt-5">
                <Pagination totalPages={3} setCurrentPage={setCurrentPage} />
              </div> */}
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default index;

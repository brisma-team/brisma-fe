import React, { useState, useEffect } from "react";
import { MainLayout } from "@/layouts";
import { Breadcrumbs, Card, Pagination } from "@/components/atoms";
import Button from "@atlaskit/button";
import { useRouter } from "next/router";
// import { useSelector } from "react-redux";
// import DocumentIcon from "@atlaskit/icon/glyph/document";
// import { Worker, Viewer } from "@react-pdf-viewer/core";

import { TableField } from "@/components/atoms";
import useCatalogEWPById from "@/data/catalog/useCatalogEWPById";

const index = () => {
  const id = useRouter().query.id;

  const [catDetailEwp, setCatDetailEwp] = useState([]);
  const [currentPage, setCurrentPage] = useState([]);
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "E.W.P", path: "/catalogue/ewp" },
    { name: "Detail", path: "/catalogue/ewp/" + id },
    { name: "Daftar Dokumen", path: "/catalogue/ewp/" + id },
  ];

  const { ewpDetailData } = useCatalogEWPById(
    id.split("x1c-")[2],
    id.split("x1c-")[0],
    id.split("x1c-")[1]
  );
  useEffect(() => {
    if (ewpDetailData != undefined) {
      const mappingCatEwp = ewpDetailData.data.map((v, key) => {
        const datePart = v?.CreatedAt.split(".")[0];
        return {
          No: key + 1,
          "Nama Dokumen": v?.AttachmentName,
          "Tanggal Dibuat": datePart,
          Aksi: (
            <div className="grid grid-cols-3 text-center col-span-3">
              <div className="align-middle px-2">
                <Button shouldFitContainer isDisabled appearance="primary">
                  History
                </Button>
              </div>
              <div className="align-middle px-2">
                <Button shouldFitContainer isDisabled appearance="primary">
                  Preview
                </Button>
              </div>
              <div className="align-middle px-2 ">
                <Button shouldFitContainer isDisabled appearance="primary">
                  Download
                </Button>
              </div>
            </div>
          ),
        };
      });
      setCatDetailEwp(mappingCatEwp);
    }
  }, [ewpDetailData]);

  return (
    <MainLayout>
      <div className="px-5">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        {/* Start Filter */}
        {/* <div className="my-3 w-40">
          <Button
            appearance="primary"
            iconBefore={IconPlus}
            shouldFitContainer
            onClick={() => setShowFilter(!showFilter)}
          >
            Tampilkan Filter
          </Button>
        </div> */}
        {/* {showFilter && (
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
        )} */}
        {/* End Filter */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1">
            <div className="text-3xl font-bold">Catalogue E.W.P</div>
          </div>
        </div>
        {/* End Modal */}
        {/* <div className="mt-5 mr-40">
          <Card>
            <div className="w-full p-5">
              <div className="flex flex-row justify-between mb-6">
                <div className="text-xl font-bold pl-5">Informasi</div>
              </div>
              <div className="grid grid-cols-2 font-normal text-base pl-5">
                <div className="flex flex-row mb-2">
                  <div className="flex-1 ">Project ID</div>
                  <div className="flex-1">: {selectedData.ewp_id}</div>
                </div>
                <div className="flex flex-row">
                  <div className="flex-1">Nama Project</div>
                  <div className="flex-1">: {selectedData.project_name}</div>
                </div>
                <div className="flex flex-row">
                  <div className="flex-1">Tipe Audit</div>
                  <div className="flex-1">: {selectedData.audit_type_name}</div>
                </div>
                <div className="flex flex-row">
                  <div className="flex-1">Periode Audit</div>
                  <div className="flex-1">: {selectedData.audit_year}</div>
                </div>
              </div>
            </div>
          </Card>
        </div> */}

        <div className="mt-5 mr-40">
          <Card>
            <div className="w-full h-full px-6">
              <div className="text-xl font-bold p-5">Pustaka Dokumen</div>
              {/* <div className="flex justify-row mb-5">
                <button
                  onClick={() => setSelectedFilterId("all")}
                  className={`mr-3 pointer-events-auto border p-2 rounded-lg hover:bg-blue-50 hover:border-blue-500 hover:text-blue-500 ${
                    selectedFilterId == "all"
                      ? "border-blue-500"
                      : "border-slate-400"
                  } shadow`}
                >
                  <span
                    className={`px-3 ${
                      selectedFilterId == "all" ? "text-blue-500" : ""
                    }`}
                  >
                    All
                  </span>
                </button>
                {["Entrance", "KKPA", "KKPT"].map((text, key) => {
                  return (
                    <button
                      onClick={() => setSelectedFilterId(text)}
                      key={key}
                      className={`mr-3 pointer-events-auto border p-2 rounded-lg hover:bg-sky-50 hover:border-blue-500 hover:text-blue-500 ${
                        text == selectedFilterId
                          ? "border-blue-500 text-blue-500"
                          : "border-slate-400"
                      } shadow`}
                    >
                      <span className="px-3">{text}</span>
                    </button>
                  );
                })}
              </div> */}
              <div className="max-h-[29rem] overflow-y-scroll px-2 mb-5">
                <TableField
                  headers={["No", "Nama Dokumen", "Tanggal Dibuat", "Aksi"]}
                  columnWidths={["5%", "35%", "30%", "30%"]}
                  items={catDetailEwp}
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

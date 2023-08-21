import React, { useEffect, useState } from "react";
import { MainLayout } from "@/layouts";
import { Breadcrumbs, Card, TableField, Modal } from "@/components/atoms";
import Button from "@atlaskit/button";
import useCatalogPATById from "@/data/catalog/useCatalogPATById";
import { useRouter } from "next/router";
import EmptyField from "@/components/atoms/EmptyState";

const index = () => {
  const router = useRouter();
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "P.A.T", path: "/catalogue/pat" },
    { name: "P.A.T Detail", path: "/catalogue/pat/" + router.query.id },
  ];
  const [catPat, setCatPat] = useState([]);

  const { data } = useCatalogPATById(router.query.id);

  useEffect(() => {
    if (data != undefined) {
      const mappingCatPat = data?.data[0].project_documents.map((v, key) => {
        return {
          No: key + 1,
          "Nama Dokumen": v?.dokumen,
          "Tanggal Dibuat": v?.tanggal_document,
          Aksi: (
            <div className="grid grid-cols-3 text-center col-span-3">
              <div className="align-middle px-2">
                <Button
                  shouldFitContainer
                  appearance="primary"
                  onClick={() => {
                    setShowModalHistory(true);
                    setSelectedItemHistory(v?.history);
                  }}
                >
                  History
                </Button>
              </div>
              <div className="align-middle px-2">
                <Button
                  shouldFitContainer
                  appearance="primary"
                  onClick={() => {
                    setShowModalPreview(true);
                    setSelectedDocument(v?.document_location);
                  }}
                >
                  Preview
                </Button>
              </div>
              <div className="align-middle px-2 ">
                <Button shouldFitContainer appearance="primary">
                  Download
                </Button>
              </div>
            </div>
          ),
        };
      });
      setCatPat(mappingCatPat);
    }
  }, [data]);
  const [showModalHistory, setShowModalHistory] = useState(false);
  const [showModalPreview, setShowModalPreview] = useState(false);
  const [selectedItemHistory, setSelectedItemHistory] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState("");
  return (
    <MainLayout>
      <div className="px-5">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}

        {/* Start Modal */}
        {selectedItemHistory && (
          <Modal
            showModal={showModalHistory}
            positionCenter={true}
            onClickOutside={() => setShowModalHistory(false)}
          >
            <div className="w-[44rem] h-modal p-5">
              <div className="text-xl font-bold text-atlasian-blue-dark mb-5">
                Download History
              </div>
              <div className="leading-3">
                <div className="mt-2 px-6 py-3 border-b-[1px] hover:bg-gray-100 border-gray-300 font-bold">
                  <div className="grid grid-cols-4">
                    <div className="col-span-2">Nama Pengguna</div>
                    <div>Tanggal</div>
                    <div className="text-center">Jam</div>
                  </div>
                </div>
                {selectedItemHistory.map((history, key) => {
                  const [datePart, timePart] = history.downloaded_at.split("T");
                  return (
                    <div
                      className="px-6 py-5 border-b-[1px] border-gray-300 hover:bg-gray-100"
                      key={key}
                    >
                      <div className="grid grid-cols-4">
                        <div className="col-span-2 my-auto">
                          {history.downloaded_by.nama
                            ? history.downloaded_by.nama
                            : ""}
                        </div>
                        <div className="my-auto">
                          {datePart ? datePart : ""}
                        </div>
                        <div className="text-center my-auto">
                          {timePart ? timePart.split(".")[0] + " WIB" : ""}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Modal>
        )}
        {/* End Modal */}
        {/* Start Modal */}
        {selectedDocument && (
          <Modal
            showModal={showModalPreview}
            positionCenter={true}
            onClickOutside={() => setShowModalPreview(false)}
          >
            <div className="w-[44rem] h-modal p-5">
              <div className="text-xl font-bold text-atlasian-blue-dark mb-5">
                Preview Document
              </div>
              <div className="leading-3">
                <EmptyField />
                {/* <iframe src={selectedDocument} title="Preview"></iframe> */}
              </div>
            </div>
          </Modal>
        )}
        {/* End Modal */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-3xl font-bold">Catalogue P.A.T</div>
        </div>

        <div className="mt-5 mr-40">
          <Card>
            <div className="w-full h-full px-6">
              <div className="text-xl font-bold p-5">Pustaka Dokumen</div>
              <div className="max-h-[29rem] overflow-y-scroll px-2 mb-5">
                <TableField
                  headers={["No", "Nama Dokumen", "Tanggal Dibuat", "Aksi"]}
                  columnWidths={["10%", "30%", "30%", "30%"]}
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

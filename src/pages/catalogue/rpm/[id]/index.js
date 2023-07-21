import React, { useState } from "react";
import { MainLayout } from "@/layouts";
import { Breadcrumbs, Card, Modal } from "@/components/atoms";
import Button from "@atlaskit/button";
import Select from "@atlaskit/select";
import Textfield from "@atlaskit/textfield";
import { IconClose, IconPlus } from "@/components/icons";
import { useRouter } from "next/router";
import DocumentIcon from "@atlaskit/icon/glyph/document";

const approvalData = [
  {
    id: 1,
    part: "Action Plan",
    document_name: "Action Plan",
    date: "10 Juli 2023",
    attachment: "preventive - Test",
  },
  {
    id: 2,
    part: "Surat Evaluasi",
    document_name: "Surat Evaluasi",
    date: "20 Juli 2023",
    attachment: "Surat Evaluasi",
  },
];

const histories = [
  {
    id: 1,
    data: [
      {
        account: "11151700023 - Iqbal",
        date: "9 Juli 2023",
        time: "18.01",
      },
      {
        account: "1151800032 - Samuel",
        date: "9 Juli 2023",
        time: "15.01",
      },
    ],
  },
  {
    id: 2,
    data: [
      {
        account: "1151900010 - Dandi",
        date: "8 Juli 2023",
        time: "16.01",
      },
    ],
  },
];

const index = ({ data = approvalData }) => {
  const id = useRouter().query.id;
  const [showModal, setShowModal] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    id: 0,
    document_name: "No Document",
    date: "10 Juli 1999",
    attachment: "empty.pdf",
  });

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "R.P.M", path: "/catalogue/rpm" },
    { name: id, path: "/catalogue/rpm/" + id },
    { name: "Daftar Dokumen", path: "/catalogue/rpm/" + id },
  ];
  const handleHistoryDownload = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  // const handlePreviewDocs = (id) => {

  // }

  // const handleDownload = (id) => {

  // }
  return (
    <MainLayout>
      <div className="px-5">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1">
            <div className="text-3xl font-bold">Catalogue R.P.M</div>
          </div>
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
          <div className="flex justify-between">
            <Card>
              <div className="flex m-2 w-96">
                <div className="w-1/2">
                  <Textfield
                    placeholder="Nama Dokumen"
                    className="mr-3"
                    elemAfterInput={
                      <button className="justify-center">
                        <IconClose size="large" />
                      </button>
                    }
                  />
                </div>
                <div className="w-1/2">
                  <Select options={[]} placeholder="Part" />
                </div>
              </div>
              {/* <div className="flex m-2 w-96">
                <div className="w-1/2">
                  <Textfield
                    placeholder="Nama Proyek"
                    className="mr-3"
                    elemAfterInput={
                      <button className="justify-center">
                        <IconClose size="large" />
                      </button>
                    }
                  />
                </div>
                <div className="w-1/2">
                  <Select options={[]} placeholder="Status Persetujuan" />
                </div>
              </div> */}
            </Card>
          </div>
        )}
        {/* End Filter */}
        {/* Start Modal */}
        {selectedItem && (
          <Modal
            showModal={showModal}
            onClickOutside={() => setShowModal(false)}
          >
            <div>
              <div className="w-full p-5">
                <div className="text-xl font-bold text-atlasian-blue-dark mb-5">
                  Download History
                </div>
                <div className="flex pl-3 text-sm font-semibold text-atlasian-blue-dark items-center underline">
                  <DocumentIcon />
                  <span className="ml-2">{selectedItem.attachment}</span>
                </div>
                <div className="leading-3">
                  <>
                    <div className="mt-2 px-6 py-3 border-b-[1px] hover:bg-gray-100 border-gray-300 font-bold">
                      <div className="grid grid-cols-4">
                        <div className="col-span-2">Nama Akun</div>
                        <div>Tanggal</div>
                        <div className="text-center">Jam</div>
                      </div>
                    </div>

                    {histories
                      .filter((items) => items.id == selectedItem.id)
                      .map((history) => {
                        return history.data.map((content, key) => {
                          return (
                            <div
                              className="px-6 py-5 border-b-[1px] border-gray-300 hover:bg-gray-100"
                              key={key}
                            >
                              <div className="grid grid-cols-4">
                                <div className="col-span-2 my-auto">
                                  {content.account ? content.account : ""}
                                </div>
                                <div className="my-auto">
                                  {content.date ? content.date : ""}
                                </div>
                                <div className="text-center my-auto">
                                  {content.time ? content.time : ""}
                                </div>
                              </div>
                            </div>
                          );
                        });
                      })}
                  </>
                </div>
              </div>
            </div>
          </Modal>
        )}
        {/* End Modal */}
        <div className="mt-5 mr-40">
          <Card>
            <div className="w-full p-5">
              <div className="flex flex-row justify-between mb-6">
                <div className="text-xl font-bold text-atlasian-blue-dark">
                  Daftar Dokumen
                </div>
              </div>
              <div className="leading-3">
                <div>
                  <div className="mt-2 px-6 py-3 border-b-[1px] hover:bg-gray-100 border-gray-300 font-bold">
                    <div className="grid grid-cols-10">
                      <div className="col-span-2">Part</div>
                      <div className="col-span-2">Nama Dokumen</div>
                      <div>Tanggal</div>
                      <div className="text-center col-span-2">Lampiran</div>
                      <div className="text-center col-span-3">Aksi</div>
                    </div>
                  </div>

                  {data?.map((item, key) => {
                    return (
                      <div
                        className="px-6 py-5 border-b-[1px] border-gray-300 hover:bg-gray-100"
                        key={key}
                      >
                        <div className="grid grid-cols-10">
                          <div className="col-span-2 my-auto">{item.part}</div>
                          <div className="col-span-2 my-auto">
                            {item.document_name}
                          </div>
                          <div className="my-auto">{item.date}</div>
                          <div className="text-center my-auto col-span-2">
                            {item.attachment}
                          </div>
                          <div className="grid grid-cols-3 text-center col-span-3">
                            <div className="align-middle px-2">
                              <Button
                                shouldFitContainer
                                appearance="primary"
                                onClick={() => handleHistoryDownload(item)}
                              >
                                History
                              </Button>
                            </div>
                            <div className="align-middle px-2">
                              <Button shouldFitContainer appearance="primary">
                                Preview
                              </Button>
                            </div>
                            <div className="align-middle px-2 ">
                              <Button shouldFitContainer appearance="primary">
                                Download
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* <div className="flex justify-center mt-4">
                <Pagination
                  nextLabel="Next"
                  label="Page"
                  pageLabel="Page"
                  pages={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                  previousLabel="Previous"
                />
              </div> */}
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default index;

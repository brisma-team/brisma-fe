import { useState } from "react";
import Link from "next/link";
import { MainLayout } from "@/layouts";
import { Breadcrumbs, Card } from "@/components/atoms";
import Button from "@atlaskit/button";
import { IconArrowRight, IconClose, IconPlus } from "@/components/icons";
import Select from "@atlaskit/select";
import Textfield from "@atlaskit/textfield";

const approvalData = [
  {
    id: 1,
    project_name: "Test After Fixing",
    audit_type: "Special",
    quarter: "I",
    date: "2023-02-07",
    audit_object: "Divisi MIS & Reporting",
    audit_team: [
      {
        name: "Frida Sinaga",
        role: "KTA",
      },
      {
        name: "Irene Selvi Tahirs",
        role: "MA",
      },
      {
        name: "Katon Kuntjahjono",
        role: "ATA",
      },
    ],
    addendum_phase: "I",
  },
  {
    id: 2,
    project_name: "Test 1.1",
    audit_type: "Tematik",
    quarter: "I",
    date: "2023-03-15",
    audit_object: "Divisi Claims",
    audit_team: [
      {
        name: "Irene Selvi Tahirs",
        role: "KTA",
      },
      {
        name: "Katon Kuntjahjono",
        role: "MA",
      },
    ],
    addendum_phase: "I",
  },
  {
    id: 3,
    project_name: "Test 1.2",
    audit_type: "Reguler",
    quarter: "I",
    date: "2023-03-12",
    audit_object: "Divisi Application Management Operation",
    audit_team: [
      {
        name: "Irene Selvi Tahirs",
        role: "KTA",
      },
      {
        name: "Katon Kuntjahjono",
        role: "MA",
      },
    ],
    addendum_phase: "I",
  },
];
const index = ({ data = approvalData }) => {
  const [showFilter, setShowFilter] = useState(false);
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "E.W.P", path: "/catalogue/ewp" },
  ];

  return (
    <MainLayout>
      <div className="px-5">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1">
            <div className="text-3xl font-bold">Catalogue E.W.P</div>
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
          <div className="flex justify-between w-96">
            <Card>
              <div className="flex p-2">
                <div className="w-1/2 mr-1">
                  <Textfield
                    placeholder="ID Proyek"
                    elemAfterInput={
                      <button className="justify-center">
                        <IconClose size="large" />
                      </button>
                    }
                  />
                </div>
                <div className="w-1/2 ml-1">
                  <Select options={[]} placeholder="Status Dokumen" />
                </div>
              </div>
              <div className="flex p-2">
                <div className="w-1/2 mr-1">
                  <Textfield
                    placeholder="Nama Proyek"
                    elemAfterInput={
                      <button className="justify-center">
                        <IconClose size="large" />
                      </button>
                    }
                  />
                </div>
                <div className="w-1/2 ml-1">
                  <Select options={[]} placeholder="Status Persetujuan" />
                </div>
              </div>
            </Card>
          </div>
        )}
        {/* End Filter */}

        <div className="mt-5 mr-40">
          <Card>
            <div className="w-full p-5">
              <div className="flex flex-row justify-between mb-6">
                <div className="text-xl font-bold text-atlasian-blue-dark">
                  Pustaka Dokumen
                </div>
              </div>
              <div className="leading-3">
                <div>
                  <div className="mt-2 px-6 py-3 border-b-[1px] hover:bg-gray-100 border-gray-300 font-bold">
                    <div className="grid grid-cols-11">
                      <div>Nama Project</div>
                      <div className="text-center">Tipe Audit</div>
                      <div className="text-center">Triwulan</div>
                      <div className="text-center">Tanggal</div>
                      <div className="text-center col-span-3">Object Audit</div>
                      <div className="text-center col-span-2">Tim Audit</div>
                      <div className="text-center">Addendum Ke</div>
                      <div className="text-center">Aksi</div>
                    </div>
                  </div>

                  {data?.map((item, key) => {
                    return (
                      <div
                        className="px-6 py-5 border-b-[1px] border-gray-300 hover:bg-gray-100"
                        key={key}
                      >
                        <div className="grid grid-cols-11">
                          <div className="my-auto">{item.project_name}</div>
                          <div className="text-center my-auto">
                            {item.audit_type}
                          </div>
                          <div className="text-center my-auto">
                            {item.quarter}
                          </div>
                          <div className="text-center my-auto">{item.date}</div>
                          <div className="my-auto col-span-3 pl-5">
                            <ul className="leading-3">
                              <li className="p-1 list-disc ">
                                {item.audit_object}
                              </li>
                            </ul>
                          </div>
                          <div className="my-auto col-span-2 pl-5">
                            <ul>
                              {item.audit_team.map((data, i) => {
                                return (
                                  <li className="p-1 list-disc" key={i}>
                                    {data.name + " (" + data.role + ") "}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                          <div className="text-center my-auto">
                            {item.addendum_phase}
                          </div>
                          <div className="flex justify-between w-16 mx-auto">
                            <div className="rounded-full overflow-hidden border-2 border-atlasian-blue-light w-7 h-7 pt-0.5 m-auto active:bg-slate-100">
                              <Link
                                href={"/catalogue/ewp/" + item.id}
                                prefetch={true}
                              >
                                <Button
                                  shouldFitContainer
                                  iconBefore={
                                    <IconArrowRight
                                      primaryColor="#0051CB"
                                      size="medium"
                                    />
                                  }
                                  className="bottom-1.5"
                                />
                              </Link>
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

import { useState } from "react";
import Link from "next/link";
import { MainLayout } from "@/layouts";
import { Breadcrumbs, Card } from "@/components/atoms";
import Button from "@atlaskit/button";
import { IconArrowRight, IconClose, IconPlus } from "@/components/icons";
// import Select from "@atlaskit/select";
import Textfield from "@atlaskit/textfield";
// import { useRef } from "react";
// import { motion } from "framer-motion";

const approvaldata = [
  {
    id: 1,
    project_name: "PAT 1 BRILIFE",
    audit_office: "BRILife",
    quarter: "I",
    date: "2023-02-28",
    audit_team: "Tim I",
    addendum_phase: "0",
  },
  {
    id: 2,
    project_name: "PAT 2 BRILIFE",
    audit_office: "BRILife",
    quarter: "I",
    date: "2023-04-15",
    audit_team: "Tim II",
    addendum_phase: "0",
  },
];
const index = ({ data = approvaldata }) => {
  const [showFilter, setShowFilter] = useState(false);
  // const ref = useRef(null);
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "P.A.T", path: "/catalogue/pat" },
  ];

  return (
    <MainLayout>
      <div className="px-5">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1">
            <div className="text-3xl font-bold">Catalogue P.A.T</div>
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
          // <motion.div
          //   initial={{ opacity: 0, scale: 0.95 }}
          //   animate={{ opacity: 1, scale: 1 }}
          //   transition={{
          //     duration: 0.4,
          //   }}
          //   ref={ref}
          // >
          <div className="flex justify-between">
            <Card>
              <div className="flex m-2 w-96">
                <div className="w-1/2">
                  <Textfield
                    placeholder="ID Project"
                    className="mr-3"
                    elemAfterInput={
                      <button className="justify-center">
                        <IconClose size="large" />
                      </button>
                    }
                  />
                </div>
                <div className="w-1/2">
                  <Textfield
                    placeholder="Nama Project"
                    className="mr-3"
                    elemAfterInput={
                      <button className="justify-center">
                        <IconClose size="large" />
                      </button>
                    }
                  />
                </div>
                {/* <div className="w-1/2">
                  <Select options={[]} placeholder="Status Document" />
                </div> */}
              </div>
              <div className="flex m-2 w-96">
                <div className="w-1/2">
                  <Textfield
                    placeholder="Kantor Audit"
                    className="mr-3"
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
                    className="mr-3"
                    elemAfterInput={
                      <button className="justify-center">
                        <IconClose size="large" />
                      </button>
                    }
                  />
                </div>
                {/* <div className="w-1/2">
                  <Select options={[]} placeholder="Status Persetujuan" />
                </div> */}
              </div>
            </Card>
          </div>
          // </motion.div>
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
                    <div className="grid grid-cols-8">
                      <div className="col-span-2">Nama Project</div>
                      <div>Kantor Audit</div>
                      <div className="text-center">Triwulan</div>
                      <div className="text-center">Tanggal</div>
                      <div className="text-center">Tim Audit</div>
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
                        <div className="grid grid-cols-8">
                          <div className="col-span-2 my-auto">
                            {item.project_name}
                          </div>
                          <div className="my-auto">{item.audit_office}</div>
                          <div className="text-center my-auto">
                            {item.quarter}
                          </div>
                          <div className="text-center my-auto">{item.date}</div>
                          <div className="text-center my-auto">
                            {item.audit_team}
                          </div>
                          <div className="text-center my-auto">
                            {item.addendum_phase}
                          </div>
                          <div className="flex justify-between w-16 mx-auto">
                            <div className="rounded-full overflow-hidden border-2 border-atlasian-blue-light w-7 h-7 pt-0.5 mx-auto active:bg-slate-100">
                              <Link href={"/catalogue/pat/" + item.id}>
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

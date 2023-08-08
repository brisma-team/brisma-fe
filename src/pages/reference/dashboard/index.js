import { useState } from "react";
import { MainLayout } from "@/layouts";
import { Breadcrumbs, Card } from "@/components/atoms";
import Button from "@atlaskit/button";
import { IconPlus } from "@/components/icons";

const index = () => {
  const [showFilter, setShowFilter] = useState(false);
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Reference", path: "/reference" },
    { name: "Dashboard", path: "/reference/dashboard" },
  ];

  return (
    <MainLayout>
      <div className="px-5">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1">
            <div className="text-3xl font-bold">Manajemen Dashboard</div>
          </div>
        </div>
        <div className="my-3 w-40">
          <Button
            appearance="primary"
            iconBefore={IconPlus}
            shouldFitContainer
            onClick={() => setShowFilter(!showFilter)}
          >
            Tambah Dashboard
          </Button>
        </div>
        <div className="mt-5 mr-40">
          <Card>
            <div className="w-full p-5">
              <div className="flex flex-row justify-between mb-6">
                <div className="text-xl font-bold text-atlasian-blue-dark">
                  Pustaka Dashboard
                </div>
              </div>
              <div className="leading-3">
                <div>
                  <div className="mt-2 px-6 py-3 border-b-[1px] hover:bg-gray-100 border-gray-300 font-bold">
                    <div className="grid grid-cols-6">
                      <div>No</div>
                      <div className="col-span-2">Dashboard ID</div>
                      <div>Nama Dashboard</div>
                      <div>Status</div>
                      <div className="text-center">Aksi</div>
                    </div>
                  </div>

                  <div className="px-6 py-5 border-b-[1px] border-gray-300 hover:bg-gray-100">
                    <div className="grid grid-cols-6">
                      <div>1</div>
                      <div className="col-span-2 my-auto">
                        c217f3a4-864f-4e82-98f9-9d6c19d74c0f
                      </div>
                      <div className="my-auto">Dashboard Utama</div>
                      <div className="my-auto text-lime-600">Activated</div>
                      <div className="grid grid-cols-2 text-center">
                        <div className="align-middle px-2">
                          <Button shouldFitContainer appearance="warning">
                            <span className="text-white">Inactivate</span>
                          </Button>
                        </div>
                        <div className="align-middle px-2 ">
                          <Button shouldFitContainer appearance="danger">
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 py-5 border-b-[1px] border-gray-300 hover:bg-gray-100">
                    <div className="grid grid-cols-6">
                      <div>2</div>
                      <div className="col-span-2 my-auto">
                        875d02b9-d53c-4aaf-8f8a-964840f7f02a
                      </div>
                      <div className="my-auto">Dashboard Analisis</div>
                      <div className="my-auto text-red-600">Inactivated</div>
                      <div className="grid grid-cols-2 text-center">
                        <div className="align-middle px-2">
                          <Button shouldFitContainer appearance="primary">
                            Activate
                          </Button>
                        </div>
                        <div className="align-middle px-2 ">
                          <Button shouldFitContainer appearance="danger">
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
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

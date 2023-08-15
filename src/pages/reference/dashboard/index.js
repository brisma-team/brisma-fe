import { useState, useEffect } from "react";
import { MainLayout } from "@/layouts";
import { Breadcrumbs, Card, TableField } from "@/components/atoms";
import Button from "@atlaskit/button";
import { IconPlus } from "@/components/icons";
import useDashboardList from "@/data/dashboard/useDashboardList";
import {
  useDeleteData,
  usePostData,
  confirmationSwal,
  loadingSwal,
  useUpdateData,
} from "@/helpers";
import ModalAddDashboard from "@/components/molecules/dashboard/ModalAddDashboard";

const index = () => {
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Reference", path: "/reference" },
    { name: "Dashboard", path: "/reference/dashboard" },
  ];
  const [showModal, setShowModal] = useState(false);
  const [list, setList] = useState([]);
  const [dashboard, setDashboard] = useState([]);
  const [data, setData] = useState({ embedId: "", name: "" });

  const { dashboardList, dashboardListMutate } = useDashboardList();

  const fetchData = () => {
    return dashboardListMutate({ ...dashboardList });
  };

  const handleDelete = async (id) => {
    const confirm = await confirmationSwal(
      "Apakah Anda yakin untuk mengahapus data ini?"
    );

    if (!confirm.value) {
      return;
    }

    loadingSwal();
    const url = `${process.env.NEXT_PUBLIC_API_URL_DASHBOARD}/admin/deleteDashboard`;
    return await useDeleteData(url, { id: id }).then(() => fetchData());
  };

  const handleActivate = async (id, dashboardid) => {
    const confirm = await confirmationSwal(
      "Apakah Anda yakin untuk mengaktifkan Dashboard ID " + dashboardid + " ?"
    );

    if (!confirm.value) {
      return;
    }

    loadingSwal();
    const url = `${process.env.NEXT_PUBLIC_API_URL_DASHBOARD}/admin/updateDashboard`;
    return await useUpdateData(url, { id: id, state: confirm.value }).then(() =>
      fetchData()
    );
  };

  const handleSubmit = async () => {
    loadingSwal();
    setShowModal(false);
    const url = `${process.env.NEXT_PUBLIC_API_URL_DASHBOARD}/admin/createDashboard`;
    return await usePostData(url, data).then(() => fetchData());
  };

  useEffect(() => {
    if (dashboardList != undefined) {
      setList(dashboardList.list);
    }
  }, [dashboardList]);

  useEffect(() => {
    const mappingDashboard = list
      ?.sort((a, b) => {
        const namaDashboardA = a["_created_at"] || ""; // Default to empty string if undefined/null
        const namaDashboardB = b["_created_at"] || "";

        return namaDashboardB.localeCompare(namaDashboardA);
      })
      .map((v, key) => {
        return {
          No: key + 1,
          "Dashboard ID": v?.superset_embed_id,
          "Nama Dashboard": v?.dashboard_name,
          Status: (
            <div
              className={`my-auto ${
                v?.is_active ? "text-lime-600" : "text-red-500"
              }`}
            >
              {v?.is_active ? "Active" : "In-active"}
            </div>
          ),
          "Tanggal Dibuat": v?._created_at,
          Aksi: (
            <div className="flex justify-between text-center">
              <div className="min-w-[7rem] px-2">
                <Button
                  appearance={v.is_active ? "warning" : "primary"}
                  shouldFitContainer
                  onClick={() => handleActivate(v?._id, v?.superset_embed_id)}
                >
                  <span className="text-white">
                    {v.is_active ? "In-activate" : "Activate"}
                  </span>
                </Button>
              </div>
              <div className="min-w-[7rem] px-2">
                <Button
                  shouldFitContainer
                  onClick={() => handleDelete(v?._id)}
                  appearance="danger"
                >
                  Delete
                </Button>
              </div>
            </div>
          ),
        };
      });
    setDashboard(mappingDashboard);
  }, [list]);

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

        <div className="mt-5 mr-40">
          <Card>
            <div className="w-full h-full px-6">
              <div className="text-xl font-bold p-5">Pustaka Dashboard</div>
              <div className="px-5 pb-5 w-[13rem]">
                <Button
                  appearance="primary"
                  iconBefore={IconPlus}
                  shouldFitContainer
                  onClick={() => setShowModal(true)}
                >
                  Tambah Dashboard
                </Button>
              </div>
              <div className="max-h-[60rem] px-2 mb-5">
                <TableField
                  headers={[
                    "No",
                    "Dashboard ID",
                    "Nama Dashboard",
                    "Status",
                    "Tanggal Dibuat",
                    "Aksi",
                  ]}
                  columnWidths={["5%", "26%", "20%", "10%", "15%", "25%"]}
                  items={dashboard}
                />
              </div>
              {/* <div className="flex justify-center mt-5">
                <Pagination totalPages={3} setCurrentPage={() => 1} />
              </div> */}
            </div>
          </Card>
        </div>
        {showModal && (
          <ModalAddDashboard
            showModal={showModal}
            setShowModal={setShowModal}
            setData={setData}
            handleSubmit={handleSubmit}
            data={data}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default index;

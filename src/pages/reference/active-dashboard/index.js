import React, { useState, useEffect } from "react";
import { MainLayout } from "@/layouts";
import {
  Breadcrumbs,
  Card,
  TableField,
  ButtonField,
  Pagination,
} from "@/components/atoms";
import { IconPlus } from "@/components/icons";
import useDashboardList from "@/data/dashboard/useDashboardList";
import useUkaList from "@/data/dashboard/useUkaList";
import useRoleList from "@/data/dashboard/useRoleList";
import {
  usePostData,
  useUpdateData,
  useDeleteData,
  confirmationSwal,
  loadingSwal,
} from "@/helpers";
import ModalAddDashboard from "@/components/molecules/dashboard/ModalAddDashboard";

const index = () => {
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Reference", path: "/reference" },
    { name: "Dashboard", path: "/reference/active-dashboard" },
  ];
  // const [selected, setSelected] = useState();

  const { dashboardList, dashboardListMutate } = useDashboardList();
  const { uka } = useUkaList();
  const { role } = useRoleList();

  const [combinedData, setCombinedData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [dashboard, setDashboard] = useState([]);
  const [data, setData] = useState({ embedId: "", name: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [mappedDashboard, setMappedDashboard] = useState([]);
  const [mappedUka, setMappedUka] = useState([]);
  const [mappedRole, setMappedRole] = useState([]);

  useEffect(() => {
    if (dashboardList) {
      setMappedDashboard(dashboardList.list);
      setTotalPages(dashboardList.totalPages);
    }
  }, [dashboardList]);

  useEffect(() => {
    if (uka) {
      setMappedUka(uka.uka);
    }
  }, [uka]);

  useEffect(() => {
    if (role) {
      setMappedRole(role.userRole);
    }
  }, [role]);

  useEffect(() => {
    // Simulasikan penggabungan data di sini
    if (
      mappedDashboard.length !== 0 &&
      mappedUka.length !== 0 &&
      mappedRole.length !== 0
    ) {
      const combinedData = mappedDashboard.map((list) => {
        const combinedAllowList =
          list.allow_list !== null
            ? list.allow_list.map((alist) => {
                const rUka = mappedUka.find(
                  (item) => alist.uka_code === item.kode
                );
                const rRole = alist.role_code.map((dlist) => {
                  const fRole = mappedRole.find((item) =>
                    dlist.includes(item.kode)
                  );
                  return fRole.name;
                });

                return {
                  mapped_uka: rUka.name,
                  mapped_role: rRole,
                };
              })
            : null;

        return {
          ...list,
          allow_list: combinedAllowList,
        };
      });
      setCombinedData(combinedData);
    }
  }, [mappedDashboard, mappedUka, mappedUka]);

  const fetchData = async () => {
    await dashboardListMutate({ ...dashboardList });
  };

  const handleDelete = async (id) => {
    const confirm = await confirmationSwal(
      "Apakah Anda yakin untuk mengahapus data ini?"
    );

    if (confirm.value) {
      loadingSwal();
      const url = `${process.env.NEXT_PUBLIC_API_URL_DASHBOARD}/admin/deleteDashboard`;
      await useDeleteData(url, { id: id });
      fetchData();
    }
  };

  const handleToggleActivate = async (id, dashboardid, state) => {
    const confirmMessage = state
      ? `Apakah anda yakin untuk mengaktifkan Dashboard ID : ${dashboardid} ?`
      : `Apakah anda yakin untuk tidak mengaktifkan Dashboard ID : ${dashboardid} ?`;

    const confirm = await confirmationSwal(confirmMessage);

    if (confirm.value) {
      loadingSwal();
      const url = `${process.env.NEXT_PUBLIC_API_URL_DASHBOARD}/admin/updateDashboard`;
      await useUpdateData(url, { id: id, isActive: state });
      fetchData();
    }
  };

  const handleSubmit = async () => {
    loadingSwal();
    setShowModal(false);
    const url = `${process.env.NEXT_PUBLIC_API_URL_DASHBOARD}/admin/createDashboard`;
    await usePostData(url, data);
    fetchData();
  };

  useEffect(() => {
    if (combinedData.length !== 0) {
      console.log(combinedData);
      const sortedDashboard = combinedData
        // ?.sort((a, b) =>
        //   (b["_created_at"] || "").localeCompare(a["_created_at"] || "")
        // )
        .map((v, key) => ({
          No: key + 1,
          "Dashboard ID": v?.superset_embed_id,
          "Nama Dashboard": v?.dashboard_name,
          Status: (
            <div
              className={`my-auto ${
                v?.is_active ? "text-lime-600" : "text-red-500"
              }`}
            >
              {v?.is_active ? "Aktif" : "Tidak Aktif"}
            </div>
          ),
          "Ditujukan Kepada":
            v.allow_list == null ? (
              v.is_public == true ? (
                <p>Public</p>
              ) : (
                <p>Belum ditujukan</p>
              )
            ) : (
              v.allow_list != null &&
              v.allow_list.map((x, key) => (
                <p key={key}>{x.mapped_uka + " - " + x.mapped_role}</p>
              ))
            ),
          "Tanggal Dibuat": v?._created_at,
          Aksi: (
            <div className="flex justify-between text-center">
              <div className="min-w-[7rem] px-2">
                <div
                  className={`${
                    v.is_active
                      ? `bg-atlasian-yellow text-white`
                      : `bg-atlasian-blue-light text-white`
                  } font-semibold rounded`}
                >
                  <ButtonField
                    text={v.is_active ? "Non-aktif" : "Aktifkan"}
                    handler={() =>
                      handleToggleActivate(
                        v?.id,
                        v?.superset_embed_id,
                        !v.is_active
                      )
                    }
                  />
                </div>
              </div>
              <div className="min-w-[7rem] px-2">
                <div
                  className={`bg-atlasian-red text-white font-semibold rounded`}
                >
                  <ButtonField
                    text={"Hapus"}
                    handler={() => handleDelete(v?.id)}
                  />
                </div>
              </div>
            </div>
          ),
        }));
      setDashboard(sortedDashboard);
    }
  }, [combinedData]);

  return (
    <MainLayout>
      <div className="px-5">
        <Breadcrumbs data={breadcrumbs} />
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
                <div
                  className={`bg-atlasian-blue-dark text-white font-semibold rounded`}
                >
                  <ButtonField
                    text={"Tambah Dashboard"}
                    icon={IconPlus}
                    handler={() => setShowModal(true)}
                  />
                </div>
              </div>
              <div className="max-h-[60rem] px-2 mb-5">
                <TableField
                  headers={[
                    "No",
                    "Dashboard ID",
                    "Nama Dashboard",
                    "Ditujukan Kepada",
                    "Status",
                    "Aksi",
                  ]}
                  columnWidths={["5%", "20%", "20%", "25%", "10%", "20%"]}
                  items={dashboard}
                />
              </div>
              <div className="flex justify-center mt-5">
                <Pagination
                  pages={totalPages}
                  setCurrentPage={setCurrentPage}
                />
              </div>
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

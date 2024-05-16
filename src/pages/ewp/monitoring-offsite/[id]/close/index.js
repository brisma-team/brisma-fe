import { Breadcrumbs, ButtonField, Card, PageTitle } from "@/components/atoms";
import { CardContentHeaderFooter } from "@/components/molecules/commons";
import {
  ModalCloseStatement,
  RealizationTable,
} from "@/components/molecules/ewp/konsulting/close";
import { useProjectDetail } from "@/data/ewp/konsulting";
import useUser from "@/data/useUser";
import { confirmationSwal, fetchApi, loadingSwal } from "@/helpers";
import { LandingLayoutEWPConsulting } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const index = () => {
  const { id } = useRouter().query;
  const baseUrl = `/ewp/konsulting/${id}`;
  const pathNameSubModulClose = `${baseUrl}/close`;

  const [showModal, setShowModal] = useState(false);
  const [closingStatement, setClosingStatement] = useState("");
  const [dataTables, setDataTables] = useState([]);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [isFinalProject, setIsFinalProject] = useState(false);
  const [isInitiator, setIsInitiator] = useState(false);

  const { projectDetail, projectDetailMutate } = useProjectDetail({ id });
  const { user } = useUser();

  useEffect(() => {
    const status_code =
      parseInt(projectDetail?.data?.project_info?.status_kode) || 0;
    setDataTables([
      {
        is_open: true,
        is_onprogress: status_code === 2,
        is_close: projectDetail?.data?.realisasi?.penyusunan_mapa_real_end
          ? true
          : false,
        status_code: 2,
        label: "Perencanaan",
        start_date: projectDetail?.data?.realisasi?.penyusunan_mapa_real_start,
        end_date: projectDetail?.data?.realisasi?.penyusunan_mapa_real_end,
        url: `/ewp/monitoring-offsite/${id}/perencanaan`,
      },
      {
        is_open: projectDetail?.data?.realisasi?.penyusunan_mapa_real_end,
        is_onprogress: status_code === 4,
        is_close: projectDetail?.data?.realisasi?.pelaksanaan_audit_real_end
          ? true
          : false,
        status_code: 4,
        label: "Pelaksanaan",
        start_date:
          projectDetail?.data?.realisasi?.pelaksanaan_audit_real_start,
        end_date: projectDetail?.data?.realisasi?.pelaksanaan_audit_real_end,
        url: `/ewp/monitoring-offsite/${id}/pelaksanaan`,
      },
      {
        is_open: projectDetail?.data?.realisasi?.pelaksanaan_audit_real_end,
        is_onprogress: status_code === 10,
        is_close: projectDetail?.data?.realisasi?.reporting_audit_real_end
          ? true
          : false,
        status_code: 10,
        label: "Reporting",
        start_date: projectDetail?.data?.realisasi?.reporting_audit_real_start,
        end_date: projectDetail?.data?.realisasi?.reporting_audit_real_end,
        url: `/ewp/monitoring-offsite/${id}/reporting`,
      },
      {
        is_open: projectDetail?.data?.realisasi?.reporting_audit_real_end,
        is_onprogress: status_code === 11,
        is_close: projectDetail?.data?.realisasi?.tindak_lanjut_real_end
          ? true
          : false,
        status_code: 11,
        label: "Tindak Lanjut",
        start_date: projectDetail?.data?.realisasi?.tindak_lanjut_real_start,
        end_date: projectDetail?.data?.realisasi?.tindak_lanjut_real_end,
        url: `/ewp/monitoring-offsite/${id}/tindak-lanjut`,
      },
    ]);

    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "EWP", path: "/ewp" },
      {
        name: "Monitoring Offsite / Overview",
        path: "/ewp/monitoring-offsite",
      },
      {
        name: `${projectDetail?.data?.project_info?.project_id?.toUpperCase()}`,
        path: `${baseUrl}/info`,
      },
      {
        name: `Close Project`,
        path: pathNameSubModulClose,
      },
    ]);
    setIsFinalProject(Boolean(status_code == 10));
    setClosingStatement(projectDetail?.data?.project_info?.closing_statement);
    setIsInitiator(
      Boolean(
        projectDetail?.data?.project_info?.initiator?.pn === user?.data?.pn
      )
    );
  }, [projectDetail, user]);

  const handleClickCloseStatement = () => {
    setShowModal(true);
  };

  const handleClickCloseProject = async () => {
    const confirm = await confirmationSwal(
      "Untuk CLOSE PROJECT. Semua status Sub-Module harus sudah SELESAI."
    );
    if (!confirm.value) {
      return;
    }

    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/monoff/initiate/final/initiate/${id}`,
      { closing_statement: closingStatement }
    );
    projectDetailMutate();
    loadingSwal("close");
  };

  const handleChangePayload = (e) => {
    setClosingStatement(e.target.value);
  };

  const handleCloseModal = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );
    if (!confirm.value) {
      return;
    }

    setShowModal(false);
  };

  const handleSubmitModal = () => {
    setShowModal(false);
  };

  return (
    <LandingLayoutEWPConsulting>
      <div className="w-[90rem]">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        <PageTitle text="Close Project" />
        <div className="mt-7">
          <div className="flex gap-4">
            <div className="flex flex-col gap-4 w-full">
              <Card>
                <div className="px-6 pt-1 pb-3 w-full">
                  <RealizationTable data={dataTables} />
                </div>
              </Card>
              {!isFinalProject && isInitiator ? (
                <div className="w-full flex items-center justify-end gap-4">
                  <div className="w-40 text-sm font-semibold bg-atlasian-blue-light rounded">
                    <ButtonField
                      text={"Closing Statement"}
                      handler={handleClickCloseStatement}
                    />
                  </div>
                  <div className="w-40 text-sm font-semibold bg-atlasian-red rounded">
                    <ButtonField
                      text={"Close Project"}
                      handler={handleClickCloseProject}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            <CardContentHeaderFooter
              header={
                <div className="py-2 px-3 h-fit">
                  <p className="font-semibold text-base">Closing Statement</p>
                </div>
              }
              headerHeight={"h-fit"}
            >
              <div className="p-4 min-h-[14rem]">
                <p className="text-[#A5ADBA] text-justify">
                  {closingStatement || "-"}
                </p>
              </div>
            </CardContentHeaderFooter>
          </div>
        </div>
      </div>
      <ModalCloseStatement
        showModal={showModal}
        data={closingStatement}
        handleChangePayload={handleChangePayload}
        handleCloseModal={handleCloseModal}
        handleSubmit={handleSubmitModal}
      />
    </LandingLayoutEWPConsulting>
  );
};

export default index;

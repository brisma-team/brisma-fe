import { Breadcrumbs, ButtonField, Card, PageTitle } from "@/components/atoms";
import { CardContentHeaderFooter } from "@/components/molecules/commons";
import {
  ModalCloseStatement,
  RealizationTable,
} from "@/components/molecules/ewp/common/close";
import { useAuditInfo } from "@/data/ewp/common/info";
import useUser from "@/data/useUser";
import { confirmationSwal, fetchApi, loadingSwal } from "@/helpers";
import { LandingLayoutEWPQualityAssurance } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const index = () => {
  const router = useRouter();
  const [params, setParams] = useState({
    id: 0,
  });
  const baseUrl = `/ewp/quality-assurance/${params?.id}`;
  const pathNameSubModulClose = `${baseUrl}/close`;

  const [showModal, setShowModal] = useState(false);
  const [closingStatement, setClosingStatement] = useState("");
  const [dataTables, setDataTables] = useState([]);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [isFinalProject, setIsFinalProject] = useState(false);
  const [isInitiator, setIsInitiator] = useState(false);

  const { auditInfo, auditInfoMutate } = useAuditInfo({
    module: "qa",
    id: params?.id,
  });
  const { user } = useUser();

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    setParams({
      id,
    });
  }, [router.isReady]);

  useEffect(() => {
    const status_code =
      parseInt(auditInfo?.data?.project_info?.status_kode) || 0;
    setDataTables([
      {
        is_open: true,
        is_onprogress: status_code === 2,
        is_close: auditInfo?.data?.realisasi?.penyusunan_mapa_real_end
          ? true
          : false,
        status_code: 2,
        is_addendum: Boolean(
          auditInfo?.data?.realisasi?.pelaksanaan_audit_real_start &&
            !auditInfo?.data?.realisasi?.pelaksanaan_audit_real_end
        ),
        label: "Perencanaan (MAR)",
        start_date: auditInfo?.data?.realisasi?.penyusunan_mapa_real_start,
        end_date: auditInfo?.data?.realisasi?.penyusunan_mapa_real_end,
        url: `/ewp/quality-assurance/${params?.id}/perencanaan`,
      },
      {
        is_open: auditInfo?.data?.realisasi?.penyusunan_mapa_real_end,
        is_onprogress: status_code === 4 || status_code === 12,
        is_close: auditInfo?.data?.realisasi?.pelaksanaan_audit_real_end
          ? true
          : false,
        status_code: 4,
        label: "Pelaksanaan",
        start_date: auditInfo?.data?.realisasi?.pelaksanaan_audit_real_start,
        end_date: auditInfo?.data?.realisasi?.pelaksanaan_audit_real_end,
        url: `/ewp/quality-assurance/${params?.id}/pelaksanaan`,
      },
      {
        is_open: auditInfo?.data?.realisasi?.pelaksanaan_audit_real_end,
        is_onprogress: status_code === 6,
        is_close: auditInfo?.data?.realisasi?.monitoring_real_end
          ? true
          : false,
        status_code: 6,
        label: "Reporting",
        start_date: auditInfo?.data?.realisasi?.monitoring_real_start,
        end_date: auditInfo?.data?.realisasi?.monitoring_real_end,
        url: `/ewp/quality-assurance/${params?.id}/reporting`,
      },
      {
        is_open: auditInfo?.data?.realisasi?.monitoring_real_end,
        is_onprogress: status_code === 8,
        is_close: auditInfo?.data?.realisasi?.Wrapup_Meeting_real_end
          ? true
          : false,
        status_code: 8,
        label: "Wrap-Up",
        start_date: auditInfo?.data?.realisasi?.Wrapup_Meeting_real_start,
        end_date: auditInfo?.data?.realisasi?.Wrapup_Meeting_real_end,
        url: `/ewp/quality-assurance/${params?.id}/wrapup`,
      },
    ]);

    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "EWP", path: "/ewp" },
      { name: "Overview", path: "/ewp/quality-assurance" },
      {
        name: `${auditInfo?.data?.project_info?.project_id?.toUpperCase()}`,
        path: `${baseUrl}/info`,
      },
      {
        name: `Close Project`,
        path: pathNameSubModulClose,
      },
    ]);
    setIsFinalProject(Boolean(status_code == 9));
    setClosingStatement(auditInfo?.data?.project_info?.closing_statement);
    setIsInitiator(
      Boolean(auditInfo?.data?.project_info?.initiator?.pn === user?.data?.pn)
    );
  }, [auditInfo, user]);

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
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/initiate/final/initiate/${params?.id}`,
      { closing_statement: closingStatement }
    );
    auditInfoMutate();
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
    <LandingLayoutEWPQualityAssurance>
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
    </LandingLayoutEWPQualityAssurance>
  );
};

export default index;

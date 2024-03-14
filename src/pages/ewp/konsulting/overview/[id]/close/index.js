import { Breadcrumbs, ButtonField, Card, PageTitle } from "@/components/atoms";
import { CardContentHeaderFooter } from "@/components/molecules/commons";
import {
  ModalCloseStatement,
  RealizationTable,
} from "@/components/molecules/ewp/konsulting/close";
import { useProjectDetail } from "@/data/ewp/konsulting";
import { confirmationSwal, fetchApi, loadingSwal } from "@/helpers";
import { LandingLayoutEWPConsulting } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const index = () => {
  const { id } = useRouter().query;
  const baseUrl = `/ewp/konsulting/overview/${id}`;
  const pathNameSubModulClose = `${baseUrl}/meeting`;

  const [showModal, setShowModal] = useState(false);
  const [closingStatement, setClosingStatement] = useState("");
  const [dataTables, setDataTables] = useState([]);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const { projectDetail, projectDetailMutate } = useProjectDetail({ id });

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
        label: "Perencanaan",
        start_date: projectDetail?.data?.realisasi?.penyusunan_mapa_real_start,
        end_date: projectDetail?.data?.realisasi?.penyusunan_mapa_real_end,
        url: `/ewp/konsulting/overview/${id}/perencanaan`,
      },
      {
        is_open: projectDetail?.data?.realisasi?.penyusunan_mapa_real_end,
        is_onprogress: status_code === 4,
        is_close: projectDetail?.data?.realisasi?.pelaksanaan_audit_real_end
          ? true
          : false,
        label: "Analisa",
        start_date:
          projectDetail?.data?.realisasi?.pelaksanaan_audit_real_start,
        end_date: projectDetail?.data?.realisasi?.pelaksanaan_audit_real_end,
        url: `/ewp/konsulting/overview/${id}/analisa/lingkup`,
      },
      {
        is_open: projectDetail?.data?.realisasi?.pelaksanaan_audit_real_end,
        is_onprogress: status_code === 6,
        is_close: projectDetail?.data?.realisasi?.peluang_peningkatan_real_end
          ? true
          : false,
        label: "Peluang Peningkatan",
        start_date:
          projectDetail?.data?.realisasi?.peluang_peningkatan_real_start,
        end_date: projectDetail?.data?.realisasi?.peluang_peningkatan_real_end,
        url: `/ewp/konsulting/overview/${id}/peluang-peningkatan`,
      },
      {
        is_open: projectDetail?.data?.realisasi?.peluang_peningkatan_real_end,
        is_onprogress: status_code === 8,
        is_close: projectDetail?.data?.realisasi?.Wrapup_Meeting_real_end
          ? true
          : false,
        label: "Wrap-Up",
        start_date: projectDetail?.data?.realisasi?.Wrapup_Meeting_real_start,
        end_date: projectDetail?.data?.realisasi?.Wrapup_Meeting_real_end,
        url: `/ewp/konsulting/overview/${id}/wrapup`,
      },
    ]);

    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "EWP", path: "/ewp" },
      { name: "Overview", path: "/ewp/konsulting/overview" },
      {
        name: `${projectDetail?.data?.project_info?.project_id?.toUpperCase()}`,
        path: `${baseUrl}/info`,
      },
      {
        name: `Close Project`,
        path: pathNameSubModulClose,
      },
    ]);
  }, [projectDetail]);

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
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/initiate/final/initiate/${id}`,
      {}
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
                  {closingStatement || ""}
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

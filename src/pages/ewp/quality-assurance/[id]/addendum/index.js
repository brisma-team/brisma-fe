import { Breadcrumbs, CardLanding, PageTitle } from "@/components/atoms";
import { useAuditInfo } from "@/data/ewp/common/info";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Button from "@atlaskit/button";
import { confirmationSwal, fetchApi } from "@/helpers";
import { LandingLayoutEWPAddendum } from "@/layouts/ewp";

const index = () => {
  const router = useRouter();

  const [dataCarding, setDataCarding] = useState([]);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [params, setParams] = useState({
    id: 1,
  });

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    setParams({
      id,
    });
  }, [router.isReady]);

  const { auditInfo } = useAuditInfo({
    id: params?.id,
    module: "qa",
  });

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "EWP", path: "/ewp" },
      { name: "Overview", path: "/ewp/quality-assurance" },
      {
        name: `${auditInfo?.data?.project_info?.project_id?.toUpperCase()}`,
        path: `/ewp/quality-assurance/${params?.id}/info`,
      },
      {
        name: "Addendum Perencanaan",
        path: `/ewp/quality-assurance/${params?.id}/addendum`,
      },
    ]);

    setIsDisabled(
      Boolean(auditInfo?.data?.project_info?.status_name !== "addendum")
    );
  }, [auditInfo]);

  useEffect(() => {
    const base_path = `/ewp/quality-assurance/${params?.id}/addendum`;
    const mappingDataCarding = [
      {
        title: "Addendum Utama",
        description:
          "Perencanaan Addendum untuk bagian Tim, Uker Assessment dan Analisis Perencanaan.",
        url: base_path + `/utama`,
      },
      {
        title: "Addendum Lain",
        description:
          "Perencanaan Addendum untuk bagian Latar Belakang, Tujuan, Analisa, Anggaran dan Jadwal.",
        url: base_path + `/lain`,
      },
      {
        title: "Dokumen",
        description: "Dokumen Perencanaan Addendum.",
        url: base_path + `/dokumen`,
      },
    ];

    setDataCarding(mappingDataCarding);
  }, [params?.id]);

  const handleClickCancelAddendum = async () => {
    const confirm = await confirmationSwal(
      "Aksi ini akan menghapus seluruh data Addendum yang berjalan saat ini. Apakah Anda yakin ingin membatalkan Addendum?"
    );
    if (!confirm.value) {
      return;
    }
    await fetchApi(
      "DELETE",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/addendum/cancel/${params?.id}`,
      {
        note: "cancel addendum",
      }
    );
    router.push(`/ewp/quality-assurance/${params?.id}/info`);
  };

  return (
    <LandingLayoutEWPAddendum type="quality-assurance">
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-7">
        <PageTitle
          text="Addendum Perencanaan"
          className={"text-atlasian-red"}
        />
        {!isDisabled ? (
          <div className="w-[10rem]">
            <Button
              appearance="danger"
              onClick={handleClickCancelAddendum}
              shouldFitContainer
            >
              Batal Addendum
            </Button>
          </div>
        ) : (
          ""
        )}
      </div>
      {/* Start Content */}
      <div className="flex flex-col gap-3">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {dataCarding.map((v, i) => {
            return (
              <CardLanding
                key={i}
                title={v?.title}
                description={v?.description}
                status={v?.status}
                url={v?.url}
              />
            );
          })}
        </div>
      </div>
      {/* End Content */}
    </LandingLayoutEWPAddendum>
  );
};

export default index;

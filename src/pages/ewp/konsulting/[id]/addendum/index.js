import { Breadcrumbs, CardLanding, PageTitle } from "@/components/atoms";
import { useProjectDetail } from "@/data/ewp/konsulting";
import LandingLayoutEWPSBPAddendum from "@/layouts/ewp/LandingLayoutEWPSBPAddendum";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Button from "@atlaskit/button";
import { confirmationSwal, fetchApi } from "@/helpers";

const index = () => {
  const router = useRouter();

  const [dataCarding, setDataCarding] = useState([]);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
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

  const { projectDetail } = useProjectDetail({ id: params?.id });

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "EWP", path: "/ewp" },
      { name: "Overview", path: "/ewp/konsulting" },
      {
        name: `${projectDetail?.data?.project_info?.project_id?.toUpperCase()}`,
        path: `/ewp/konsulting/${params?.id}/info`,
      },
      {
        name: "Addendum Perencanaan Kegiatan",
        path: `/ewp/konsulting/${params?.id}/addendum`,
      },
    ]);
  }, [projectDetail]);

  useEffect(() => {
    const base_path = `/ewp/konsulting/${params?.id}/addendum`;
    const mappingDataCarding = [
      {
        title: "Addendum Utama",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In magna libero, lobortis ut euismod in, pharetra sit amet purus.",
        url: base_path + `/utama`,
      },
      {
        title: "Addendum Lain",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In magna libero, lobortis ut euismod in, pharetra sit amet purus.",
        url: base_path + `/lain`,
      },
      {
        title: "Dokumen",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In magna libero, lobortis ut euismod in, pharetra sit amet purus.",
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
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/addendum/cancel/${params?.id}`,
      {
        note: "cancel addendum",
      }
    );
    router.push(`/ewp/konsulting/${params?.id}/info`);
  };

  return (
    <LandingLayoutEWPSBPAddendum>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-7">
        <PageTitle
          text="Addendum Perencanaan Kegiatan"
          className={"text-atlasian-red"}
        />
        <div className="w-[10rem]">
          <Button
            appearance="danger"
            onClick={handleClickCancelAddendum}
            shouldFitContainer
          >
            Batal Addendum
          </Button>
        </div>
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
    </LandingLayoutEWPSBPAddendum>
  );
};

export default index;

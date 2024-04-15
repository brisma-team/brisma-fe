import { Breadcrumbs, ButtonIconBack, PageTitle } from "@/components/atoms";
import { useProjectDetail } from "@/data/ewp/konsulting";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  AttachmentClipping,
  ImageClipping,
} from "@/components/molecules/commons";
import { useControlDetail } from "@/data/ewp/konsulting/addendum/utama";
import LandingLayoutEWPSBPAddendum from "@/layouts/ewp/LandingLayoutEWPSBPAddendum";
const Editor = dynamic(() => import("@/components/atoms/Editor"), {
  ssr: false,
});

const index = () => {
  const { id, control_id } = useRouter().query;
  const baseUrl = `/ewp/konsulting/${id}`;
  const pathName = `${baseUrl}/addendum/utama`;

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [content, setContent] = useState("");

  const { projectDetail } = useProjectDetail({ id });
  const { controlDetail } = useControlDetail({
    id: control_id,
  });

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "EWP", path: "/ewp" },
      { name: "Overview", path: "/ewp/konsulting" },
      {
        name: `${projectDetail?.data?.project_info?.project_id?.toUpperCase()}`,
        path: baseUrl,
      },
      {
        name: "Addendum Perencanaan Kegiatan",
        path: `${baseUrl}/addendum`,
      },
      {
        name: "Utama",
        path: pathName,
      },
      {
        name: "Uraian",
        path: `${pathName}/${control_id}`,
      },
    ]);
  }, [projectDetail]);

  useEffect(() => {
    setContent(controlDetail?.data?.uraian || "");
  }, [controlDetail]);

  return (
    <LandingLayoutEWPSBPAddendum>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex gap-3 items-center mb-7">
        <ButtonIconBack
          backUrl={`/ewp/konsulting/${id}/addendum/utama?stage=2`}
        />
        <PageTitle
          text="Perubahan Uraian Lingkup Pemeriksaan"
          className={"text-atlasian-red"}
        />
      </div>
      {/* Start Content */}
      <div className="my-4 flex gap-6">
        <div className="w-64 flex flex-col gap-4">
          <ImageClipping data={[]} isHideButton />
          <AttachmentClipping data={[]} isHideButton />
        </div>
        <div>
          <div className="ckeditor-latar-belakang-mapa-ewp">
            <Editor
              contentData={content}
              disabled={false}
              ready={true}
              onChange={(value) => setContent(value)}
            />
          </div>
        </div>
      </div>
      {/* End Content */}
    </LandingLayoutEWPSBPAddendum>
  );
};

export default index;

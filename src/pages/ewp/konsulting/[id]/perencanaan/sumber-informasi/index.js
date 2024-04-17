import { Breadcrumbs, ButtonField, PageTitle } from "@/components/atoms";
import { useProjectDetail } from "@/data/ewp/konsulting";
import { useWorkflowDetailEWP } from "@/data/ewp";
import { useSumberInformasi } from "@/data/ewp/konsulting/perencanaan/sumber-informasi";
import { LandingLayoutEWPConsulting } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  AttachmentClipping,
  ContentView,
  ImageClipping,
  PrevNextNavigation,
} from "@/components/molecules/commons";
import {
  errorSwalTimeout,
  fetchApi,
  loadingSwal,
  usePostFileData,
} from "@/helpers";
import useUser from "@/data/useUser";
import { useTimTimeplan } from "@/data/ewp/konsulting/perencanaan/tim-timeplan";
const Editor = dynamic(() => import("@/components/atoms/Editor"), {
  ssr: false,
});

const routes = [
  {
    name: "Sumber Informasi",
    slug: "sumber-informasi",
  },
  {
    name: "Tim & Timeplan",
    slug: "tim-timeplan",
  },
  { name: "Anggaran", slug: "anggaran" },
  { name: "Program Kerja", slug: "program-kerja" },
  { name: "Dokumen", slug: "dokumen" },
];

const index = () => {
  const router = useRouter();
  const [params, setParams] = useState({
    id: 0,
  });
  const baseUrl = `/ewp/konsulting/${params?.id}`;
  const pathName = `${baseUrl}/perencanaan`;

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [imageClipList, setImageClipList] = useState([]);
  const [attachmentClipList, setAttachmentClipList] = useState([]);
  const [typeUpload, setTypeUpload] = useState("");
  const [content, setContent] = useState("");

  const [isError, setIsError] = useState(false);
  const [isCloseSubmodule, setIsCloseSubmodule] = useState(false);
  const [isOnProgress, setIsOnProgress] = useState(false);
  const [isInitiator, setIsInitiator] = useState(false);
  const [isAuditor, setIsAuditor] = useState(false);

  const { user } = useUser();
  const { projectDetail, projectDetailError, projectDetailIsLoading } =
    useProjectDetail({ id: params?.id });
  const { sumberInformasi, sumberInformasiMutate } = useSumberInformasi({
    id: params?.id,
  });
  const { timTimeplan } = useTimTimeplan({
    id: params?.id,
  });
  const { workflowDetailEWP } = useWorkflowDetailEWP("mapa", {
    id: params?.id,
  });

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    setParams({
      id,
    });
  }, [router.isReady]);

  useEffect(() => {
    if (!projectDetailIsLoading && params?.id) {
      setIsError(Boolean(projectDetailError));
    }
  }, [projectDetailError, projectDetailIsLoading, params]);

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "EWP", path: "/ewp" },
      { name: "Overview", path: "/ewp/konsulting" },
      {
        name: `${projectDetail?.data?.project_info?.project_id?.toUpperCase()}`,
        path: baseUrl + "/info",
      },
      {
        name: `Perencanaan Kegiatan`,
        path: pathName,
      },
      {
        name: `Sumber Informasi`,
        path: `${baseUrl}/perencanaan/sumber-informasi`,
      },
    ]);

    setIsInitiator(
      Boolean(
        projectDetail?.data?.project_info?.initiator?.pn === user?.data?.pn
      )
    );
    setIsOnProgress(
      Boolean(
        projectDetail?.data?.project_info?.status_persetujuan_name ==
          "On Progress"
      )
    );
  }, [projectDetail, user]);

  useEffect(() => {
    const auditor = timTimeplan?.data?.tim_audit?.auditor;
    if (auditor?.length) {
      const foundAuditor = auditor?.find((v) => v?.pn === user?.data?.pn);
      setIsAuditor(Boolean(foundAuditor));
    } else {
      setIsAuditor(false);
    }
  }, [timTimeplan, user]);

  useEffect(() => {
    setIsCloseSubmodule(
      Boolean(
        workflowDetailEWP?.data?.info?.status_persetujuan_name === "Final"
      )
    );
  }, [workflowDetailEWP]);

  useEffect(() => {
    setContent(sumberInformasi?.data || "");
  }, [sumberInformasi]);

  const handleClickUploadAttachment = () => {
    setTypeUpload("attachment");
  };

  const handleClickUploadImage = () => {
    setTypeUpload("image");
  };

  const handleUploadFile = async (e) => {
    loadingSwal();
    if (e.target.files) {
      const url = `${process.env.NEXT_PUBLIC_API_URL_COMMON}/common/cdn/upload`;
      const response = await usePostFileData(url, {
        file: e.target.files[0],
        modul: "ewp",
      });

      switch (typeUpload) {
        case "attachment":
          setAttachmentClipList((prev) => [
            ...prev,
            { url: response.url[0], name: e.target.files[0].name },
          ]);
          break;
        case "image":
          setImageClipList((prev) => [
            ...prev,
            { url: response.url[0], name: e.target.files[0].name },
          ]);
          break;
      }
    }
    setTypeUpload("");
    loadingSwal("close");
  };

  const handleSubmit = async () => {
    loadingSwal();
    const upload = await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/mapa/si`,
      { sumber_informasi: content, id: params?.id }
    );
    if (upload.isConfirmed) {
      router.push(pathName);
      return;
    }
    sumberInformasiMutate();
    loadingSwal("close");
  };

  if (isError) {
    errorSwalTimeout(projectDetailError, "/ewp/konsulting");
  }

  return (
    <LandingLayoutEWPConsulting>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-7">
        <PageTitle text="Sumber Informasi" />
        <PrevNextNavigation
          baseUrl={pathName}
          routes={routes}
          nextUrl={"/tim-timeplan"}
          marginLeft={"-60px"}
        />
      </div>
      {/* Start Content */}
      <div className="my-4 flex gap-6">
        {(isInitiator || isAuditor) && !isCloseSubmodule && isOnProgress && (
          <div className="w-64 flex flex-col gap-4">
            <ImageClipping
              data={imageClipList}
              handleChange={handleUploadFile}
              handleClick={handleClickUploadImage}
              isHideButton={!((isInitiator || isAuditor) && !isCloseSubmodule)}
            />
            <AttachmentClipping
              data={attachmentClipList}
              handleChange={handleUploadFile}
              handleClick={handleClickUploadAttachment}
              isHideButton={!((isInitiator || isAuditor) && !isCloseSubmodule)}
            />
          </div>
        )}

        <div>
          {(isInitiator || isAuditor) && !isCloseSubmodule && isOnProgress ? (
            <div className="ckeditor-latar-belakang-mapa-ewp">
              <Editor
                contentData={content}
                ready={true}
                onChange={(value) => setContent(value)}
              />
            </div>
          ) : (
            <ContentView dataDoc={content} />
          )}

          {(isInitiator || isAuditor) && !isCloseSubmodule && isOnProgress ? (
            <div className="mt-3 flex justify-end">
              <div className="w-[7.75rem] bg-atlasian-green rounded">
                <ButtonField text={"Simpan"} handler={handleSubmit} />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      {/* End Content */}
    </LandingLayoutEWPConsulting>
  );
};

export default index;

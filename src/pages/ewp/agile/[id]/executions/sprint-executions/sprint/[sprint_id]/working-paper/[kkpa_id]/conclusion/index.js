import {
  Breadcrumbs,
  ButtonField,
  Card,
  PageTitle,
  TextAreaField,
} from "@/components/atoms";
import { useAuditInfo } from "@/data/ewp/common/info";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { LandingLayoutEWPAgile } from "@/layouts/ewp";
import { PrevNextNavigation } from "@/components/molecules/commons";
import { useDetailSprint } from "@/data/ewp/agile/plannings/sprint-planning";
import { useSelector, useDispatch } from "react-redux";
import {
  setObjData,
  setObjPayload,
  resetObjData,
  resetObjPayload,
} from "@/slices/ewp/agile/executions/conslusionExecutionEWPAgileSlice";
import { useWorkingPaperDetail } from "@/data/ewp/agile/executions/working-paper";
import { fetchApi, infoSwal, loadingSwal } from "@/helpers";

const routes = [
  {
    name: "Design Effectiveness",
    slug: "design-effectiveness",
  },
  {
    name: "Operating Effectiveness",
    slug: "operating-effectiveness",
  },
  {
    name: "Conclusion",
    slug: "conclusion",
  },
];

const index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [params, setParams] = useState({
    id: 0,
    sprint_id: 0,
    kkpa_id: 0,
  });

  const baseUrl = `/ewp/agile/${params?.id}/executions`;
  const pathSprint = `${baseUrl}/sprint-executions/sprint/${params?.sprint_id}`;
  const pathWorkingPaper = `${pathSprint}/working-paper/${params?.kkpa_id}`;

  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const data = useSelector(
    (state) => state.conclusionExecutionEWPAgile.objData
  );
  const payload = useSelector(
    (state) => state.conclusionExecutionEWPAgile.objPayload
  );

  const { auditInfo } = useAuditInfo({ module: "agile", id: params?.id });
  const { detailSprint } = useDetailSprint({ id: params?.sprint_id });
  const { workingPaperDetail, workingPaperDetailMutate } =
    useWorkingPaperDetail({ id: params?.kkpa_id });

  useEffect(() => {
    if (!router.isReady) return;
    const { id, sprint_id, kkpa_id } = router.query;
    setParams({
      id,
      sprint_id,
      kkpa_id,
    });
  }, [router.isReady]);

  useEffect(() => {
    if (auditInfo?.data && detailSprint?.data) {
      const responseSprint = detailSprint?.data;
      setBreadcrumbs([
        { name: "Menu", path: "/dashboard" },
        { name: "EWP", path: "/ewp" },
        { name: "Overview", path: "/ewp/agile" },
        {
          name: `${auditInfo?.data?.project_info?.project_id?.toUpperCase()}`,
          path: `/ewp/agile/${params?.id}`,
        },
        { name: "Project Executions", path: baseUrl },
        {
          name: "Sprint Executions",
          path: `${baseUrl}/sprint-executions`,
        },
        {
          name: responseSprint?.sprint_name,
          path: pathSprint,
        },
        {
          name: "Working Paper",
          path: pathWorkingPaper,
        },
        {
          name: "Conclusion",
          path: `${pathWorkingPaper}/conclusion`,
        },
      ]);
    } else {
      setBreadcrumbs([]);
    }
  }, [auditInfo, detailSprint]);

  useEffect(() => {
    if (workingPaperDetail?.data) {
      const response = workingPaperDetail?.data;
      dispatch(
        setObjData({
          uker: response?.story_uker,
          risk_issue: response?.risk_issue,
          sub_major: response?.sub_major_proses,
          efektivitas: response?.is_efective,
        })
      );
      dispatch(setObjPayload(response?.kesimpulan));
    } else {
      dispatch(resetObjPayload());
      dispatch(resetObjData());
    }
  }, [workingPaperDetail]);

  const handleChangePayload = (value) => {
    dispatch(setObjPayload(value));
  };

  const handleSubmit = async () => {
    if (!payload?.length) {
      await infoSwal("Silahkan isi kesimpulan terlebih dahulu!");
      return;
    }

    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/pelaksanaan/working_paper/update/${params?.kkpa_id}`,
      { kesimpulan: payload }
    );
    workingPaperDetailMutate();
    loadingSwal("close");
  };

  return (
    <LandingLayoutEWPAgile>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex gap-3 justify-between items-center mb-7">
        <PageTitle text="Conclusion" />
        <PrevNextNavigation
          baseUrl={pathWorkingPaper}
          routes={routes}
          prevUrl={"/operating-effectiveness"}
          nextUrl={"/dokumen"}
          marginLeft={"-80px"}
          widthDropdown={"w-[16rem]"}
        />
      </div>
      {/* Start Content */}
      <div className="flex flex-col gap-4">
        <Card>
          <div className="py-2 space-y-0 text-center">
            <p className="text-base font-semibold">
              Kesimpulan Hasil Pelaksanaan Audit untuk :
            </p>
            {data?.uker?.ref_auditee_orgeh_kode ? (
              <p className="text-base">{`[${data?.uker?.ref_auditee_orgeh_kode}][${data?.uker?.ref_auditee_branch_kode}] - ${data?.uker?.ref_auditee_branch_name}`}</p>
            ) : (
              ""
            )}
            {data?.risk_issue?.kode ? (
              <p className="text-base">
                <span className="font-bold">{data?.risk_issue?.abbr} - </span>
                {data?.risk_issue?.nama}
              </p>
            ) : (
              ""
            )}
            <p className="text-6xl font-bold text-atlasian-red">
              {data?.efektivitas ? data?.efektivitas?.toUpperCase() : ""}
            </p>
          </div>
        </Card>
        <div className="w-[40rem]">
          <Card>
            <div className="px-3 pb-3 flex flex-col gap-1">
              <p className="text-base font-semibold">Kesimpulan :</p>
              <TextAreaField
                placeholder={"Kesimpulan"}
                value={payload}
                handleChange={(e) => handleChangePayload(e.target.value)}
              />
            </div>
            <div className="flex justify-end px-3">
              <div className="rounded w-32 bg-atlasian-blue-light">
                <ButtonField text={"Simpan"} handler={handleSubmit} />
              </div>
            </div>
          </Card>
        </div>
      </div>
      {/* End Content */}
    </LandingLayoutEWPAgile>
  );
};

export default index;

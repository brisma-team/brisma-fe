import { Breadcrumbs, PageTitle } from "@/components/atoms";
import { useAuditInfo } from "@/data/ewp/common/info";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { LandingLayoutEWPAgile } from "@/layouts/ewp";
import { PrevNextNavigation } from "@/components/molecules/commons";
import { useSelector, useDispatch } from "react-redux";
import {
  setObjDataTable,
  setObjDataContent,
  setObjPayload,
  resetObjDataTable,
  resetObjDataContent,
  resetObjPayload,
} from "@/slices/ewp/agile/plannings/storyAggregationEWPAgileSlice";
import {
  CardContentStoryPoint,
  TableStoryPoint,
} from "@/components/molecules/ewp/agile/plannings/story-aggregations";
import { confirmationSwal, fetchApi, infoSwal, loadingSwal } from "@/helpers";
import { useUserStories } from "@/data/ewp/agile/plannings/story-aggregations";
import _ from "lodash";
import { useRisk } from "@/data/reference";

const routes = [
  {
    name: "Story Aggregations",
    slug: "story-aggregations",
  },
  {
    name: "User Story",
    slug: "user-story",
  },
  {
    name: "Audit Backlog",
    slug: "audit-backlog",
  },
  {
    name: "Sprint Planning",
    slug: "sprint-planning",
  },
  { name: "Documents", slug: "dokumen" },
];

const index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [params, setParams] = useState({
    id: 0,
  });
  const baseUrl = `/ewp/agile/${params?.id}/plannings`;

  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const dataTable = useSelector(
    (state) => state.storyAggregationEWPAgile.objDataTable
  );
  const dataContent = useSelector(
    (state) => state.storyAggregationEWPAgile.objDataContent
  );
  const payload = useSelector(
    (state) => state.storyAggregationEWPAgile.objPayload
  );

  const { auditInfo } = useAuditInfo({ module: "agile", id: params?.id });
  const { userStories, userStoriesMutate } = useUserStories({ id: params?.id });
  const { risk } = useRisk("mapping", { id: payload?.kode || 0 });

  useEffect(() => {
    if (userStories?.data?.user_stories?.length) {
      const mapping = userStories?.data?.user_stories?.map((v) => {
        return {
          id: v?.id,
          risk_issue: _.pick(v?.mtd_risk_issue, ["kode", "abbr", "nama"]),
          sub_major: _.pick(v?.mtd_risk_issue?.mtd_sub_major_proses, [
            "kode",
            "abbr",
            "nama",
          ]),
          major: _.pick(
            v?.mtd_risk_issue?.mtd_sub_major_proses?.mtd_major_proses,
            ["kode", "abbr", "nama"]
          ),
          mega: _.pick(
            v?.mtd_risk_issue?.mtd_sub_major_proses?.mtd_major_proses
              ?.mtd_mega_proses_kode,
            ["kode", "abbr", "nama"]
          ),
          risk_type: v?.mtd_risk_issue?.risk_type_name,
        };
      });

      dispatch(setObjDataTable(mapping));
    } else {
      dispatch(resetObjDataTable());
    }
  }, [userStories]);

  useEffect(() => {
    if (risk?.data) {
      dispatch(setObjDataContent(risk?.data));
    } else {
      dispatch(resetObjDataContent());
    }
  }, [risk]);

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    setParams({
      id,
    });
  }, [router.isReady]);

  useEffect(() => {
    if (auditInfo?.data) {
      setBreadcrumbs([
        { name: "Menu", path: "/dashboard" },
        { name: "EWP", path: "/ewp" },
        { name: "Overview", path: "/ewp/agile" },
        {
          name: `${auditInfo?.data?.project_info?.project_id?.toUpperCase()}`,
          path: `/ewp/agile/${params?.id}`,
        },
        { name: "Project Plannings", path: baseUrl },
        { name: "Story Aggregations", path: `${baseUrl}/story-aggregations` },
      ]);
    } else {
      setBreadcrumbs([]);
    }
  }, [auditInfo]);

  // [ START ] handler for content
  const handleChangePayload = (value) => {
    dispatch(setObjPayload(value));
  };

  const handleResetPayload = (value) => {
    dispatch(resetObjPayload(value));
  };

  const handleSubmitStoryRisk = async () => {
    if (!payload?.kode) {
      infoSwal("Silahkan pilih risk issue terlebih dahulu!");
      return;
    }

    const { kode, abbr, nama } = payload;

    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/perencanaan/user_stories/create/${params?.id}`,
      {
        ref_risk_issue_kode: kode,
        ref_risk_issue_abbr: abbr,
        ref_risk_issue_name: nama,
      }
    );
    loadingSwal("close");
  };

  const handleDeleteStoryRisk = async (id) => {
    const confirm = await confirmationSwal(
      "Apakah Anda yakin untuk mengahapus data ini?"
    );
    if (!confirm.value) {
      return;
    }

    loadingSwal();
    await fetchApi(
      "DELETE",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/perencanaan/user_stories/delete/${id}`,
      {}
    );
    userStoriesMutate();
    loadingSwal("close");
  };

  const handleMoreOptions = () => {
    console.log("more options");
  };
  // [ END ] handler for content

  return (
    <LandingLayoutEWPAgile>
      <div className="!w-[100rem]">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        <div className="flex justify-between items-center mb-7">
          <PageTitle text="Project Plannings" />
          <PrevNextNavigation
            baseUrl={baseUrl}
            routes={routes}
            nextUrl={"/user-story"}
            marginLeft={"-65px"}
          />
        </div>
        {/* Start Content */}
        <div className="flex flex-col gap-4">
          <CardContentStoryPoint
            data={dataContent}
            payload={payload}
            handleChangePayload={handleChangePayload}
            handleResetPayload={handleResetPayload}
            handleSubmit={handleSubmitStoryRisk}
          />
          <TableStoryPoint
            data={dataTable}
            handleClickDelete={handleDeleteStoryRisk}
            handleClickMoreOptions={handleMoreOptions}
          />
        </div>
        {/* End Content */}
      </div>
    </LandingLayoutEWPAgile>
  );
};

export default index;

import { Breadcrumbs, PageTitle } from "@/components/atoms";
import { useAuditInfo } from "@/data/ewp/common/info";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { LandingLayoutEWPAgile } from "@/layouts/ewp";
import {
  NavigationTab,
  PrevNextNavigation,
} from "@/components/molecules/commons";
import { useSelector, useDispatch } from "react-redux";
import {
  setObjDataAll,
  setObjDataSelect,
  setObjDataUnselect,
  setObjPayload,
  resetObjDataAll,
  resetObjDataSelect,
  resetObjDataUnselect,
  resetObjPayload,
} from "@/slices/ewp/agile/plannings/storyAggregationSelectedEWPAgileSlice";
import { fetchApi, infoSwal, loadingSwal } from "@/helpers";
import {
  useAllUserStories,
  useSelectUserStories,
  useUnselectUserStories,
} from "@/data/ewp/agile/plannings/story-aggregations-selected";
import _ from "lodash";
import {
  TableAllStoryPoint,
  TableSelectStoryPoint,
} from "@/components/molecules/ewp/agile/plannings/story-aggregations-selected";

const routes = [
  {
    name: "Story Aggregations",
    slug: "story-aggregations",
  },
  {
    name: "Story Aggegations Selected",
    slug: "story-aggregations-selected",
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
const navigationTabItems = [
  { idx: 1, title: "&nbsp&nbsp&nbsp&nbsp&nbspAll&nbsp&nbsp&nbsp&nbsp&nbsp" },
  { idx: 2, title: "Selected" },
  { idx: 3, title: "Unselected" },
];

const index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [params, setParams] = useState({
    id: 0,
  });
  const baseUrl = `/ewp/agile/${params?.id}/plannings`;

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [currentContentStage, setCurrentContentStage] = useState(1);

  const dataAll = useSelector(
    (state) => state.storyAggregationSelectedEWPAgile.objDataAll
  );
  const dataSelect = useSelector(
    (state) => state.storyAggregationSelectedEWPAgile.objDataSelect
  );
  const dataUnselect = useSelector(
    (state) => state.storyAggregationSelectedEWPAgile.objDataUnselect
  );
  const payload = useSelector(
    (state) => state.storyAggregationSelectedEWPAgile.objPayload
  );

  const { auditInfo } = useAuditInfo({ module: "agile", id: params?.id });
  const { allUserStories, allUserStoriesMutate } = useAllUserStories({
    id: params?.id,
  });
  const { selectUserStories, selectUserStoriesMutate } = useSelectUserStories({
    id: params?.id,
  });
  const { unselectUserStories, unselectUserStoriesMutate } =
    useUnselectUserStories({
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
        {
          name: "Story Aggregations Selected",
          path: `${baseUrl}/story-aggregations-selected`,
        },
      ]);
    } else {
      setBreadcrumbs([]);
    }
  }, [auditInfo]);

  useEffect(() => {
    if (allUserStories?.data?.user_stories?.length) {
      dispatch(
        setObjDataAll(
          mappingDataUserStories(allUserStories?.data?.user_stories)
        )
      );
    } else {
      dispatch(resetObjDataAll());
    }
  }, [allUserStories]);

  useEffect(() => {
    if (selectUserStories?.data?.user_stories?.length) {
      const mappingPayload = selectUserStories?.data?.user_stories?.map((v) => {
        return v?.id;
      });
      dispatch(
        setObjDataSelect(
          mappingDataUserStories(selectUserStories?.data?.user_stories)
        )
      );
      dispatch(setObjPayload(mappingPayload));
    } else {
      dispatch(resetObjDataSelect());
      dispatch(resetObjPayload());
    }
  }, [selectUserStories]);

  useEffect(() => {
    if (unselectUserStories?.data?.user_stories?.length) {
      dispatch(
        setObjDataUnselect(
          mappingDataUserStories(unselectUserStories?.data?.user_stories)
        )
      );
    } else {
      dispatch(resetObjDataUnselect());
    }
  }, [unselectUserStories]);

  const mappingDataUserStories = (data) => {
    return data?.map((v) => {
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
  };

  const handleChangeTab = (index) => {
    setCurrentContentStage(index);
  };

  // [ START ] handler for table all story point
  const handleChangeCheckbox = (isChecked, id) => {
    const updatedData = [...payload];
    if (isChecked) {
      const findId = updatedData.some((value) => value === id);

      if (!findId) {
        updatedData.push(id);
      }
    } else {
      const filter = updatedData.filter((value) => value !== id);
      dispatch(setObjPayload(filter));
      return;
    }

    dispatch(setObjPayload(updatedData));
  };

  const handleClickUnselectAll = () => {
    dispatch(resetObjPayload());
  };

  const handleClickSelectedAll = () => {
    const mapping = dataAll?.length
      ? dataAll?.map((v) => {
          return v?.id;
        })
      : [];
    dispatch(setObjPayload(mapping));
  };

  const handleSubmit = async () => {
    if (!payload?.length) {
      infoSwal("Silahkan pilih story point terlebih dahulu!");
      return;
    }

    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/perencanaan/user_stories/select/${params?.id}`,
      { selected_story: payload }
    );
    allUserStoriesMutate();
    selectUserStoriesMutate();
    unselectUserStoriesMutate();
    loadingSwal("close");
  };
  // [ END ] handler for table all story point

  return (
    <LandingLayoutEWPAgile>
      <div className="!w-[95rem]">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        <div className="flex justify-between items-center mb-7">
          <PageTitle text="Story Aggregations Selected" />
          <PrevNextNavigation
            baseUrl={baseUrl}
            routes={routes}
            prevUrl={"/story-aggregations"}
            nextUrl={"/audit-backlog"}
            marginLeft={"-95px"}
            widthDropdown={"w-[16rem]"}
          />
        </div>
        {/* Start Content */}
        <div className="flex flex-col gap-4">
          <NavigationTab
            items={navigationTabItems}
            currentStage={currentContentStage}
            width={"w-64"}
            handleChange={handleChangeTab}
          />
          {currentContentStage === 1 ? (
            <TableAllStoryPoint
              data={dataAll}
              payload={payload}
              handleChangeCheckbox={handleChangeCheckbox}
              handleClickUnselectAll={handleClickUnselectAll}
              handleClickSelectAll={handleClickSelectedAll}
              handleSubmit={handleSubmit}
            />
          ) : currentContentStage === 2 ? (
            <TableSelectStoryPoint data={dataSelect} />
          ) : currentContentStage === 3 ? (
            <TableSelectStoryPoint data={dataUnselect} />
          ) : (
            ""
          )}
        </div>
        {/* End Content */}
      </div>
    </LandingLayoutEWPAgile>
  );
};

export default index;

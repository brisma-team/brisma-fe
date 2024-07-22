import { Breadcrumbs, PageTitle } from "@/components/atoms";
import { useAuditInfo } from "@/data/ewp/common/info";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { LandingLayoutEWPAgile } from "@/layouts/ewp";
import { PrevNextNavigation } from "@/components/molecules/commons";
import { useSelector, useDispatch } from "react-redux";
import {
  setObjData,
  setObjPayload,
  resetObjData,
  resetObjPayload,
} from "@/slices/ewp/agile/plannings/auditBacklogEWPAgileSlice";
import { confirmationSwal, fetchApi, loadingSwal } from "@/helpers";
import _ from "lodash";
import { TableAuditBacklog } from "@/components/molecules/ewp/agile/plannings/audit-backlog";
import {
  useAuditBacklog,
  useDetailAuditBacklog,
} from "@/data/ewp/agile/plannings/audit-backlog";
import ModalEditAuditBacklog from "@/components/molecules/ewp/agile/plannings/audit-backlog/ModalEditAuditBacklog";

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

const index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [params, setParams] = useState({
    id: 0,
  });
  const baseUrl = `/ewp/agile/${params?.id}/plannings`;

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  const data = useSelector((state) => state.auditBacklogEWPAgile.objData);
  const payload = useSelector((state) => state.auditBacklogEWPAgile.objPayload);

  const { auditInfo } = useAuditInfo({ module: "agile", id: params?.id });
  const { auditBacklog, auditBacklogMutate } = useAuditBacklog({
    id: params?.id,
  });
  const { detailAuditBacklog } = useDetailAuditBacklog({
    id: selectedId,
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
          name: "Audit Backlog",
          path: `${baseUrl}/audit-backlog`,
        },
      ]);
    } else {
      setBreadcrumbs([]);
    }
  }, [auditInfo]);

  useEffect(() => {
    if (auditBacklog?.data?.length) {
      const mapping = auditBacklog?.data?.map((v) => {
        return {
          ..._.pick(v, [
            "id",
            "feature",
            "design",
            "operating",
            "priority",
            "user_story_desc",
          ]),
          status: v?.status_penyelesaian,
          sprint: v?.sprint?.no
            ? { no: v?.sprint?.no, nama: v?.sprint?.sprint_name }
            : null,
          uker: v?.user_stories_uker?.length
            ? v?.user_stories_uker?.map((uker) => {
                return {
                  branch: {
                    kode: uker?.ref_auditee_branch_kode,
                    nama: uker?.ref_auditee_branch_name,
                  },
                  orgeh: {
                    kode: uker?.ref_auditee_orgeh_kode,
                    nama: uker?.ref_auditee_orgeh_name,
                  },
                };
              })
            : [],
          risk_issue: {
            kode: v?.ref_risk_issue_kode,
            abbr: v?.ref_risk_issue_abbr,
            nama: v?.ref_risk_issue_name,
          },
          sub_major: _.pick(v?.mtd_risk_issue?.mtd_sub_major_proses, [
            "kode",
            "abbr",
            "nama",
          ]),
          mandays: v?.estimate,
          dor: v?.definition_of_ready,
          dod: v?.definition_of_done,
        };
      });
      dispatch(setObjData(mapping));
    } else {
      dispatch(resetObjData());
    }
  }, [auditBacklog]);

  useEffect(() => {
    if (detailAuditBacklog?.data) {
      dispatch(
        setObjPayload({
          ..._.pick(detailAuditBacklog?.data, [
            "definition_of_done",
            "definition_of_ready",
            "feature",
            "priority",
            "user_story_desc",
          ]),
          mandays: detailAuditBacklog?.data?.estimate,
        })
      );
    } else {
      dispatch(resetObjPayload());
    }
  }, [detailAuditBacklog, showModal]);

  //   [ START ] handler for table
  const handleClickEdit = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };
  //   [ END ] handler for table

  //   [ START ] handler for modal
  const handleCloseModal = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );
    if (!confirm.value) {
      return;
    }

    setSelectedId(0);
    dispatch(resetObjPayload());
    setShowModal(false);
  };

  const handleChangePayload = (property, value) => {
    dispatch(setObjPayload({ ...payload, [property]: value }));
  };

  const handleResetPayload = (property) => {
    dispatch(setObjPayload({ ...payload, [property]: "" }));
  };

  const handleSubmit = async () => {
    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/perencanaan/user_stories/update/${selectedId}`,
      {
        ..._.omit(payload, ["mandays", "priority"]),
        priority: payload?.priority ? parseInt(payload?.priority) : 0,
        estimate: payload?.mandays ? parseFloat(payload?.mandays) : 0,
      }
    );
    auditBacklogMutate();
    setShowModal(false);
    loadingSwal("close");
  };
  //   [ END ] handler for modal

  return (
    <LandingLayoutEWPAgile>
      <div className="!w-[95rem]">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        <div className="flex justify-between items-center mb-7">
          <PageTitle text="Audit Backlog" />
          <PrevNextNavigation
            baseUrl={baseUrl}
            routes={routes}
            prevUrl={"/story-aggregations-selected"}
            nextUrl={"/sprint-planning"}
            marginLeft={"-95px"}
            widthDropdown={"w-[16rem]"}
          />
        </div>
        {/* Start Content */}
        <TableAuditBacklog data={data} handleClickEdit={handleClickEdit} />
        <ModalEditAuditBacklog
          data={payload}
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          handleChange={handleChangePayload}
          handleReset={handleResetPayload}
          handleSubmit={handleSubmit}
        />
        {/* End Content */}
      </div>
    </LandingLayoutEWPAgile>
  );
};

export default index;

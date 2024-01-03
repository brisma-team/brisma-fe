import { Breadcrumbs, PageTitle } from "@/components/atoms";
import { LandingLayoutSurvey } from "@/layouts/survey";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useApprovalResponden } from "@/data/survey/responden/approval";
import {
  setDataTablesApprovalQueue,
  setDataTablesHistory,
} from "@/slices/survey/responden/approvalSurveySlice";
import {
  TableApprovalQueue,
  TableHistory,
} from "@/components/molecules/survey/initiator/approval";
import { useSelector, useDispatch } from "react-redux";
import { CardTotalListSidebar } from "@/components/molecules/commons";

const breadcrumbs = [
  { name: "Menu", path: "/dashboard" },
  { name: "Survei", path: "/survey" },
  { name: "Approval", path: "/survey/responden/approval" },
];

const index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [cardContentTotalApproval, setCardContentTotalApproval] = useState([]);

  const dataTablesApprovalQueue = useSelector(
    (state) => state.approvalRespondenSurvey.dataTablesApprovalQueue
  );
  const dataTablesHistory = useSelector(
    (state) => state.approvalRespondenSurvey.dataTablesHistory
  );

  const { approvalResponden, approvalRespondenError } = useApprovalResponden();

  useEffect(() => {
    if (!approvalRespondenError) {
      setCardContentTotalApproval([
        {
          color: "text-atlasian-purple",
          total: approvalResponden?.data?.header?.newApproval?.toString(),
          name: "NEW",
        },
        {
          color: "text-atlasian-green",
          total: approvalResponden?.data?.header?.totalApprove?.toString(),
          name: "APPROVED",
        },
        {
          color: "text-atlasian-red",
          total: approvalResponden?.data?.header?.totalReject?.toString(),
          name: "REJECTED",
        },
      ]);

      if (approvalResponden?.data?.body?.antrian?.length) {
        const mapping = approvalResponden?.data?.body?.antrian?.map((queue) => {
          const { survey_id, create_by, project_survey, module } = queue;
          return {
            survey_id,
            pn: create_by.pn,
            nama: create_by.nama,
            project_survey_id: project_survey.project_survey_id,
            jenis_survey_name: project_survey.jenis_survey_name,
            fase_approval: module,
          };
        });

        dispatch(setDataTablesApprovalQueue(mapping));
      } else {
        dispatch(setDataTablesApprovalQueue([]));
      }

      if (approvalResponden?.data?.body?.history?.length) {
        const mapping = approvalResponden?.data?.body?.history?.map((queue) => {
          const { responden_survey, is_signed, createdAt, note } = queue;
          return {
            tanggal: createdAt,
            pn: responden_survey?.pn_responden,
            nama: responden_survey?.nama_responden,
            project_survey_id:
              responden_survey?.project_survey?.project_survey_id,
            jenis_survey_name:
              responden_survey?.project_survey?.jenis_survey_name,
            status_approval:
              is_signed == null ? "" : is_signed ? "Approved" : "Rejected",
            note,
          };
        });

        dispatch(setDataTablesHistory(mapping));
      } else {
        dispatch(setDataTablesHistory([]));
      }
    }
  }, [approvalResponden]);

  const handleClickActionOnTableApprovalQueue = (survey_id, pn) => {
    router.push(`overview/${survey_id}?is_approval=true&from=${pn}`);
  };

  return (
    <LandingLayoutSurvey
      overflowY={true}
      withoutRightSidebar={true}
      isLayoutResponden
    >
      <div className="w-full h-full pr-16 pb-20 pt-2">
        <Breadcrumbs data={breadcrumbs} />
        <div className="-mt-4">
          <PageTitle text={"Approval Overview"} />
        </div>
        <div className="flex mt-6">
          <div className="flex flex-col gap-4 w-[60rem]">
            <TableApprovalQueue
              data={dataTablesApprovalQueue}
              handleClickAction={handleClickActionOnTableApprovalQueue}
            />
            <TableHistory data={dataTablesHistory} />
          </div>
          <div className="w-40">
            <CardTotalListSidebar data={cardContentTotalApproval} />
          </div>
        </div>
        {/* End Content */}
      </div>
    </LandingLayoutSurvey>
  );
};

export default index;

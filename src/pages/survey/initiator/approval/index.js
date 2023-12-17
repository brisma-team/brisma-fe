import { Breadcrumbs, PageTitle, CustomPagination } from "@/components/atoms";
import { LandingLayoutSurvey } from "@/layouts/survey";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useApprovalInitiator } from "@/data/survey/initiator/approval";
import {
  setDataTablesApprovalQueue,
  setDataTablesHistory,
} from "@/slices/survey/initiator/approvalSurveySlice";
import { TableApprovalQueue } from "@/components/molecules/survey/initiator/approval";
import { useSelector, useDispatch } from "react-redux";
import { CardTotalListSidebar } from "@/components/molecules/commons";
import TableHistory from "@/components/molecules/survey/initiator/approval/TableHistory";

const breadcrumbs = [
  { name: "Menu", path: "/dashboard" },
  { name: "Survei", path: "/survey" },
  { name: "Approval", path: "/survey/initiator/approval" },
];

const index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [cardContentTotalApproval, setCardContentTotalApproval] = useState([]);

  const dataTablesApprovalQueue = useSelector(
    (state) => state.approvalInitiatorSurvey.dataTablesApprovalQueue
  );
  const dataTablesHistory = useSelector(
    (state) => state.approvalInitiatorSurvey.dataTablesHistory
  );

  const { approvalInitiator, approvalInitiatorError } = useApprovalInitiator();

  useEffect(() => {
    if (!approvalInitiatorError) {
      setCardContentTotalApproval([
        {
          color: "text-atlasian-purple",
          total: approvalInitiator?.data?.header?.newApproval?.toString(),
          name: "NEW",
        },
        {
          color: "text-atlasian-green",
          total: approvalInitiator?.data?.header?.totalApprove?.toString(),
          name: "APPROVED",
        },
        {
          color: "text-atlasian-red",
          total: approvalInitiator?.data?.header?.totalReject?.toString(),
          name: "REJECTED",
        },
      ]);

      if (approvalInitiator?.data?.body?.antrian?.length) {
        const mapping = approvalInitiator?.data?.body?.antrian?.map((queue) => {
          const {
            survey_id,
            pn,
            project_survey_id,
            jenis_survey_name,
            module,
          } = queue;
          return {
            survey_id,
            pn,
            project_survey_id,
            jenis_survey_name,
            fase_approval: module,
          };
        });

        dispatch(setDataTablesApprovalQueue(mapping));
      } else {
        dispatch(setDataTablesApprovalQueue([]));
      }

      if (approvalInitiator?.data?.body?.history?.length) {
        const mapping = approvalInitiator?.data?.body?.history?.map((queue) => {
          const { project_survey, is_signed, createdAt } = queue;
          return {
            tanggal: createdAt,
            project_survey_id: project_survey?.project_survey_id,
            jenis_survey_name: project_survey?.jenis_survey_name,
            status_approval: is_signed ? "Approved" : "Rejected",
          };
        });

        dispatch(setDataTablesHistory(mapping));
      } else {
        dispatch(setDataTablesHistory([]));
      }
    }
  }, [approvalInitiator]);

  const handleClickActionOnTableApprovalQueue = (survey_id, pn) => {
    router.push(`overview/${survey_id}?is_approval=true&from=${pn}`);
  };

  return (
    <LandingLayoutSurvey overflowY={true} withoutRightSidebar={true}>
      <div className="w-full h-full pr-16 pb-20 pt-2">
        <Breadcrumbs data={breadcrumbs} />
        <div className="-mt-4">
          <PageTitle text={"Approval Overview"} />
        </div>
        <div className="flex mt-6">
          <div className="flex flex-col gap-4 w-[55rem]">
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

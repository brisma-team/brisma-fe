import { Breadcrumbs, PageTitle } from "@/components/atoms";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useApprovalAdminSurvey } from "@/data/reference/admin-survey/approval";
import {
  setDataTablesApprovalQueue,
  setDataTablesHistory,
} from "@/slices/reference/approvalAdminSurveyReferenceSlice";
import {
  TableApprovalQueue,
  TableHistory,
} from "@/components/molecules/survey/initiator/approval";
import { useSelector, useDispatch } from "react-redux";
import { CardTotalListSidebar } from "@/components/molecules/commons";
import { LayoutSurveyReference } from "@/layouts/reference";

const breadcrumbs = [
  { name: "Menu", path: "/dashboard" },
  { name: "Reference", path: "/reference" },
  { name: "Survey / Approval", path: "/reference/survey/approval" },
];

const index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [cardContentTotalApproval, setCardContentTotalApproval] = useState([]);

  const dataTablesApprovalQueue = useSelector(
    (state) => state.approvalAdminSurveyReference.dataTablesApprovalQueue
  );
  const dataTablesHistory = useSelector(
    (state) => state.approvalAdminSurveyReference.dataTablesHistory
  );

  const { approvalAdminSurvey, approvalAdminSurveyError } =
    useApprovalAdminSurvey();

  useEffect(() => {
    if (!approvalAdminSurveyError) {
      setCardContentTotalApproval([
        {
          color: "text-atlasian-purple",
          total: approvalAdminSurvey?.data?.header?.newApproval?.toString(),
          name: "NEW",
        },
        {
          color: "text-atlasian-green",
          total: approvalAdminSurvey?.data?.header?.totalApprove?.toString(),
          name: "APPROVED",
        },
        {
          color: "text-atlasian-red",
          total: approvalAdminSurvey?.data?.header?.totalReject?.toString(),
          name: "REJECTED",
        },
      ]);

      if (approvalAdminSurvey?.data?.body?.antrian?.length) {
        const mapping = approvalAdminSurvey?.data?.body?.antrian?.map(
          (queue) => {
            const {
              project_template_id,
              sub_modul_id,
              jenis_survey_name,
              create_by,
              module,
            } = queue;
            return {
              survey_id: sub_modul_id,
              pn: create_by?.pn,
              nama: create_by?.nama,
              project_survey_id: project_template_id,
              jenis_survey_name: jenis_survey_name,
              fase_approval: module,
            };
          }
        );

        dispatch(setDataTablesApprovalQueue(mapping));
      } else {
        dispatch(setDataTablesApprovalQueue([]));
      }

      if (approvalAdminSurvey?.data?.body?.history?.length) {
        const mapping = approvalAdminSurvey?.data?.body?.history?.map(
          (queue) => {
            const { template_survey, is_signed, createdAt } = queue;
            return {
              tanggal: createdAt,
              pn: template_survey?.create_by?.pn,
              nama: template_survey?.create_by?.fullName,
              project_survey_id: template_survey?.project_template_id,
              jenis_survey_name: template_survey?.jenis_survey_name,
              status_approval: is_signed ? "Approved" : "Rejected",
            };
          }
        );

        dispatch(setDataTablesHistory(mapping));
      } else {
        dispatch(setDataTablesHistory([]));
      }
    }
  }, [approvalAdminSurvey]);

  const handleClickActionOnTableApprovalQueue = (survey_id) => {
    router.push(`overview/${survey_id}?is_approval=true`);
  };

  return (
    <LayoutSurveyReference overflowY={true}>
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
              isInitiator={true}
              isTemplate={true}
            />
            <TableHistory
              data={dataTablesHistory}
              isInitiator={true}
              isTemplate={true}
            />
          </div>
          <div className="w-40">
            <CardTotalListSidebar data={cardContentTotalApproval} />
          </div>
        </div>
        {/* End Content */}
      </div>
    </LayoutSurveyReference>
  );
};

export default index;

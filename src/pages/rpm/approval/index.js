import { Breadcrumbs, PageTitle } from "@/components/atoms";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useApprovalRPM } from "@/data/rpm/approval";
import {
  setDataTablesApprovalQueue,
  setDataTablesHistory,
} from "@/slices/survey/initiator/approvalSurveySlice";
import {
  TableApprovalQueue,
  TableHistory,
} from "@/components/molecules/rpm/common/approval";
import { useSelector, useDispatch } from "react-redux";
import { CardTotalListSidebar } from "@/components/molecules/commons";
import _ from "lodash";
import { OverviewLayoutEWP } from "@/layouts/ewp";

const breadcrumbs = [
  { name: "Menu", path: "/dashboard" },
  { name: "RPM", path: "/rpm" },
  { name: "Approval", path: "/rpm/approval" },
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

  const { approvalRPM } = useApprovalRPM();

  useEffect(() => {
    if (approvalRPM?.data) {
      setCardContentTotalApproval([
        {
          color: "text-atlasian-purple",
          total: approvalRPM?.data?.header?.newApproval?.toString(),
          name: "NEW",
        },
        {
          color: "text-atlasian-green",
          total: approvalRPM?.data?.header?.totalApprove?.toString(),
          name: "APPROVED",
        },
        {
          color: "text-atlasian-red",
          total: approvalRPM?.data?.header?.totalReject?.toString(),
          name: "REJECTED",
        },
      ]);

      if (approvalRPM?.data?.body?.antrian?.length) {
        const mapping = approvalRPM?.data?.body?.antrian?.map((queue) => {
          const { sub_modul, ref_tipe } = queue;

          return {
            ..._.pick(queue, [
              "rpm_id",
              "kkpt_id",
              "action_plan_id",
              "sub_modul_id",
              "sub_modul",
              "create_by",
              "project_id",
              "project_name",
              "ref_metode",
              "ref_tipe",
            ]),
            project_name: queue?.nama_project,
            fase_approval: defineFaseApproval(sub_modul, ref_tipe),
          };
        });

        dispatch(setDataTablesApprovalQueue(mapping));
      } else {
        dispatch(setDataTablesApprovalQueue([]));
      }

      if (approvalRPM?.data?.body?.history?.length) {
        const mapping = approvalRPM?.data?.body?.history?.map((history) => {
          const { is_signed, sub_modul, ref_tipe } = history;
          return {
            ..._.pick(history, [
              "project_id",
              "createdAt",
              "created_at",
              "ref_metode",
              "ref_tipe",
              "note",
            ]),
            project_name: history?.nama_project,
            sub_modul: defineFaseApproval(sub_modul, ref_tipe),
            status_approval:
              is_signed == null ? "" : is_signed ? "Approved" : "Rejected",
          };
        });

        dispatch(setDataTablesHistory(mapping));
      } else {
        dispatch(setDataTablesHistory([]));
      }
    }
  }, [approvalRPM]);

  const defineFaseApproval = (sub_modul, tipe) => {
    let faseApproval;
    switch (tipe?.nama) {
      case "Consulting":
        if (sub_modul === "project_rpm") {
          faseApproval = "Monitoring";
        } else if (sub_modul === "entrance_ba") {
          faseApproval = "Entrance Berita Acara";
        } else if (sub_modul === "entrance_notulen") {
          faseApproval = "Entrance Notulen";
        }
        break;
      case "Monitoring Offsite":
        if (sub_modul === "mapa") {
          faseApproval = "Perencanaan";
        } else if (sub_modul === "analisa") {
          faseApproval = "Pelaksanaan";
        } else if (sub_modul === "reporting") {
          faseApproval = "Reporting";
        } else if (sub_modul === "tidak_lanjut") {
          faseApproval = "Tindak Lanjut";
        } else if (sub_modul === "entrance_ba") {
          faseApproval = "Entrance Berita Acara";
        } else if (sub_modul === "entrance_notulen") {
          faseApproval = "Entrance Notulen";
        }
        break;
      case "Quality Assurance":
        if (sub_modul === "action_plan_tindak_lanjut") {
          faseApproval = "Action Plan Tindak Lanjut";
        } else if (sub_modul === "action_plan_evaluasi") {
          faseApproval = "Action Plan Evaluasi";
        } else if (sub_modul === "action_plan_nego") {
          faseApproval = "Negosiasi";
        } else if (sub_modul === "entrance_ba") {
          faseApproval = "Entrance Berita Acara";
        } else if (sub_modul === "entrance_notulen") {
          faseApproval = "Entrance Notulen";
        }
        break;
      default:
        faseApproval = "-";
        break;
    }

    return faseApproval;
  };

  const handleClickActionOnTableApprovalQueue = (data) => {
    const {
      ref_tipe,
      sub_modul,
      rpm_id,
      kkpt_id,
      sub_modul_id,
      action_plan_id,
      meeting_id,
    } = data;
    let query;
    switch (ref_tipe?.nama) {
      case "Consulting":
        if (sub_modul === "project_rpm") {
          query = `kegiatan/${rpm_id}/dokumen`;
        } else if (sub_modul === "entrance_ba") {
          query = `kegiatan/${rpm_id}/meeting/${meeting_id}/berita-acara`;
        } else if (sub_modul === "entrance_notulen") {
          query = `quality-assurance/${rpm_id}/meeting/${meeting_id}/notulen`;
        }
        break;
      case "Quality Assurance":
        if (sub_modul === "action_plan_tindak_lanjut") {
          query = `quality-assurance/${rpm_id}/overview/${kkpt_id}/tindak-lanjut/${sub_modul_id}`;
        } else if (sub_modul === "action_plan_evaluasi") {
          query = `quality-assurance/${rpm_id}/overview/${kkpt_id}/evaluasi/${sub_modul_id}`;
        } else if (sub_modul === "action_plan_nego") {
          query = `quality-assurance/${rpm_id}/overview/${kkpt_id}/negosiasi/${action_plan_id}`;
        } else if (sub_modul === "entrance_ba") {
          query = `quality-assurance/${rpm_id}/meeting/${meeting_id}/berita-acara`;
        } else if (sub_modul === "entrance_notulen") {
          query = `quality-assurance/${rpm_id}/meeting/${meeting_id}/notulen`;
        }
        break;
    }
    router.push(`${query}?is_approval=true`);
  };

  return (
    <OverviewLayoutEWP data={approvalRPM?.data?.header}>
      <div className="w-[93rem]">
        <Breadcrumbs data={breadcrumbs} />
        <div className="mb-6">
          <PageTitle text={"Approval Overview"} />
        </div>
        <div className="w-full flex justify-between">
          <div className="w-full flex flex-col gap-4">
            <TableApprovalQueue
              data={dataTablesApprovalQueue}
              handleClickAction={handleClickActionOnTableApprovalQueue}
            />
            <TableHistory data={dataTablesHistory} />
          </div>
          <div className="w-44">
            <CardTotalListSidebar data={cardContentTotalApproval} />
          </div>
        </div>
      </div>
    </OverviewLayoutEWP>
  );
};

export default index;

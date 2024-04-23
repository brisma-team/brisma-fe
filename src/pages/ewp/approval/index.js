import { Breadcrumbs, PageTitle } from "@/components/atoms";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useApprovalEWP } from "@/data/ewp/approval";
import {
  setDataTablesApprovalQueue,
  setDataTablesHistory,
} from "@/slices/survey/initiator/approvalSurveySlice";
import {
  TableApprovalQueue,
  TableHistory,
} from "@/components/molecules/ewp/approval";
import { useSelector, useDispatch } from "react-redux";
import { CardTotalListSidebar } from "@/components/molecules/commons";
import _ from "lodash";
import { OverviewLayoutEWP } from "@/layouts/ewp";

const breadcrumbs = [
  { name: "Menu", path: "/dashboard" },
  { name: "EWP", path: "/ewp" },
  { name: "Approval", path: "/ewp/approval" },
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

  const { approvalEWP } = useApprovalEWP();

  useEffect(() => {
    if (approvalEWP?.data) {
      setCardContentTotalApproval([
        {
          color: "text-atlasian-purple",
          total: approvalEWP?.data?.header?.newApproval?.toString(),
          name: "NEW",
        },
        {
          color: "text-atlasian-green",
          total: approvalEWP?.data?.header?.totalApprove?.toString(),
          name: "APPROVED",
        },
        {
          color: "text-atlasian-red",
          total: approvalEWP?.data?.header?.totalReject?.toString(),
          name: "REJECTED",
        },
      ]);

      if (approvalEWP?.data?.body?.antrian?.length) {
        const mapping = approvalEWP?.data?.body?.antrian?.map((queue) => {
          const { sub_modul, ref_tipe } = queue;

          return {
            ..._.pick(queue, [
              "ewp_id",
              "sub_modul_id",
              "sub_modul",
              "create_by",
              "project_id",
              "project_name",
              "matrix_id",
              "ref_metode",
              "ref_tipe",
            ]),
            fase_approval: defineFaseApproval(sub_modul, ref_tipe),
          };
        });

        dispatch(setDataTablesApprovalQueue(mapping));
      } else {
        dispatch(setDataTablesApprovalQueue([]));
      }

      if (approvalEWP?.data?.body?.history?.length) {
        const mapping = approvalEWP?.data?.body?.history?.map((history) => {
          const { is_signed, sub_modul, ref_tipe } = history;
          return {
            ..._.pick(history, [
              "project_id",
              "project_name",
              "createdAt",
              "created_at",
              "ref_metode",
              "ref_tipe",
              "note",
            ]),
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
  }, [approvalEWP]);

  const defineFaseApproval = (sub_modul, tipe) => {
    let faseApproval;
    switch (tipe?.nama) {
      case "Consulting":
        if (sub_modul === "mapa") {
          faseApproval = "Perencanaan";
        } else if (sub_modul === "kkpa") {
          faseApproval = "Analisa";
        } else if (sub_modul === "kkpt") {
          faseApproval = "Peluang Peningkatan";
        } else if (sub_modul === "matrix_peluang_peningkatan") {
          faseApproval = "Matrix Peluang Peningkatan";
        } else if (sub_modul === "adendum" || sub_modul === "addendum") {
          faseApproval = "Addendum";
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
        }
        break;
      default:
        faseApproval = "-";
        break;
    }

    return faseApproval;
  };

  const handleClickActionOnTableApprovalQueue = (data) => {
    const { ref_tipe, sub_modul, ewp_id, sub_modul_id } = data;
    let query;
    switch (ref_tipe?.nama) {
      case "Consulting":
        if (sub_modul === "mapa") {
          query = `konsulting/${ewp_id}/perencanaan`;
        } else if (sub_modul === "kkpa") {
          query = `konsulting/${ewp_id}/analisa/${sub_modul_id}`;
        } else if (sub_modul === "kkpt") {
          query = `konsulting/${ewp_id}/peluang-peningkatan/${data?.matrix_id}/overview/${sub_modul_id}`;
        } else if (sub_modul === "matrix_peluang_peningkatan") {
          query = "Matrix Peluang Peningkatan";
        } else if (sub_modul === "adendum") {
          query = `konsulting/${ewp_id}/addendum`;
          break;
        }
    }
    router.push(`${query}/dokumen?is_approval=true`);
  };

  return (
    <OverviewLayoutEWP data={approvalEWP?.data?.header}>
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

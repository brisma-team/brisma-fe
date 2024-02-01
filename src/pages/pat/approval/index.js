import React, { useEffect, useState } from "react";
import { PatOverviewLayout } from "@/layouts/pat";
import useApproval from "@/data/pat/approval/useApproval";
import { Breadcrumbs } from "@/components/atoms";
import {
  TableHistoryPAT,
  TableApprovalQueuePAT,
} from "@/components/molecules/pat/approval";
import Button from "@atlaskit/button";
import useApprovalHistory from "@/data/pat/approval/useApprovalHistory";
import { CardApprovalList } from "@/components/molecules/commons";
import { useRouter } from "next/router";

const breadcrumbs = [
  { name: "Menu", path: "/dashboard" },
  { name: "PAT", path: "/pat" },
  { name: "Overview", path: "/pat/approval" },
];

const index = () => {
  const router = useRouter();
  const [queue, setQueue] = useState([]);
  const [totalApproved, setTotalApproved] = useState({});
  const [history, setHistory] = useState([]);
  const { approvalList } = useApproval();
  const { approvalHistory } = useApprovalHistory();

  useEffect(() => {
    if (approvalList) {
      setQueue(approvalList?.data?.body);
      setTotalApproved(approvalList?.data?.header);
    } else {
      setQueue([]);
      setTotalApproved([]);
    }

    if (approvalHistory) {
      setHistory(approvalHistory?.data?.logPAT?.data);
    } else {
      setHistory([]);
    }
  }, [approvalList, approvalHistory]);

  useEffect(() => {
    console.log("history => ", history);
  }, [history]);

  const handleClickActionOnTableApprovalQueue = (pat_id) => {
    router.push(`projects/${pat_id}/dokumen?is_approval=true`);
  };

  return (
    <PatOverviewLayout withContent={false}>
      <div className="pr-24">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1">
            <div className="text-3xl font-bold">Approval Overview</div>
          </div>
        </div>
        <div className="flex mb-6">
          <div className="flex-initial w-[850px]">
            <div className="mb-5">
              <TableApprovalQueuePAT
                data={queue}
                handleClickAction={handleClickActionOnTableApprovalQueue}
              />
            </div>
            <div>
              <TableHistoryPAT data={history} />
            </div>
          </div>
          <div className="flex-initial w-[260px] px-16">
            <div>
              <CardApprovalList data={totalApproved} />
            </div>
          </div>
        </div>
      </div>
    </PatOverviewLayout>
  );
};

export default index;

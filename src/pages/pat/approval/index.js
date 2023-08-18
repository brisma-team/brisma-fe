import React, { useEffect, useState } from "react";
import { PatOverviewLayout } from "@/layouts/pat";
import useApproval from "@/data/pat/approval/useApproval";
import { Breadcrumbs } from "@/components/atoms";
import {
  CardApprovalQueue,
  CardApprovalHistory,
} from "@/components/molecules/pat";
import Button from "@atlaskit/button";
import useApprovalHistory from "@/data/pat/approval/useApprovalHistory";
import { CardApprovalList } from "@/components/molecules/commons";

const breadcrumbs = [
  { name: "Menu", path: "/dashboard" },
  { name: "PAT", path: "/pat" },
  { name: "Overview", path: "/pat/approval" },
];

const index = () => {
  const [queue, setQueue] = useState([]);
  const [totalApproved, setTotalApproved] = useState({});
  const [history, setHistory] = useState([]);
  const { approvalList } = useApproval();
  const { approvalHistory } = useApprovalHistory(1, 5);
  useEffect(() => {
    if (approvalList != undefined) {
      setQueue(approvalList.data.body);
      setTotalApproved(approvalList.data.header);
    }
  }, [approvalList]);
  useEffect(() => {
    if (approvalHistory != undefined) {
      setHistory(approvalHistory.data.logPAT.data);
    }
  }, [approvalHistory]);
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
              <CardApprovalQueue data={queue} />
            </div>
            <div>
              <CardApprovalHistory data={history} />
            </div>
          </div>
          <div className="flex-initial w-[260px] px-16">
            <div>
              <CardApprovalList data={totalApproved} />
            </div>
            <div>
              <Button appearance="primary">Tampilkan Filter</Button>
            </div>
          </div>
        </div>
      </div>
    </PatOverviewLayout>
  );
};

export default index;

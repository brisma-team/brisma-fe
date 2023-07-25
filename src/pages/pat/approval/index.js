import React from "react";
import { PatOverviewLayout } from "@/layouts/pat";

import { Breadcrumbs } from "@/components/atoms";
import {
  CardApprovalList,
  CardApprovalQueue,
  CardApprovalHistory,
} from "@/components/molecules/pat";
import Button from "@atlaskit/button";

const breadcrumbs = [
  { name: "Menu", path: "/dashboard" },
  { name: "PAT", path: "/pat" },
  { name: "Overview", path: "/pat/approval" },
];

const index = () => {
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
              <CardApprovalQueue />
            </div>
            <div>
              <CardApprovalHistory />
            </div>
          </div>
          <div className="flex-initial w-[260px] px-16">
            <div>
              <CardApprovalList />
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

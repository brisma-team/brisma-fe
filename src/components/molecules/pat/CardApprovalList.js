import { Card } from "@/components/atoms";
const CardApprovalList = ({ data }) => {
  return (
    <div>
      <div className="w-full">
        <Card>
          <p className="text-3xl font-semibold">{data && data.newApproval}</p>
          <p className="text-atlasian-purple text-base font-semibold -mt-1">
            New
          </p>
        </Card>
      </div>
      <div className=" w-full my-3">
        <Card>
          <p className="text-3xl font-semibold">{data && data.totalReject}</p>
          <p className="text-atlasian-green text-base font-semibold -mt-1">
            Reject
          </p>
        </Card>
      </div>
      <div className="w-full my-3">
        <Card>
          <p className="text-3xl font-semibold">{data && data.totalApprove}</p>
          <p className="text-atlasian-red text-base font-semibold -mt-1">
            Approve
          </p>
        </Card>
      </div>
    </div>
  );
};

export default CardApprovalList;

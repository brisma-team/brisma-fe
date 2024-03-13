import { Card } from "@/components/atoms";
import { IconSuccess } from "@/components/icons";

const SuccessCheckInAttendance = () => {
  return (
    <div className="w-full flex items-center justify-center p">
      <div className="py-6">
        <Card>
          <div className="flex gap-2 px-4 py-1">
            <div className="text-atlasian-green">
              <IconSuccess size="large" />
            </div>
            <div className="font-bold text-xl text-atlasian-green">
              ANDA BERHASIL LOGIN
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SuccessCheckInAttendance;

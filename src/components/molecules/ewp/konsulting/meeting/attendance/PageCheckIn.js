import { ImageBrisma } from "@/helpers/imagesUrl";
import { BlankLayout } from "@/layouts";
import Image from "next/image";
import SuccessCheckInAttendance from "./SuccessCheckInAttendance";
import CheckInAttendance from "./CheckInAttendance";

const PageCheckIn = ({
  isLoading,
  isSuccessCheckIn,
  meetingDetail,
  meetingCode,
  payload,
  validation,
  handleSubmitLogin,
  handleChangePayload,
}) => {
  return (
    <BlankLayout>
      <div className="h-screen w-screen flex justify-center items-center">
        <div
          className="rounded flex flex-col items-center border-slate-700 w-[46rem]"
          style={{
            borderRadius: "10px",
            boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
          }}
        >
          <div className="border-b-2 w-full flex px-6 py-4">
            <div className="w-56">
              <Image src={ImageBrisma} alt="" />
            </div>
          </div>
          {isSuccessCheckIn ? (
            <SuccessCheckInAttendance />
          ) : (
            <CheckInAttendance
              isLoading={isLoading}
              meetingCode={meetingCode}
              meetingDetail={meetingDetail}
              payload={payload}
              validation={validation}
              handleSubmitLogin={handleSubmitLogin}
              handleChangePayload={handleChangePayload}
            />
          )}
        </div>
      </div>
    </BlankLayout>
  );
};

export default PageCheckIn;

import {
  CheckInAttendance,
  SuccessCheckInAttendance,
} from "@/components/molecules/ewp/konvensional/entrance/attendance";
import { convertDate } from "@/helpers";
import { ImageBrisma } from "@/helpers/imagesUrl";
import { BlankLayout } from "@/layouts";
import Image from "next/image";
import { useState } from "react";

const index = () => {
  const [isSuccessCheckIn, setIsSuccessCheckIn] = useState(false);
  const convertProgressAndPercent = (status) => {
    let progress, percent;
    switch (status) {
      case "mapa":
        progress = 0.14;
        percent = "14%";
        break;
      case "entrance":
        progress = 0.28;
        percent = "28%";
        break;
      case "pelaksanaan":
        progress = 0.42;
        percent = "42%";
        break;
      case "exit":
        progress = 0.56;
        percent = "56%";
        break;
      case "penyusunan LHA":
        progress = 0.7;
        percent = "70%";
        break;
      case "dokumen":
        progress = 0.85;
        percent = "85%";
        break;
      case "final":
        progress = 1;
        percent = "100%";
        break;
    }
    return { progress, percent };
  };

  const data = {
    id: "1",
    jenis: "Tematik",
    projectId: "TEST-123",
    projectName: "NOXUS BRISMA JAYA JAYA",
    period: `${convertDate("2023-10-10", "-", "d")} s/d ${convertDate(
      "2023-10-12",
      "-",
      "d"
    )}`,
    progress: convertProgressAndPercent("mapa").progress,
    percent: convertProgressAndPercent("mapa").percent,
    ma: [{ nama: "Annisa" }],
    kta: [{ nama: "Dandy" }],
    ata: [{ nama: "Putra" }],
    documentStatus: "MAPA",
    approvalStatus: `On 123`,
    addendum: "0",
    needApproval: false,
    href: `#`,
  };

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
            <CheckInAttendance data={data} />
          )}
        </div>
      </div>
    </BlankLayout>
  );
};

export default index;

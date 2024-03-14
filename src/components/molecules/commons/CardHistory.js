import React from "react";
import { Card } from "@/components/atoms";
import PopupHistory from "./PopupHistory";

// const sampleData = [
//   {
//     id: 1,
//     date: "14/02/2024",
//     subject: "283318 - Justing Westernvelt",
//     description: "Membuat Dokumen",
//   },
// ];
const CardHistory = ({ className, title, data }) => {
  return (
    <div className={className}>
      <div className="no-underline hover:no-underline w-56">
        <Card>
          <div className="w-full px-3 py-1">
            <div className="flex justify-between">
              <p className="text-brisma font-bold text-xl mb-2">
                {title || "Riwayat"}
              </p>
              <PopupHistory />
            </div>
            {data?.length > 0
              ? data?.map((val, i) => (
                  <div className={`space-y-0 ${i !== 0 ? "mt-4" : ""}`} key={i}>
                    <p className="text-brisma text-sm font-semibold">
                      {val?.date}
                    </p>
                    <p className="text-xs">{val?.subject}</p>
                    <p className="text-xs">{val?.description}</p>
                  </div>
                ))
              : ""}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CardHistory;

import React from "react";
import { Card } from "@/components/atoms";

const sampleData = [
  {
    id: 1,
    date: "14/02/2024",
    subject: "283318 - Justing Westernvelt",
    description: "Membuat Dokumen",
  },
];
const CardHistory = ({ className, title, data = sampleData }) => {
  return (
    <div className={className}>
      <div className="no-underline hover:no-underline w-56">
        <div>
          <Card>
            <div className="w-full">
              <div className="px-3">
                <p className="text-brisma font-bold text-xl mb-4">
                  {title || "Riwayat"}
                </p>
                {data?.length > 0 ? (
                  data?.map((val, i) => (
                    <div
                      className={`space-y-0 ${i !== 0 ? "mt-4" : ""}`}
                      key={i}
                    >
                      <p className="text-brisma text-sm font-semibold">
                        {val?.date}
                      </p>
                      <p className="text-xs">{val?.subject}</p>
                      <p className="text-xs">{val?.description}</p>
                    </div>
                  ))
                ) : (
                  <p>No data</p>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CardHistory;

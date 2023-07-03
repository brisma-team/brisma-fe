import React from "react";
import Link from "next/link";

const CardLanding = ({ title, description, status, url }) => {
  return (
    <div className="h-44 border rounded-[10px] bg-white hover:bg-gray-100 m-3">
      <Link href={url ? url : "#"} style={{ textDecoration: "none" }}>
        <div className="p-6">
          <h5 className="mb-2 text-base font-bold text-brisma">
            {title ? title : "No title"}
          </h5>
          <p className="mb-4 text-sm text-atlasian-gray-dark">
            {description ? description : "No description"}
          </p>
        </div>
        <div
          className={`rounded-b-[10px] px-6 pt-4 pb-5 text-center ${
            status == "success"
              ? "bg-[#E0FAD6] text-black"
              : status == "failed"
              ? "bg-[#FA7F7F] text-white"
              : ""
          } `}
        >
          {status == "success"
            ? "Sudah Dikerjakan"
            : status == "failed"
            ? "Belum Dikerjakan"
            : ""}
        </div>
      </Link>
    </div>
  );
};

export default CardLanding;

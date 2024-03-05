import React from "react";
import Link from "next/link";

const CardLanding = ({ title, description, status, url }) => {
  return (
    <Link
      className="my-2 flex flex-col justify-between h-full border rounded-[10px] bg-white hover:bg-gray-100 hover:no-underline"
      href={url || "#"}
    >
      <div className="px-6 py-4 h-full">
        <h5 className="mb-2 text-base font-bold text-blue-700">
          {title ? title : "No title"}
        </h5>
        <p className="text-sm text-atlasian-gray-dark">
          {description ? description : "No description"}
        </p>
      </div>
      {status && (
        <div
          className={`rounded-b-lg text-center py-3 ${
            status == "success"
              ? "bg-[#E0FAD6] text-black"
              : "bg-[#FA7F7F] text-white"
          } `}
        >
          {status == "success"
            ? "Sudah Dikerjakan"
            : status == "failed"
            ? "Belum Dikerjakan"
            : ""}
        </div>
      )}
    </Link>
  );
};

export default CardLanding;

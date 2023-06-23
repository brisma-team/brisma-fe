import React from "react";
import { PatLayout } from "@/layouts/pat";
import { CardDashboard } from "@/components";

export default function index() {
  const data = {
    title: "Perancangan Audit Tahunan",
    content: [
      {
        subtitle: "PAT",
        subcontent: [
          {
            title: "AUDITOR",
            description: "Penyusunan perencanaan tahunan kegiatan audit.",
            url: "/pat/projects",
          },
          {
            title: "APPROVAL",
            description: "Pelacakan flow approval project PAT.",
            url: "/approval",
          },
        ],
      },
    ],
  };
  return (
    <PatLayout>
      <CardDashboard data={data} />
    </PatLayout>
  );
}

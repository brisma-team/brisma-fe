import React from "react";
import { MainLayout } from "@/layouts";
import { CardDashboard } from "@/components/molecules/commons";

const index = () => {
  const data = {
    title: "Electronic Working Papers",
    content: [
      {
        subtitle: "E.W.P Konvensional",
        subcontent: [
          {
            title: "REGULAR",
            description:
              "Pengerjaan EWP Regular, Non-PAT, Quality Assurance, Monitoring Offsite, Supervisi, CSS, Peer Review,Tematik dan Special.",
            url: "/ewp/projects/konvensional",
          },
          {
            title: "APPROVAL",
            description: "Pelacakan flow approval proyek EWP.",
            url: "#",
          },
        ],
      },
      {
        subtitle: "E.W.P Agile",
        subcontent: [
          {
            title: "AGILE AUDIT",
            description: "Pengerjaan EWP Metode Agile.",
            url: "#",
            isDisabled: true,
          },
          {
            title: "QUALITY ASSURANCE",
            description: "Pengerjaan EWP Quality Assurance.",
            url: "#",
            isDisabled: true,
          },
          {
            title: "APPROVAL",
            description: "Pelacakan flow approval proyek EWP.",
            url: "#",
            isDisabled: true,
          },
        ],
      },
      {
        subtitle: "E.W.P Kegiatan",
        subcontent: [
          {
            title: "KONSULTING",
            description: "Pengerjaan EWP Konsulting.",
            url: "/ewp/konsulting/overview",
          },
          {
            title: "MONITORING OFFSITE",
            description: "Pengerjaan EWP Monitoring Offsite.",
            url: "#",
            isDisabled: true,
          },
          {
            title: "APPROVAL",
            description: "Pelacakan flow approval proyek EWP.",
            url: "#",
          },
        ],
      },
    ],
    // content: [
    //   {
    //     subtitle: "E.W.P Konvensional Audit",
    //     subcontent: [
    //       {
    //         title: "AUDITOR",
    //         description:
    //           "Pengerjaan EWP Regular, Non-PAT, Quality Assurance, Monitoring Offsite, Supervisi, CSS, Peer Review,Tematik dan Special.",
    //         url: "/ewp/projects/konvensional",
    //       },
    //       {
    //         title: "APPROVAL",
    //         description: "Pelacakan flow approval proyek EWP.",
    //         url: "#",
    //       },
    //     ],
    //   },
    //   {
    //     subtitle: "E.W.P Agile Audit",
    //     subcontent: [
    //       {
    //         title: "AUDITOR",
    //         description: "Pengerjaan EWP Agile.",
    //         url: "#",
    //       },
    //       {
    //         title: "APPROVAL",
    //         description: "Pelacakan flow approval proyek EWP.",
    //         url: "#",
    //       },
    //     ],
    //   },
    //   {
    //     subtitle: "E.W.P Kegiatan",
    //     subcontent: [
    //       {
    //         title: "AUDITOR",
    //         description: "Pengerjaan EWP Agile.",
    //         url: "#",
    //       },
    //       {
    //         title: "APPROVAL",
    //         description: "Pelacakan flow approval proyek EWP.",
    //         url: "#",
    //       },
    //     ],
    //   },
    // ],
  };
  return (
    <MainLayout>
      <CardDashboard data={data} />
    </MainLayout>
  );
};

export default index;

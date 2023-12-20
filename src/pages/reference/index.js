import React from "react";
import { MainLayout } from "@/layouts";
import { CardDashboard } from "@/components/molecules/commons";

const index = () => {
  const data = {
    title: "Reference Menu",
    content: [
      {
        subtitle: "Manajemen Pengguna",
        subcontent: [
          {
            title: "USER S.K.A.I",
            description: "Pengaturan user pengguna aplikasi.",
            url: "/reference/users/skai",
          },
          // {
          //   title: "Pengganti Sementara (PgS)",
          //   description: "Pengaturan user pengganti sementara.",
          //   url: "#",
          // },
        ],
      },
      // {
      //   subtitle: "Manajemen Unit Kerja Audit",
      //   subcontent: [
      //     {
      //       title: "Data Master U.K.A",
      //       description: "Pengaturan data master unit kerja audit.",
      //       url: "#",
      //     },
      //   ],
      // },
      // {
      //   subtitle: "Manajemen Pusat Data Elektronik",
      //   subcontent: [
      //     {
      //       title: "P.D.E",
      //       description: "Pengaturan data P.D.E.",
      //       url: "#",
      //     },
      //     {
      //       title: "P.D.E Connection",
      //       description: "Pengaturan koneksi data P.D.E.",
      //       url: "#",
      //     },
      //   ],
      // },
      // {
      //   subtitle: "Manajemen Master Data",
      //   subcontent: [
      //     {
      //       title: "Master Data",
      //       description: "Pengaturan master data.",
      //       url: "#",
      //     },
      //     {
      //       title: "Upload dan Download Master Data",
      //       description: "Pengaturan lanjutan master data.",
      //       url: "#",
      //     },
      //     {
      //       title: "Approval Master Data",
      //       description: "Pengaturan persetujuan master data.",
      //       url: "#",
      //     },
      //   ],
      // },
      // {
      //   subtitle: "Manajemen Perencanaan Audit",
      //   subcontent: [
      //     {
      //       title: "Create P.A.T Project",
      //       description: "Pengaturan pembuatan project PAT pertahun.",
      //       url: "#",
      //     },
      //   ],
      // },
      {
        subtitle: "Manajemen Dashboard",
        subcontent: [
          {
            title: "Kelola Dashboard",
            description: "Pengaturan untuk Mengelola Dashboard.",
            url: "/reference/manage-dashboard",
            isBlank: true,
          },
          {
            title: "Aktivasi Dashboard Visual",
            description: "Pengaturan untuk Aktivasi Dashboard Visual.",
            url: "/reference/active-dashboard-visual",
          },
          {
            title: "Aktivasi Dashboard Reporting",
            description: "Pengaturan untuk Aktivasi Dashboard Reporting.",
            url: "/reference/active-dashboard-report",
          },
        ],
      },
      {
        subtitle: "Admin Survei",
        subcontent: [
          {
            title: "Template Survei",
            description: "Pengaturan template Survei.",
            url: "/reference/survey/overview",
          },
          {
            title: "Approval",
            description: "Melihat riwayat approval.",
            url: "/reference/survey/approval",
          },
        ],
      },
    ],
  };
  return (
    <MainLayout>
      <CardDashboard data={data} />
    </MainLayout>
  );
};

export default index;

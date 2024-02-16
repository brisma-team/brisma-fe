import { Breadcrumbs, Card, PageTitle } from "@/components/atoms";
import { LogTable } from "@/components/molecules/ewp/konsulting/log";

import { LandingLayoutEWPConsulting } from "@/layouts/ewp";
// import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const index = () => {
  //   const { id } = useRouter().query;

  const [dataTables, setDataTables] = useState([]);

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "EWP", path: "/ewp" },
    // {
    //   name: `${auditorEWP?.data?.project_info?.project_id} / Info`,
    //   path: `/ewp/projects/konvensional/${id}/info`,
    // },
  ];

  useEffect(() => {
    setDataTables([
      {
        tanggal: "02-20-2023",
        pnNama: "M. Firly Ismail",
        subModul: "Perencanaan",
        aktifitas: "Berhasil membuat Tim.",
      },
      {
        tanggal: "02-21-2023",
        pnNama: "M. Firly Ismail",
        subModul: "Perencanaan",
        aktifitas: "Berhasil mengisi Sumber Informasi.",
      },
      {
        tanggal: "02-22-2023",
        pnNama: "M. Firly Ismail",
        subModul: "Perencanaan",
        aktifitas: "Berhasil mengisi Anggaran.",
      },
      {
        tanggal: "02-23-2023",
        pnNama: "M. Firly Ismail",
        subModul: "Perencanaan",
        aktifitas: "Berhasil mengisi Program Kerja.",
      },
      {
        tanggal: "02-24-2023",
        pnNama: "M. Firly Ismail",
        subModul: "Perencanaan",
        aktifitas: "Berhasil generate Dokumen Perencanaan.",
      },
      {
        tanggal: "02-24-2023",
        pnNama: "M. Firly Ismail",
        subModul: "Analisa",
        aktifitas: "Berhasil mengisi Analisa Data.",
      },
      {
        tanggal: "02-24-2023",
        pnNama: "M. Firly Ismail",
        subModul: "Analisa",
        aktifitas: "Berhasil mengisi Resume.",
      },
      {
        tanggal: "02-24-2023",
        pnNama: "M. Firly Ismail",
        subModul: "Analisa",
        aktifitas: "Berhasil mengisi Hasil Analisa.",
      },
    ]);
  }, []);

  return (
    <LandingLayoutEWPConsulting>
      <div className="w-[71.5rem]">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        <PageTitle text="Project Logs" />
        <div className="mt-7">
          <Card>
            <div className="px-6 pt-1 pb-3 w-full">
              <LogTable data={dataTables} />
            </div>
          </Card>
        </div>
      </div>
    </LandingLayoutEWPConsulting>
  );
};

export default index;

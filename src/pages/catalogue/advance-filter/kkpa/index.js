import { useEffect, useState } from "react";
import Link from "next/link";
import { MainLayout } from "@/layouts";
import { Breadcrumbs, Card, TableField } from "@/components/atoms";
import { IconArrowRight } from "@/components/icons";
import Button from "@atlaskit/button";
import useCatalogPAT from "@/data/catalog/useCatalogPAT";

const index = () => {
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "Advance Filter KKPA", path: "/catalogue/advance-filter/kkpa" },
  ];

  const { data } = useCatalogPAT();

  const [catPat, setCatPat] = useState([]);
  useEffect(() => {
    if (data != undefined) {
      const mappingCatPat = data?.data.map((v, key) => {
        return {
          No: key + 1,
          "Nama Project": v?.project_name,
          "Kantor Audit":
            v?.audit_office.uka_kode + " - " + v?.audit_office.uka_name,
          "Tahun Audit": v?.audit_year,
          "Tim Audit": v?.audit_team.map((d, key) => {
            return (
              <div key={key} className="flex justify-between">
                <p className="mr-2">{d.name}</p>
              </div>
            );
          }),
          "Addendum Ke": "Fase ke - " + v?.addendum_phase,
          Aksi: (
            <div className="rounded-full overflow-hidden border-2 border-atlasian-blue-light w-7 h-7 pt-0.5 mx-auto active:bg-slate-100">
              <Link href={"/catalogue/pat/" + v?._id} prefetch={false}>
                <Button
                  shouldFitContainer
                  iconBefore={
                    <IconArrowRight primaryColor="#0051CB" size="medium" />
                  }
                  className="bottom-1.5"
                />
              </Link>
            </div>
          ),
        };
      });
      setCatPat(mappingCatPat);
    }
  }, [data]);

  return (
    <MainLayout>
      <div className="px-5">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-3xl font-bold">Cari KKPA</div>
        </div>

        <div className="mt-5 mr-40">
          <Card>
            <div className="w-full h-full px-6">
              <div className="text-xl font-bold p-5">Pustaka Dokumen KKPA</div>
              <div className="max-h-[29rem] overflow-y-scroll px-2 mb-5">
                <TableField
                  headers={[
                    "No",
                    "Nama Project",
                    "Kantor Audit",
                    "Tahun Audit",
                    "Tim Audit",
                    "Addendum Ke",
                    "Aksi",
                  ]}
                  columnWidths={["5%", "23%", "20%", "15%", "18%", "12%", "7%"]}
                  items={catPat}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default index;

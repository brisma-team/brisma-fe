import { useEffect, useState } from "react";
import Link from "next/link";
import { MainLayout } from "@/layouts";
import { Breadcrumbs, ButtonField, Card, TableField } from "@/components/atoms";
import { IconArrowRight } from "@/components/icons";
import Button from "@atlaskit/button";
import useCatalogPAT from "@/data/catalog/useCatalogPAT";

const index = () => {
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Catalogue", path: "/catalogue" },
    {
      name: "Pencarian Dokumen KKPT",
      path: "/catalogue/advance-filter/kkpt",
    },
  ];

  const { data } = useCatalogPAT();

  const [catPat, setCatPat] = useState([]);
  const few = [
    {
      "Nama Kolom": "Judul KKPT",
      "Tipe Data": "String",
    },
    {
      "Nama Kolom": "Fase Addendum",
      "Tipe Data": "String",
    },
  ];
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
              <Link
                href={"/catalogue/advance-filter/kkpt/" + v?._id}
                prefetch={false}
              >
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
          <div className="text-3xl font-bold">Pencarian Dokumen KKPT</div>
        </div>
        <div className="mt-5 mr-40 grid grid-cols-4 mb-20">
          <div className="col-span-1">
            <div className="mb-2 text-lg">
              <div className="pt-4 font-bold">Kolom Pilihan</div>
            </div>
            <Card>
              <div className="w-full h-full px-2">
                <div className="max-h-[29rem] overflow-y-scroll px-2 mb-5">
                  <TableField
                    headers={["Nama Kolom", "Tipe Data"]}
                    columnWidths={["55%", "45%"]}
                    items={few}
                  />
                </div>
              </div>
            </Card>
          </div>
          <div className="col-span-3 ml-4">
            <div className="flex justify-between mb-2 text-lg">
              <div className="pt-4 font-bold">Kolom Pencarian</div>
              <div>
                <div className="bg-green-500 shadow rounded-md">
                  <ButtonField text={"Eksekusi"} />
                </div>
              </div>
            </div>
            <textarea
              rows={10}
              placeholder="Masukkan batasan data yang diperlukan..."
              className="p-6 w-full h-full rounded-lg border-[1.5px] border-[#83606025]"
              style={{ boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.20)" }}
            ></textarea>
          </div>
        </div>
        <div className="mt-5 mr-40">
          <Card>
            <div className="w-full h-full px-6">
              <div className="text-xl font-bold p-5">Pustaka Dokumen KKPT</div>
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

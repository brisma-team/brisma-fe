import { useState, useEffect } from "react";
import Link from "next/link";
import { MainLayout } from "@/layouts";
import { Breadcrumbs, Card, TableField } from "@/components/atoms";
import Button from "@atlaskit/button";
import { IconArrowRight, IconClose, IconPlus } from "@/components/icons";
import Select from "@atlaskit/select";
import Textfield from "@atlaskit/textfield";

const approvalData = [
  {
    id: 1,
    project_name: "EWP AIW Pangkal Pinang",
    audit_office: "RAO Pangkal Pinang",
    audit_type: "Special",
    audit_year: "2023",
    quarter: "1",
    date: "24/06/2023 - 23/07/2023",
    audit_object: "Divisi Investasi",
    addendum_phase: "0",
  },
  {
    id: 2,
    project_name: "EWP AIW Surabaya",
    audit_office: "RAO Surabaya",
    audit_type: "Special",
    audit_year: "2023",
    quarter: "1",
    date: "27/06/2023 - 29/07/2023",
    audit_object: "Divisi Investasi",
    addendum_phase: "0",
  },
  {
    id: 3,
    project_name: "EWP AIW Jayapura",
    audit_office: "RAO Jayapura",
    audit_type: "Reguler",
    audit_year: "2023",
    quarter: "1",
    date: "10/07/2023 - 12/08/2023",
    audit_object: "Divisi Investasi",
    addendum_phase: "0",
  },
  {
    id: 4,
    project_name: "EWP AIW Palembang",
    audit_office: "RAO Palembang",
    audit_type: "Reguler",
    audit_year: "2023",
    quarter: "1",
    date: "14/08/2023 - 16/09/2023",
    audit_object: "Divisi Investasi",
    addendum_phase: "0",
  },
];
const index = ({ data = approvalData }) => {
  const [showFilter, setShowFilter] = useState(false);
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "E.W.P", path: "/catalogue/ewp" },
  ];
  const [catEwp, setCatEwp] = useState([]);
  useEffect(() => {
    const mappingCatEwp = data?.map((v) => {
      return {
        No: v?.id,
        "Nama Project": v?.project_name,
        "Kantor Audit": v?.audit_office,
        "Jenis Audit": v?.audit_type,
        "Periode Audit": "Triwulan " + v?.quarter + " - " + v?.audit_year,
        "Object Audit": v?.audit_object,
        "Addendum Ke": "Fase ke - " + v?.addendum_phase,
        Aksi: (
          <div className="rounded-full overflow-hidden border-2 border-atlasian-blue-light w-7 h-7 pt-0.5 mx-auto active:bg-slate-100">
            <Link href={"/catalogue/ewp/" + v.id} prefetch={true}>
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
    setCatEwp(mappingCatEwp);
  }, []);
  return (
    <MainLayout>
      <div className="px-5">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1">
            <div className="text-3xl font-bold">Catalogue E.W.P</div>
          </div>
        </div>
        {/* Start Filter */}
        <div className="my-3 w-40">
          <Button
            appearance="primary"
            iconBefore={IconPlus}
            shouldFitContainer
            onClick={() => setShowFilter(!showFilter)}
          >
            Tampilkan Filter
          </Button>
        </div>
        {showFilter && (
          <div className="flex justify-between w-96">
            <Card>
              <div className="flex p-2">
                <div className="w-1/2 mr-1">
                  <Textfield
                    placeholder="ID Proyek"
                    elemAfterInput={
                      <button className="justify-center">
                        <IconClose size="large" />
                      </button>
                    }
                  />
                </div>
                <div className="w-1/2 ml-1">
                  <Select options={[]} placeholder="Status Dokumen" />
                </div>
              </div>
              <div className="flex p-2">
                <div className="w-1/2 mr-1">
                  <Textfield
                    placeholder="Nama Proyek"
                    elemAfterInput={
                      <button className="justify-center">
                        <IconClose size="large" />
                      </button>
                    }
                  />
                </div>
                <div className="w-1/2 ml-1">
                  <Select options={[]} placeholder="Status Persetujuan" />
                </div>
              </div>
            </Card>
          </div>
        )}
        {/* End Filter */}

        <div className="mt-5 mr-40">
          <Card>
            <div className="w-full h-full px-6">
              <div className="text-xl font-bold p-5">Pustaka Dokumen</div>
              <div className="max-h-[29rem] overflow-y-scroll px-2 mb-5">
                <TableField
                  headers={[
                    "No",
                    "Nama Project",
                    "Kantor Audit",
                    "Jenis Audit",
                    "Periode Audit",
                    "Object Audit",
                    "Addendum Ke",
                    "Aksi",
                  ]}
                  columnWidths={[
                    "5%",
                    "18%",
                    "15%",
                    "10%",
                    "15%",
                    "18%",
                    "12%",
                    "7%",
                  ]}
                  items={catEwp}
                />
              </div>
              {/* <div className="flex justify-center mt-5">
                <Pagination totalPages={3} setCurrentPage={setCurrentPage} />
              </div> */}
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default index;

import { Breadcrumbs, Card, PageTitle, TableField } from "@/components/atoms";
import {
  CardTypeCount,
  PrevNextNavigation,
} from "@/components/molecules/commons";
import { PatLandingLayout } from "@/layouts/pat";
import { useEffect } from "react";
import { useAuditTarget, useStatusPat } from "@/data/pat";
import { useState } from "react";
import { useRouter } from "next/router";

const routes = [
  {
    name: "Latar Belakang",
    slug: "latar-belakang",
  },
  { name: "Tujuan", slug: "tujuan" },
  { name: "Sumber Informasi", slug: "sumber-informasi" },
  { name: "Tim Audit", slug: "tim-audit" },
  { name: "Target Audit", slug: "ringkasan-objek-audit" },
  { name: "Jadwal Audit", slug: "jadwal-audit" },
  { name: "Jadwal Kegiatan", slug: "jadwal-kegiatan" },
];

const index = () => {
  const { id } = useRouter().query;
  const baseUrl = `/pat/projects/${id}`;
  const { statusPat } = useStatusPat(id);
  const { auditTarget } = useAuditTarget(id);
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "PAT", path: "/pat" },
    { name: "Overview", path: "/pat/projects" },
    { name: statusPat?.data?.pat_name, path: `/pat/projects/${id}` },
    {
      name: "Ringkasan Objek Audit",
      path: `/pat/projects/${id}/ringkasan-objek-audit`,
    },
  ];

  const [content, setContent] = useState([]);
  const [uker, setUker] = useState([]);
  const [echannel, setEchannel] = useState([]);

  useEffect(() => {
    const objTargetAudit = auditTarget?.data.target_audit;
    const objEchannel = auditTarget?.data.target_audit;

    if (objTargetAudit?.length > 0) {
      const mappingUker = objTargetAudit?.map((v) => {
        if (!parseInt(v?.existing)) {
          return {
            "Tipe Uker": v?.name,
            "Uker Eksisting": "0",
            "Uker Audit": "0",
            Presentase: "0%",
          };
        } else {
          return {
            "Objek Audit": v?.name,
            "Uker Eksisting": v?.existing.toString(),
            "Uker Audit": v?.target.toString(),
            Presentase: `${(
              (parseInt(v?.target) / parseInt(v?.existing)) *
              100
            ).toString()}%`,
          };
        }
      });
      setUker(mappingUker);
    }

    if (objEchannel?.length > 0) {
      const mappingEchannel = objEchannel?.map((v) => {
        if (!parseInt(v?.existing)) {
          return {
            "Tipe E-Channel": v?.name,
            Eksisting: "0",
            Audit: "0",
            Presentase: "0%",
          };
        } else {
          return {
            "Tipe E-Channel": v?.name,
            Eksisting: v?.existing.toString(),
            Audit: v?.target.toString(),
            Presentase: `${(
              (parseInt(v?.target) / parseInt(v?.existing)) *
              100
            ).toString()}%`,
          };
        }
      });
      setEchannel(mappingEchannel);
    }
  }, [auditTarget]);

  useEffect(() => {
    setContent([
      { title: "Riwayat Addendum", value: statusPat?.data?.riwayat_adendum },
      { title: "Status Approver", value: statusPat?.data?.status_approver },
      { title: "Status PAT", value: statusPat?.data?.status_pat },
    ]);
  }, [statusPat]);

  return (
    <PatLandingLayout data={statusPat} content={content}>
      <div className="pr-44">
        <Breadcrumbs data={breadcrumbs} />
        <div className="flex justify-between items-center mb-6">
          <PageTitle text={"Ringkasan Objek Audit"} />
          <PrevNextNavigation baseUrl={baseUrl} routes={routes} />
        </div>
        <div className="flex justify-end items-end gap-2">
          <CardTypeCount
            title={"REGULER"}
            total={2}
            percent={75}
            width={"w-[12.8rem]"}
          />
          <CardTypeCount
            title={"SPECIAL"}
            total={1}
            percent={25}
            width={"w-[12.8rem]"}
          />
          <CardTypeCount
            title={"TEMATIK"}
            total={1}
            percent={25}
            width={"w-[12.8rem]"}
          />
          <CardTypeCount
            title={"KONSULTING"}
            total={1}
            percent={25}
            width={"w-[12.8rem]"}
          />

          <CardTypeCount
            title={"LAIN-LAIN"}
            total={1}
            percent={25}
            width={"w-[12.8rem]"}
          />
        </div>
        {/* Start Content */}
        <div className="flex gap-3 mt-6">
          <div className="w-[52rem] -my-3">
            <div className="h-[35rem] my-3">
              <Card>
                <div className="w-full h-full px-6">
                  <div className="text-xl font-bold p-2">Unit Kerja Audit</div>
                  <div className="mt-6 max-h-[29rem] overflow-y-scroll px-2">
                    <TableField
                      headers={[
                        "Tipe Uker",
                        "Uker Eksisting",
                        "Uker Audit",
                        "Presentase",
                      ]}
                      columnWidths={["40%", "20%", "20%", "20%"]}
                      items={uker}
                    />
                  </div>
                </div>
              </Card>
            </div>
            <div className="h-[5rem] my-3">
              <Card>
                <div className="w-full h-full px-6 flex items-center">
                  <div className="w-full h-[3.125rem] flex text-lg border-y border-[#DFE1E6]">
                    <div className="w-2/5 ml-8 font-black flex items-center">
                      Total
                    </div>
                    <div className="w-1/5 ml-2 font-semibold flex items-center text-atlasian-green">
                      100
                    </div>
                    <div className="w-1/5 ml-2 font-semibold flex items-center text-atlasian-yellow">
                      25
                    </div>
                    <div className="w-1/5 ml-2 font-semibold flex items-center text-atlasian-dark">
                      25%
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          <div className="w-[37rem] -my-3">
            <div className="h-[16.5rem] my-3">
              <Card>
                <div className="w-full h-full px-6">
                  <div className="text-xl font-bold p-2">E-Channel Audit</div>
                  <div className="mt-6 max-h-[10.5rem] overflow-y-scroll px-2">
                    <TableField
                      headers={[
                        "Tipe E-Channel",
                        "Eksisting",
                        "Audit",
                        "Presentase",
                      ]}
                      columnWidths={["40%", "20%", "20%", "20%"]}
                      items={echannel}
                    />
                  </div>
                </div>
              </Card>
            </div>
            <div className="h-[5rem] my-3">
              <Card>
                <div className="w-full h-full px-6 flex items-center">
                  <div className="w-full h-[3.125rem] flex text-base border-y border-[#DFE1E6]">
                    <div className="w-2/5 ml-8 font-black flex items-center">
                      Total
                    </div>
                    <div className="w-1/5 ml-2 font-semibold flex items-center text-atlasian-green">
                      100
                    </div>
                    <div className="w-1/5 ml-2 font-semibold flex items-center text-atlasian-yellow">
                      25
                    </div>
                    <div className="w-1/5 ml-2 font-semibold flex items-center text-atlasian-dark">
                      25%
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
        {/* End Content */}
      </div>
    </PatLandingLayout>
  );
};

export default index;

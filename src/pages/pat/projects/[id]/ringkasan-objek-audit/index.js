import {
  Breadcrumbs,
  Card,
  PageTitle,
  TableField,
} from "@/components/atoms";
import { PrevNextNavigation } from "@/components/molecules/commons";
import { PatLandingLayout } from "@/layouts/pat";
import { useEffect, useState } from "react";
import { useAuditTarget, useStatusPat } from "@/data/pat";
import { useRouter } from "next/router";
import { convertDate } from "@/helpers";

const routes = [
  {
    name: "Latar Belakang dan Tujuan",
    slug: "latar-belakang-dan-tujuan",
  },
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

  const [totalUker, setTotalUker] = useState({
    existing: "0",
    target: "0",
    presentase: "0%",
  });
  const [totalEchannel, setTotalEchannel] = useState({
    existing: "0",
    target: "0",
    presentase: "0%",
  });

  useEffect(() => {
    const totalUkerExisting = uker.reduce(
      (total, item) => total + parseInt(item["Uker Eksisting"]),
      0
    );
    const totalUkerAudit = uker.reduce(
      (total, item) => total + parseInt(item["Uker Audit"]),
      0
    );
    const totalUkerPresentase =
      totalUkerExisting !== 0
        ? ((totalUkerAudit / totalUkerExisting) * 100).toFixed(2) + "%"
        : "0%";

    setTotalUker({
      existing: totalUkerExisting.toString(),
      target: totalUkerAudit.toString(),
      presentase: totalUkerPresentase,
    });
  }, [uker]);

  useEffect(() => {
    const totalEchannelExisting = echannel.reduce(
      (total, item) => total + parseInt(item["Eksisting"]),
      0
    );
    const totalEchannelAudit = echannel.reduce(
      (total, item) => total + parseInt(item["Audit"]),
      0
    );
    const totalEchannelPresentase =
      totalEchannelExisting !== 0
        ? ((totalEchannelAudit / totalEchannelExisting) * 100).toFixed(2) + "%"
        : "0%";

    setTotalEchannel({
      existing: totalEchannelExisting.toString(),
      target: totalEchannelAudit.toString(),
      presentase: totalEchannelPresentase,
    });
  }, [echannel]);

  useEffect(() => {
    const objTargetAudit = auditTarget?.data.target_audit;
    const objEchannel = auditTarget?.data.echannel;

    if (objTargetAudit?.length > 0) {
      const mappingUker = objTargetAudit?.map((v) => {
        if (!parseInt(v?.existing)) {
          return {
            "Tipe Uker": v?.name,
            "Uker Eksisting": v?.existing.toString(),
            "Uker Audit": v?.target.toString(),
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
            Eksisting: v?.existing.toString(),
            Audit: v?.target.toString(),
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
      {
				title: "Initiator",
				value: statusPat?.data?.create_by?.nama,
			},
			{
				title: "Created Date",
				value: convertDate(
          statusPat?.data?.lb_created_at,
          "-",
          "d",
          true
        ),
			},
			{ title: "Document Status", value: statusPat?.data?.status_pat },
			{ title: "Document Status", value: statusPat?.data?.status_pat },
    ]);
  }, [statusPat]);

  return (
    <PatLandingLayout data={statusPat?.data} content={content}>
      <Breadcrumbs data={breadcrumbs} />
      <div className="flex justify-between items-center mb-6">
        <PageTitle text={"Ringkasan Objek Audit"} />
        <PrevNextNavigation
          baseUrl={baseUrl}
          routes={routes}
          prevUrl={"/jadwal-lainnya"}
          nextUrl={"/dokumen"}
          widthDropdown={"w-56"}
        />
      </div>
      {/* Start Content */}
      <Card>
        <div className="flex gap-6 p-6">
          <div className="w-[52rem] -my-3">
            <div className="h-[40rem] my-3">
              <Card>
                <div className="w-full h-full px-6">
                  <div className="text-xl font-bold p-2">Unit Kerja Audit</div>
                  <div className="mt-4 max-h-[29rem] overflow-y-scroll border rounded-t-xl">
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
                  <div className="w-full flex items-center my-3">
                    <div className="w-full h-[3.125rem] flex text-lg border border-[#DFE1E6] rounded-b-xl">
                      <div className="w-2/5 ml-8 font-black flex items-center">
                        Total
                      </div>
                      <div className="w-1/5 ml-2 font-semibold flex items-center text-atlasian-green">
                        {totalUker.existing}
                      </div>
                      <div className="w-1/5 ml-2 font-semibold flex items-center text-atlasian-yellow">
                        {totalUker.target}
                      </div>
                      <div className="w-1/5 ml-2 font-semibold flex items-center text-atlasian-dark">
                        {totalUker.presentase}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          <div className="w-[37rem] -my-3 flex flex-col gap-2">
            <div>
              <div className="h-[21rem] my-3">
                <Card>
                  <div className="w-full h-full px-6">
                    <div className="text-xl font-bold p-2">E-Channel Audit</div>
                    <div className="mt-4 max-h-[10.5rem] overflow-y-scroll border rounded-t-xl">
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
                    <div className="w-full flex items-center my-3">
                      <div className="w-full h-[3.125rem] flex text-base border border-[#DFE1E6] rounded-b-xl">
                        <div className="w-2/5 ml-8 font-black flex items-center">
                          Total
                        </div>
                        <div className="w-1/5 ml-2 font-semibold flex items-center text-atlasian-green">
                          {totalEchannel.existing}
                        </div>
                        <div className="w-1/5 ml-2 font-semibold flex items-center text-atlasian-yellow">
                          {totalEchannel.target}
                        </div>
                        <div className="w-1/5 ml-2 font-semibold flex items-center text-atlasian-dark">
                          {totalEchannel.presentase}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </Card>
      {/* End Content */}
    </PatLandingLayout>
  );
};

export default index;

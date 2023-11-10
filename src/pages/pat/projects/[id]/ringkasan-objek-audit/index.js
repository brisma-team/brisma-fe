import {
  Breadcrumbs,
  ButtonIcon,
  Card,
  PageTitle,
  TableField,
} from "@/components/atoms";
import { PrevNextNavigation } from "@/components/molecules/commons";
import { PatLandingLayout } from "@/layouts/pat";
import { useEffect, useState } from "react";
import { useAuditTarget, useStatusPat } from "@/data/pat";
import { useRouter } from "next/router";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import { IconChevronDown, IconChevronRight } from "@/components/icons";

const customCell = `cell-width-full-height-full cell-custom-dataTables`;
const positionCenter = `w-full h-full flex justify-center gap-1 items-center`;

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
  const [summarySchedule, setSummarySchedule] = useState([]);

  const [expansionMap, setExpansionMap] = useState({});
  const [levelMap, setLevelMap] = useState({});

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
    const objSummarySchedule = auditTarget?.data.jadwal_list;

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

    if (objSummarySchedule?.length > 0) {
      const mappingLevel = objSummarySchedule?.map((tipe) => {
        return {
          kode: tipe.kode,
          nama: tipe.nama,
          jumlah: tipe.jumlah_jadwal,
          role: "tipe",
          children: tipe?.children?.length
            ? tipe?.children?.map((jenis) => {
                return {
                  kode: jenis.kode,
                  nama: jenis.nama,
                  jumlah: jenis.jumlah_jadwal,
                  role: "jenis",
                  children: jenis?.children?.length
                    ? jenis?.children?.map((tema) => {
                        return {
                          kode: tema.kode,
                          nama: tema.nama,
                          jumlah: tema.jumlah_jadwal,
                          role: "tema",
                        };
                      })
                    : [],
                };
              })
            : [],
        };
      });
      setSummarySchedule(mappingLevel);
    }
  }, [auditTarget]);

  useEffect(() => {
    const result = generateLevel(summarySchedule);
    setLevelMap(result);
  }, [summarySchedule]);

  useEffect(() => {
    setContent([
      { title: "Riwayat Addendum", value: statusPat?.data?.riwayat_adendum },
      { title: "Status Approver", value: statusPat?.data?.status_approver },
      { title: "Status PAT", value: statusPat?.data?.status_pat },
    ]);
  }, [statusPat]);

  const generateLevel = (data, parentLevel = 0) => {
    const result = {};

    if (Array.isArray(data)) {
      data.forEach((item) => {
        const kodeWithRole = `${item.kode}-${item.role}`;
        result[kodeWithRole] = parentLevel;

        if (item.children && item.children.length > 0) {
          const childLevel = parentLevel + 1;
          const childResult = generateLevel(
            item.children,
            childLevel,
            item.kode
          );

          Object.keys(childResult).forEach((key) => {
            result[key] = childResult[key];
          });
        }
      });
    }

    return result;
  };

  const toggleExpansion = (kode, role) => {
    setExpansionMap((prevState) => ({
      ...prevState,
      [`${kode}-${role}`]: !prevState[`${kode}-${role}`],
    }));
  };

  return (
    <PatLandingLayout data={statusPat} content={content}>
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
            </Card>
          </div>
        </div>
        <div className="w-[37rem] -my-3 flex flex-col gap-2">
          <div>
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
              </Card>
            </div>
          </div>
          <div className="h-fit">
            <Card>
              <div className="px-4 pt-1 pb-3 w-full">
                <p className="ml-2 font-bold text-base">
                  Ringkasan Jadwal Audit
                </p>
                <div className="my-2 " />
                <TableTree>
                  <Headers>
                    <Header className="!hidden" />
                    <Header
                      width="80%"
                      className="border-t border-x rounded-ss-xl cell-custom-dataTables"
                    >
                      <div className="custom-table-header px-2 text-sm">
                        Tipe, Jenis, Tema
                      </div>
                    </Header>
                    <Header
                      width="20%"
                      className="border-t border-r rounded-se-xl cell-custom-dataTables "
                    >
                      <div className="custom-table-header justify-center text-sm">
                        Jumlah
                      </div>
                    </Header>
                  </Headers>
                  <Rows
                    items={summarySchedule}
                    render={({ kode, nama, jumlah, role, children }) => (
                      <Row
                        itemId={kode}
                        items={children}
                        isExpanded={Boolean(expansionMap[`${kode}-${role}`])}
                        hasChildren={children?.length > 0}
                      >
                        <Cell className="!hidden" />
                        <Cell
                          width="80%"
                          className="border-x cell-width-full-height-full cell-custom-dataTables flex justify-between items-center"
                        >
                          <div
                            className={`w-full flex pt-1 ${
                              levelMap[`${kode}-${role}`] === 1
                                ? `pl-6`
                                : levelMap[`${kode}-${role}`] === 2
                                ? `pl-12`
                                : `pl-0`
                            }`}
                          >
                            {children?.length ? (
                              <ButtonIcon
                                handleClick={() => toggleExpansion(kode, role)}
                                icon={
                                  expansionMap[`${kode}-${role}`] ? (
                                    <IconChevronDown />
                                  ) : (
                                    <IconChevronRight />
                                  )
                                }
                              />
                            ) : (
                              <div className="ml-5" />
                            )}
                            <div
                              className={`flex items-center w-full justify-between ml-2`}
                            >
                              <div>{nama}</div>
                            </div>
                          </div>
                        </Cell>
                        <Cell width="20%" className={`border-r ${customCell}`}>
                          <div className={positionCenter}>{jumlah}</div>
                        </Cell>
                      </Row>
                    )}
                  />
                </TableTree>
              </div>
            </Card>
          </div>
        </div>
      </div>
      {/* End Content */}
    </PatLandingLayout>
  );
};

export default index;

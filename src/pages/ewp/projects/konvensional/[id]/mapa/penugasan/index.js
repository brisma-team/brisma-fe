import React, { useState, useEffect } from "react";
import {
  Breadcrumbs,
  ButtonField,
  ButtonIcon,
  Card,
  PageTitle,
} from "@/components/atoms";
import { PrevNextNavigation } from "@/components/molecules/commons";
import { useRouter } from "next/router";
import { LandingLayoutEWP } from "@/layouts/ewp";
import { useAuditorEWP } from "@/data/ewp/konvensional";
import { useMapaEWP } from "@/data/ewp/konvensional/mapa";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import { IconEdit } from "@/components/icons";
import { useDispatch } from "react-redux";
import { setDataTables } from "@/slices/ewp/konvensional/mapa/assignmentMapaEWPSlice";
import { useSelector } from "react-redux";
import { ModalSetAuditor } from "@/components/molecules/ewp/konvensional/penugasan";

const routes = [
  {
    name: "Latar Belakang",
    slug: "latar-belakang",
  },
  {
    name: "Tujuan",
    slug: "tujuan",
  },
  { name: "Sumber Informasi", slug: "sumber-informasi" },
  { name: "Tim Audit", slug: "tim-audit" },
  { name: "UKER Assessment", slug: "uker-assessment" },
  { name: "Analisis", slug: "analisis" },
  { name: "Penugasan", slug: "penugasan" },
  { name: "Jadwal Audit", slug: "jadwal-audit" },
  { name: "Anggaran", slug: "anggaran" },
  { name: "Dokumen", slug: "dokument" },
];

const index = () => {
  const dispatch = useDispatch();
  const { id } = useRouter().query;
  const baseUrl = `/ewp/projects/konvensional/${id}/mapa`;

  const dataTables = useSelector((state) => state.assignmentMapaEWP.dataTables);
  const tableColumns = useSelector(
    (state) => state.assignmentMapaEWP.tableColumns
  );
  const [showModal, setShowModal] = useState(false);
  const [selectedUkerMcrId, setSelectedUkerMcrId] = useState(null);

  const { auditorEWP } = useAuditorEWP({ id });

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "EWP", path: "/ewp" },
    {
      name: `${auditorEWP?.data?.project_info?.project_id} / MAPA`,
      path: `${baseUrl}`,
    },
    {
      name: "Tujuan",
      path: `${baseUrl}/tujuan`,
    },
  ];

  const { mapaEWP, mapaEWPMutate, mapaEWPError } = useMapaEWP("penugasan", {
    id,
  });

  useEffect(() => {
    if (!mapaEWPError) {
      const filterData = mapaEWP?.data?.map((item) => {
        const filteredMapaSample = item.mapa_sample.filter(
          (sample) => sample.name_auditor !== null
        );

        return {
          ...item,
          mapa_sample: filteredMapaSample,
        };
      });

      const mapping = filterData?.map((v) => {
        const auditor = v?.mapa_sample?.map((sample) => sample?.name_auditor);
        const riskIssueCode = v.ref_risk_issue_kode;
        const riskIssueName = v.ref_risk_issue_name;

        const uker = `${v.mapa_uker.ref_auditee_branch_kode} - ${v.mapa_uker.ref_auditee_branch_name}`;
        const aktifitas = v.ref_aktivitas_name;
        const sub_aktifitas = v.ref_sub_aktivitas_name;
        const sub_major = v.ref_sub_major_name;
        const sample_jumlah_sample = v.sample_jumlah_sample;
        const mapa_uker_mcr_id = v.id;

        const presentase =
          ((filterData?.length / parseInt(sample_jumlah_sample)) * 100).toFixed(
            2
          ) + " %";

        return {
          auditor,
          uker,
          aktifitas,
          sub_aktifitas,
          sub_major,
          risk_issue: (
            <>
              <p className="font-bold">{riskIssueCode}</p>
              {" - "}
              {riskIssueName}
            </>
          ),
          sample: sample_jumlah_sample,
          presentase,
          mapa_uker_mcr_id,
        };
      });
      dispatch(setDataTables(mapping));
    }
  }, [mapaEWP]);

  const handleClick = (id) => {
    // console.log("id => ", id);
    setShowModal(true);
    setSelectedUkerMcrId(id);
  };

  return (
    <LandingLayoutEWP>
      <div className="pr-16">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        {/* Start Content */}
        <div className="flex justify-between items-center mb-6">
          <PageTitle text="Penugasan" />
          <PrevNextNavigation
            baseUrl={baseUrl}
            routes={routes}
            prevUrl={"/analisis-perencanaan"}
            nextUrl={"/jadwal-audit"}
          />
        </div>
        <div className="w-32 bg-atlasian-blue-light rounded">
          <ButtonField text="Tampilkan Filter" />
        </div>
        <div className="mb-4" />
        <Card>
          <div className="w-full px-6 py-4 overflow-y-scroll max-h-[40rem]">
            <TableTree>
              <Headers>
                <Header className="!hidden" />
                <Header width="5%" className="border-t border-x rounded-ss-xl">
                  Aksi
                </Header>
                {tableColumns.map((column, index) => {
                  return (
                    <Header
                      width={
                        [6, 7].includes(index)
                          ? "8%"
                          : index === 0
                          ? "14%"
                          : "13%"
                      }
                      className={`border-t border-r ${
                        index + 1 >= tableColumns.length && `rounded-se-xl`
                      }`}
                      key={index}
                    >
                      {column?.toUpperCase()}
                    </Header>
                  );
                })}
              </Headers>
              <Rows
                items={dataTables}
                render={(data) => (
                  <Row>
                    <Cell className="!hidden" />
                    <Cell width="5%" className="border-x">
                      <ButtonIcon
                        icon={<IconEdit />}
                        color={"yellow"}
                        handleClick={() => handleClick(data.mapa_uker_mcr_id)}
                      />
                    </Cell>
                    {tableColumns.map((column, index) => {
                      return (
                        <Cell
                          key={index}
                          width={
                            [6, 7].includes(index)
                              ? "8%"
                              : index === 0
                              ? "14%"
                              : "13%"
                          }
                          className="border-r"
                        >
                          {data[column]}
                        </Cell>
                      );
                    })}
                  </Row>
                )}
              />
            </TableTree>
          </div>
        </Card>
        {/* End Content */}
        <ModalSetAuditor
          showModal={showModal}
          selectedUkerMcrId={selectedUkerMcrId}
        />
      </div>
    </LandingLayoutEWP>
  );
};

export default index;

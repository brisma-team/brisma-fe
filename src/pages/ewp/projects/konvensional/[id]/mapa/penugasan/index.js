import React, { useState, useEffect } from "react";
import {
  Breadcrumbs,
  ButtonField,
  ButtonIcon,
  Card,
  PageTitle,
} from "@/components/atoms";
import {
  DataNotFound,
  PrevNextNavigation,
} from "@/components/molecules/commons";
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
import {
  CardFilterAssignment,
  ModalSetAuditor,
} from "@/components/molecules/ewp/konvensional/penugasan";
import _ from "lodash";

const customHeader = `w-full h-full flex items-center text-brisma font-bold px-3`;
const customCell = `cell-width-full-height-full cell-custom-dataTables`;
const positionCenter = `w-full h-full flex items-center`;

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
  { name: "Analisis", slug: "analisis-perencanaan" },
  { name: "Penugasan", slug: "penugasan" },
  { name: "Jadwal Audit", slug: "jadwal-audit" },
  { name: "Anggaran", slug: "anggaran" },
  { name: "Dokumen", slug: "dokumen" },
];

const index = () => {
  const dispatch = useDispatch();
  const { id } = useRouter().query;
  const baseUrl = `/ewp/projects/konvensional/${id}/mapa`;

  const dataTables = useSelector((state) => state.assignmentMapaEWP.dataTables);
  const [showModal, setShowModal] = useState(false);
  const [selectedUkerMcrId, setSelectedUkerMcrId] = useState(null);
  const [headerTitle, setHeaderTitle] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState({
    sub_aktivitas_kode: "",
    sub_aktivitas_name: "",
    sub_major_kode: "",
    sub_major_name: "",
    risk_issue_kode: "",
    risk_issue_name: "",
    mcr_id: "",
    risk_assigned: "",
  });
  const [params, setParams] = useState({
    sub_aktivitas_kode: "",
    sub_aktivitas_name: "",
    sub_major_kode: "",
    sub_major_name: "",
    risk_issue_kode: "",
    risk_issue_name: "",
    mcr_id: "",
    risk_assigned: "",
  });

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
    ...params,
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
        const headerTitle = `${v.mapa_uker.ref_auditee_branch_kode} ${v.mapa_uker.ref_auditee_branch_name} / ${v.ref_aktivitas_name} / ${v.ref_sub_aktivitas_name} / ${v.ref_sub_major_kode} / ${v.ref_risk_issue_kode}`;

        const auditor = v?.mapa_sample
          ?.map((sample) => sample?.name_auditor)
          .filter((auditor, index, self) => self.indexOf(auditor) === index);

        const uker = `${v.mapa_uker.ref_auditee_branch_kode} - ${v.mapa_uker.ref_auditee_branch_name}`;
        const aktifitas = v.ref_aktivitas_name;
        const sub_aktifitas = v.ref_sub_aktivitas_name;
        const sub_major_kode = v.ref_sub_major_kode;
        const sub_major_name = v.ref_sub_major_name;
        const risk_issue_kode = v.ref_risk_issue_kode;
        const risk_issue_name = v.ref_risk_issue_name;
        const sample_jumlah_sample = v.sample_jumlah_sample;
        const mapa_uker_mcr_id = v.id;

        const presentase = sample_jumlah_sample
          ? (
              (filterData?.length / parseInt(sample_jumlah_sample)) *
              100
            ).toFixed(0) + "%"
          : "";

        return {
          header_title: headerTitle,
          auditor,
          uker,
          aktifitas,
          sub_aktifitas,
          sub_major_kode,
          sub_major_name,
          risk_issue_kode,
          risk_issue_name,
          sample: sample_jumlah_sample,
          presentase,
          mapa_uker_mcr_id,
        };
      });
      dispatch(setDataTables(mapping));
    }
  }, [mapaEWP]);

  useEffect(() => {
    const handleSearch = () => {
      setParams(filter);
    };
    const debouncedSearch = _.debounce(handleSearch, 800);
    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [filter]);

  const handleClick = (id, headerTitle) => {
    setHeaderTitle(headerTitle);
    setShowModal(true);
    setSelectedUkerMcrId(id);
  };

  const handleChange = (props, value) => {
    setFilter((prev) => {
      return { ...prev, [props]: value };
    });
  };

  return (
    <LandingLayoutEWP>
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
          marginLeft={"-60px"}
        />
      </div>
      <div className="w-32 bg-atlasian-blue-light rounded">
        <ButtonField
          text={showFilter ? `Tutup Filter` : `Tampilkan Filter`}
          handler={() => setShowFilter(!showFilter)}
        />
      </div>
      <CardFilterAssignment
        showFilter={showFilter}
        data={filter}
        handleChangeFilter={handleChange}
      />
      <div className="mb-4" />
      <Card>
        <div className="w-full px-6 py-4 overflow-y-scroll max-h-[40rem]">
          <TableTree>
            <Headers>
              <Header className="!hidden" />
              <Header
                width="5%"
                className={`border-t border-x rounded-ss-xl header-width-full-height-full`}
              >
                <div className={`${customHeader} justify-center`}>Aksi</div>
              </Header>
              <Header
                width="14%"
                className={`border-t border-r header-width-full-height-full`}
              >
                <div className={`${customHeader}`}>AUDITOR</div>
              </Header>
              <Header
                width="13%"
                className={`border-t border-r header-width-full-height-full`}
              >
                <div className={`${customHeader}`}>UKER</div>
              </Header>
              <Header
                width="13%"
                className={`border-t border-r header-width-full-height-full`}
              >
                <div className={`${customHeader}`}>AKTIFITAS</div>
              </Header>
              <Header
                width="13%"
                className={`border-t border-r header-width-full-height-full`}
              >
                <div className={`${customHeader}`}>SUB-AKTIFITAS</div>
              </Header>
              <Header
                width="13%"
                className={`border-t border-r header-width-full-height-full`}
              >
                <div className={`${customHeader}`}>SUB-MAJOR</div>
              </Header>
              <Header
                width="13%"
                className={`border-t border-r header-width-full-height-full`}
              >
                <div className={`${customHeader}`}>RISK ISSUE</div>
              </Header>
              <Header
                width="8%"
                className={`border-t border-r header-width-full-height-full`}
              >
                <div className={`${customHeader} justify-center`}>SAMPLE</div>
              </Header>
              <Header
                width="8%"
                className={`border-t border-r header-width-full-height-full rounded-se-xl`}
              >
                <div className={`${customHeader} justify-center`}>
                  PRESENTASE
                </div>
              </Header>
            </Headers>
            {dataTables?.length ? (
              <Rows
                items={dataTables}
                render={({
                  header_title,
                  auditor,
                  uker,
                  aktifitas,
                  sub_aktifitas,
                  sub_major_kode,
                  sub_major_name,
                  risk_issue_kode,
                  risk_issue_name,
                  sample,
                  presentase,
                  mapa_uker_mcr_id,
                }) => (
                  <Row>
                    <Cell className="!hidden" />
                    <Cell width="5%" className={`border-x ${customCell}`}>
                      <div className={`${positionCenter} justify-center`}>
                        <ButtonIcon
                          icon={<IconEdit />}
                          color={"yellow"}
                          handleClick={() =>
                            handleClick(mapa_uker_mcr_id, header_title)
                          }
                        />
                      </div>
                    </Cell>
                    <Cell width="14%" className={`border-r ${customCell}`}>
                      <div className={`${positionCenter} flex-col`}>
                        {auditor?.length
                          ? auditor?.map((v, i) => {
                              return (
                                <div key={i} className="w-full">
                                  • {v}
                                </div>
                              );
                            })
                          : ""}
                      </div>
                    </Cell>
                    <Cell width="13%" className={`border-r ${customCell}`}>
                      <div className={positionCenter}>{uker}</div>
                    </Cell>
                    <Cell width="13%" className={`border-r ${customCell}`}>
                      <div className={positionCenter}>{aktifitas}</div>
                    </Cell>
                    <Cell width="13%" className={`border-r ${customCell}`}>
                      <div className={positionCenter}>{sub_aktifitas}</div>
                    </Cell>
                    <Cell width="13%" className={`border-r ${customCell}`}>
                      <div className={positionCenter}>
                        <p>
                          <span className="font-bold">{sub_major_kode}</span> -{" "}
                          <span>{sub_major_name}</span>
                        </p>
                      </div>
                    </Cell>
                    <Cell width="13%" className={`border-r ${customCell}`}>
                      <div className={positionCenter}>
                        <p>
                          <span className="font-bold">{risk_issue_kode}</span> -{" "}
                          <span>{risk_issue_name}</span>
                        </p>
                      </div>
                    </Cell>
                    <Cell width="8%" className={`border-r ${customCell}`}>
                      <div className={`${positionCenter} justify-center`}>
                        {sample}
                      </div>
                    </Cell>
                    <Cell width="8%" className={`border-r ${customCell}`}>
                      <div className={`${positionCenter} justify-center`}>
                        {presentase}
                      </div>
                    </Cell>
                  </Row>
                )}
              />
            ) : (
              <div className="w-full border-x border-b rounded-es-xl rounded-ee-xl pb-4">
                <DataNotFound />
              </div>
            )}
          </TableTree>
        </div>
      </Card>
      {/* End Content */}
      <ModalSetAuditor
        showModal={showModal}
        setShowModal={setShowModal}
        headerTitle={headerTitle}
        tableMutate={mapaEWPMutate}
        selectedUkerMcrId={selectedUkerMcrId}
      />
    </LandingLayoutEWP>
  );
};

export default index;

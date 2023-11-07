import React, { useEffect } from "react";
import {
  Breadcrumbs,
  ButtonField,
  Card,
  DatepickerField,
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
import { useDispatch } from "react-redux";
import {
  setDataTables,
  setPayload,
} from "@/slices/ewp/konvensional/mapa/auditScheduleMapaEWPSlice";
import { useSelector } from "react-redux";
import _ from "lodash";
import { usePostData } from "@/helpers";

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

  const dataTables = useSelector(
    (state) => state.auditScheduleMapaEWP.dataTables
  );
  const payload = useSelector((state) => state.auditScheduleMapaEWP.payload);

  const { auditorEWP } = useAuditorEWP({ id });

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "EWP", path: "/ewp" },
    {
      name: `${auditorEWP?.data?.project_info?.project_id} / MAPA`,
      path: `${baseUrl}`,
    },
    {
      name: "Jadwal Audit",
      path: `${baseUrl}/jadwal-audit`,
    },
  ];

  const { mapaEWP, mapaEWPMutate } = useMapaEWP("jadwal_audit", {
    id,
  });

  useEffect(() => {
    const mappingDataTables = [
      {
        keterangan: "Penyusunan MAPA",
        property_start: "penyusunan_mapa_plan_start",
        property_end: "penyusunan_mapa_plan_end",
      },
      {
        keterangan: "Entrance Meeting",
        property_start: "entrance_meeting_plan_start",
        property_end: "entrance_meeting_plan_end",
      },
      {
        keterangan: "Pelaksanaan Audit",
        property_start: "pelaksanaan_audit_plan_start",
        property_end: "pelaksanaan_audit_plan_end",
      },
      {
        keterangan: "Exit Meeting",
        property_start: "exit_meeting_plan_start",
        property_end: "exit_meeting_plan_end",
      },
      {
        keterangan: "Penyusunan LHA",
        property_start: "Penyusunan_LHA_plan_start",
        property_end: "Penyusunan_LHA_plan_end",
      },
      {
        keterangan: "Wrap-up Meeting",
        property_start: "Wrapup_Meeting_plan_start",
        property_end: "Wrapup_Meeting_plan_end",
      },
    ];

    const mappingPayload = _.pick(mapaEWP?.data, [
      "penyusunan_mapa_plan_start",
      "penyusunan_mapa_plan_end",
      "entrance_meeting_plan_start",
      "entrance_meeting_plan_end",
      "pelaksanaan_audit_plan_start",
      "pelaksanaan_audit_plan_end",
      "exit_meeting_plan_start",
      "exit_meeting_plan_end",
      "Penyusunan_LHA_plan_start",
      "Penyusunan_LHA_plan_end",
      "Wrapup_Meeting_plan_start",
      "Wrapup_Meeting_plan_end",
    ]);

    dispatch(setDataTables(mappingDataTables));
    dispatch(setPayload(mappingPayload));
  }, [mapaEWP]);

  const handleChange = (property, value) => {
    const updatedData = {
      ...payload,
      [property]: value,
    };
    dispatch(setPayload(updatedData));
  };

  const handleSubmit = async () => {
    await usePostData(
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/mapa/jadwal_audit/${id}`,
      payload
    );
    mapaEWPMutate();
  };

  return (
    <LandingLayoutEWP>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      {/* Start Content */}
      <div className="flex justify-between items-center mb-6">
        <PageTitle text="Jadwal Audit" />
        <PrevNextNavigation
          baseUrl={baseUrl}
          routes={routes}
          prevUrl={"/penugasan"}
          nextUrl={"/anggaran"}
          marginLeft={"-60px"}
        />
      </div>
      <div className="mb-4" />
      <div className="w-[47rem]">
        <Card>
          <div className="px-6 pt-2 pb-4 w-full">
            <p className="ml-2 font-bold text-base">Usulan Pelaksanaan</p>
            <div className="my-2 " />
            <div className="dataTables-jadwal-audit-mapa-ewp">
              <TableTree>
                <Headers>
                  <Header className="!hidden" />
                  <Header
                    width="50%"
                    className="border-t border-x cell-jadwal-audit-mapa-ewp"
                  >
                    Keterangan
                  </Header>
                  <Header
                    width="25%"
                    className="border-t border-r cell-jadwal-audit-mapa-ewp"
                  >
                    Tanggal Dimulai
                  </Header>
                  <Header
                    width="25%"
                    className="border-t border-r cell-jadwal-audit-mapa-ewp"
                  >
                    Tanggal Berakhir
                  </Header>
                </Headers>
                <Rows
                  items={dataTables}
                  render={({ keterangan, property_start, property_end }) => (
                    <Row>
                      <Cell className="!hidden" />
                      <Cell
                        width="50%"
                        className="border-x cell-jadwal-audit-mapa-ewp"
                      >
                        {keterangan}
                      </Cell>
                      <Cell
                        width="25%"
                        className="border-r cell-jadwal-audit-mapa-ewp"
                      >
                        <DatepickerField
                          placeholder="Tanggal"
                          handleChange={(e) => handleChange(property_start, e)}
                          value={payload[property_start] || ""}
                          pastDate={true}
                        />
                      </Cell>
                      <Cell
                        width="25%"
                        className="border-r cell-jadwal-audit-mapa-ewp"
                      >
                        <DatepickerField
                          placeholder="Tanggal"
                          handleChange={(e) => handleChange(property_end, e)}
                          value={payload[property_end] || ""}
                          pastDate={true}
                        />
                      </Cell>
                    </Row>
                  )}
                />
              </TableTree>
            </div>
          </div>
        </Card>
        <div className="flex justify-end mt-3">
          <div className="rounded bg-atlasian-green w-28">
            <ButtonField text={"Simpan"} handler={handleSubmit} />
          </div>
        </div>
      </div>
      {/* End Content */}
    </LandingLayoutEWP>
  );
};

export default index;

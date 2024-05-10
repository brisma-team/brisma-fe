import {
  Breadcrumbs,
  ButtonField,
  DatepickerField,
  PageTitle,
} from "@/components/atoms";
import { LandingLayoutEWPQualityAssurance } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { PrevNextNavigation } from "@/components/molecules/commons";
import { useDispatch, useSelector } from "react-redux";
import {
  setObjData,
  setObjPayload,
  resetObjData,
  resetObjPayload,
} from "@/slices/ewp/quality-assurance/perencanaan/jadwalEWPQualityAssuranceSlice";
import { convertDate, fetchApi, loadingSwal } from "@/helpers";
import _ from "lodash";
import { useJadwal } from "@/data/ewp/quality-assurance/perencanaan/jadwal";
import useUser from "@/data/useUser";
import { useLandingStatus } from "@/data/ewp/common";
import { useAuditInfo } from "@/data/ewp/common/info";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";

const routes = [
  {
    name: "Sumber Informasi",
    slug: "sumber-informasi",
  },
  {
    name: "Tim & Timeplan",
    slug: "tim-timeplan",
  },
  { name: "Anggaran", slug: "anggaran" },
  { name: "Program Kerja", slug: "program-kerja" },
  { name: "Dokumen", slug: "dokumen" },
];

const index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [params, setParams] = useState({
    id: 0,
  });
  const baseUrl = `/ewp/quality-assurance/${params?.id}`;
  const pathName = `${baseUrl}/perencanaan`;

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [isCloseSubmodule, setIsCloseSubmodule] = useState(false);
  const [isOnProgress, setIsOnProgress] = useState(false);
  const [isInitiator, setIsInitiator] = useState(false);

  const data = useSelector((state) => state.jadwalEWPQualityAssurance.objData);
  const payload = useSelector(
    (state) => state.jadwalEWPQualityAssurance.objPayload
  );

  const { user } = useUser();
  const { auditInfo } = useAuditInfo({ module: "qa", id: params?.id });
  const { jadwal, jadwalMutate } = useJadwal({ id: params?.id });
  const { landingStatus } = useLandingStatus({
    module: "qa",
    submodule: "mapa",
    id: params?.id,
  });

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    setParams({
      id,
    });
  }, [router.isReady]);

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "EWP", path: "/ewp" },
      { name: "Overview", path: "/ewp/quality-assurance" },
      {
        name: `${auditInfo?.data?.project_info?.project_id?.toUpperCase()}`,
        path: baseUrl + "/info",
      },
      {
        name: `Perencanaan Kegiatan`,
        path: pathName,
      },
      {
        name: `Jadwal`,
        path: `${pathName}/jadwal`,
      },
    ]);
    setIsCloseSubmodule(
      Boolean(auditInfo?.data?.realisasi?.penyusunan_mapa_real_end)
    );
    setIsInitiator(
      Boolean(auditInfo?.data?.project_info?.initiator?.pn === user?.data?.pn)
    );
  }, [auditInfo]);

  useEffect(() => {
    if (landingStatus?.data) {
      setIsOnProgress(
        Boolean(landingStatus?.data?.status_persetujuan_name == "On Progress")
      );
    }
  }, [landingStatus]);

  useEffect(() => {
    if (jadwal?.data) {
      const mappingData = [
        {
          keterangan: "Perencanaan (MAR)",
          property_start: "penyusunan_mapa_plan_start",
          property_end: "penyusunan_mapa_plan_end",
        },
        {
          keterangan: "Pelaksanaan",
          property_start: "pelaksanaan_audit_plan_start",
          property_end: "pelaksanaan_audit_plan_end",
        },
        {
          keterangan: "Reporting",
          property_start: "monitoring_plan_start",
          property_end: "monitoring_plan_end",
        },
        {
          keterangan: "Wrap-up Meeting",
          property_start: "Wrapup_Meeting_plan_start",
          property_end: "Wrapup_Meeting_plan_end",
        },
      ];

      const mappingPayload = _.pick(jadwal?.data, [
        "penyusunan_mapa_plan_start",
        "penyusunan_mapa_plan_end",
        "pelaksanaan_audit_plan_start",
        "pelaksanaan_audit_plan_end",
        "monitoring_plan_start",
        "monitoring_plan_end",
        "Wrapup_Meeting_plan_start",
        "Wrapup_Meeting_plan_end",
      ]);

      dispatch(setObjData(mappingData));
      dispatch(setObjPayload(mappingPayload));
    } else {
      dispatch(resetObjData());
      dispatch(resetObjPayload());
    }
  }, [jadwal]);

  const handleChange = (property, value) => {
    const updatedData = {
      ...payload,
      [property]: value,
    };
    dispatch(setObjPayload(updatedData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/mapa/jadwal_audit/${params?.id}`,
      payload
    );

    jadwalMutate();
    dispatch(resetObjPayload());
    loadingSwal("close");
  };

  return (
    <LandingLayoutEWPQualityAssurance>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-6">
        <PageTitle text="Anggaran" />
        <PrevNextNavigation
          baseUrl={pathName}
          routes={routes}
          prevUrl={"/jadwal"}
          nextUrl={"/dokumen"}
          marginLeft={"-67px"}
        />
      </div>
      {/* Start Content */}
      <div className="flex flex-col gap-3 w-[40rem]">
        <div className="bg-white">
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
              items={data}
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
                      handleChange={(value) =>
                        handleChange(property_start, value)
                      }
                      value={payload[property_start] || ""}
                      maxDate={convertDate(payload[property_end], "-")}
                    />
                  </Cell>
                  <Cell
                    width="25%"
                    className="border-r cell-jadwal-audit-mapa-ewp"
                  >
                    <DatepickerField
                      placeholder="Tanggal"
                      handleChange={(value) =>
                        handleChange(property_end, value)
                      }
                      value={payload[property_end] || ""}
                      minDate={convertDate(payload[property_start], "-")}
                    />
                  </Cell>
                </Row>
              )}
            />
          </TableTree>
        </div>
        {!isCloseSubmodule && isOnProgress && isInitiator ? (
          <div className="w-full flex justify-end">
            <div className="rounded bg-atlasian-green">
              <ButtonField
                text={"Simpan"}
                handler={handleSubmit}
                type={"submit"}
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      {/* End Content */}
    </LandingLayoutEWPQualityAssurance>
  );
};

export default index;

import {
  Breadcrumbs,
  ButtonField,
  DivButton,
  LozengeField,
  PageTitle,
} from "@/components/atoms";
import { useProjectDetail } from "@/data/ewp/konsulting";
import { LandingLayoutEWPConsulting } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import { useLingkupAnalisa } from "@/data/ewp/konsulting/analisa/lingkup";
import {
  setObjData,
  resetObjData,
} from "@/slices/ewp/konsulting/analisa/lingkupEWPKonsultingSlice";

const customCell = `cell-width-full-height-full cell-custom-dataTables`;

const index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = useRouter().query;
  const baseUrl = `/ewp/konsulting/overview/${id}`;
  const pathName = `${baseUrl}/analisa`;

  const [showFilter, setShowFilter] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const data = useSelector((state) => state.lingkupEWPKonsulting.objData);

  const { projectDetail } = useProjectDetail({ id });
  const { lingkupAnalisa } = useLingkupAnalisa({ id });

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "EWP", path: "/ewp" },
      { name: "Overview", path: "/ewp/konsulting/overview" },
      {
        name: `${projectDetail?.data?.project_info?.project_id?.toUpperCase()}`,
        path: `${baseUrl}/info`,
      },
      {
        name: `Analisa / Lingkup Konsulting Ringkasan`,
        path: `${pathName}/lingkup`,
      },
    ]);
  }, [projectDetail]);

  useEffect(() => {
    if (lingkupAnalisa?.data?.length) {
      const mappingAnalisa = lingkupAnalisa?.data?.map((v) => {
        const {
          auditor,
          mapa_uker_mcr,
          mapa_uker_mcr_control,
          status_persetujuan,
        } = v;
        return {
          kkpa_id: v?.id,
          auditor,
          status: status_persetujuan,
          lingkup: {
            kode: mapa_uker_mcr?.lingkup_pemeriksaan?.id,
            nama: mapa_uker_mcr?.lingkup_pemeriksaan?.judul_lingkup_pemeriksaan,
          },
          risk: {
            kode: mapa_uker_mcr?.mtd_risk_issue?.abbr,
            nama: mapa_uker_mcr?.mtd_risk_issue?.nama,
          },
          control: {
            kode: mapa_uker_mcr_control?.mtd_control?.abbr,
            nama: mapa_uker_mcr_control?.mtd_control?.nama,
          },
        };
      });

      dispatch(setObjData(mappingAnalisa));
    } else {
      dispatch(resetObjData());
    }
  }, [lingkupAnalisa]);

  const handleShowFilter = () => {
    setShowFilter((prev) => {
      return !prev;
    });
  };

  const handleClickMatrix = () => {
    router.push(`/ewp/konsulting/overview/${id}/analisa/matrix`);
  };

  const handleClickDokumenPerencanaan = () => {
    router.push(`/ewp/konsulting/overview/${id}/perencanaan/dokumen`);
  };

  const handleClickKertasKerja = (kkpa_id) => {
    router.push(`/ewp/konsulting/overview/${id}/analisa/lingkup/${kkpa_id}`);
  };

  return (
    <LandingLayoutEWPConsulting>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="mb-5">
        <PageTitle text="Lingkup Konsulting" />
      </div>
      <div className="flex items-end gap-4 mb-4">
        {/* Start Filter */}
        <div className="flex justify-between items-center gap-2">
          <div className="w-36 rounded bg-atlasian-blue-light">
            <ButtonField
              handler={handleShowFilter}
              text={showFilter ? `Tutup Filter` : `Tampilkan Filter`}
            />
          </div>
          <div className="w-36 rounded bg-atlasian-purple">
            <ButtonField handler={handleClickMatrix} text={"Matrix Peluang"} />
          </div>
        </div>
      </div>
      {/* Start Content */}
      <TableTree>
        <Headers>
          <Header
            width="19%"
            className="border-x border-t rounded-ss-lg cell-custom-dataTables"
          >
            <div className={`custom-table-header text-sm font-semibold`}>
              AUDITOR
            </div>
          </Header>
          <Header
            width="10%"
            className="border-t border-r cell-custom-dataTables"
          >
            <div className="custom-table-header justify-center text-sm font-semibold">
              STATUS
            </div>
          </Header>
          <Header
            width="17%"
            className="border-t border-r cell-custom-dataTables"
          >
            <div className="custom-table-header text-sm font-semibold">
              LINGKUP
            </div>
          </Header>
          <Header
            width="17%"
            className="border-t border-r cell-custom-dataTables"
          >
            <div className="custom-table-header text-sm font-semibold">
              RISK
            </div>
          </Header>
          <Header
            width="17%"
            className="border-t border-r cell-custom-dataTables"
          >
            <div className="custom-table-header text-sm font-semibold">
              CONTROL
            </div>
          </Header>
          <Header
            width="10%"
            className="border-t border-r cell-custom-dataTables"
          >
            <div className="custom-table-header justify-center text-sm font-semibold">
              DOKUMEN
            </div>
          </Header>
          <Header
            width="10%"
            className="border-t border-r cell-custom-dataTables rounded-se-lg"
          >
            <div className="custom-table-header justify-center text-sm font-semibold">
              KERTAS KERJA
            </div>
          </Header>
        </Headers>
        <Rows
          items={data}
          render={({ kkpa_id, auditor, lingkup, risk, control, status }) => (
            <Row>
              <Cell width="19%" className={`border-x ${customCell}`}>
                <div className="custom-table-position-center">
                  {auditor?.name}
                </div>
              </Cell>
              <Cell width="10%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center justify-center">
                  {status ? (
                    <LozengeField
                      appreance={
                        status === "On Progress"
                          ? "default"
                          : status === "On Approver"
                          ? "inprogress"
                          : "success"
                      }
                    >
                      {status}
                    </LozengeField>
                  ) : (
                    ""
                  )}
                </div>
              </Cell>
              <Cell width="17%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center">
                  {lingkup?.nama}
                </div>
              </Cell>
              <Cell width="17%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center">
                  {risk ? `${risk?.kode} - ${risk?.nama}` : ""}
                </div>
              </Cell>
              <Cell width="17%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center">
                  {control ? `${control?.kode} - ${control?.nama}` : ""}
                </div>
              </Cell>
              <Cell width="10%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center justify-center">
                  <DivButton
                    handleClick={handleClickDokumenPerencanaan}
                    className={
                      "bg-atlasian-blue-light hover:bg-hover-blue rounded w-24 text-xs text-center font-bold text-white py-1 my-2"
                    }
                  >
                    Dokumen Perencanaan
                  </DivButton>
                </div>
              </Cell>
              <Cell width="10%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center justify-center">
                  <DivButton
                    handleClick={() => handleClickKertasKerja(kkpa_id)}
                    className={
                      "bg-atlasian-yellow hover:bg-hover-yellow rounded w-24 text-xs text-center font-bold text-white py-1 my-2"
                    }
                  >
                    Kertas Kerja Analisa
                  </DivButton>
                </div>
              </Cell>
            </Row>
          )}
        />
      </TableTree>
      {/* End Content */}
    </LandingLayoutEWPConsulting>
  );
};

export default index;

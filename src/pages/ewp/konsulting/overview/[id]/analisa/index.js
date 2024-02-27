import { Breadcrumbs, ButtonField, Card, PageTitle } from "@/components/atoms";
import { useProjectDetail } from "@/data/ewp/konsulting";
import { LandingLayoutEWPConsulting } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { PrevNextNavigation } from "@/components/molecules/commons";
import { useDispatch, useSelector } from "react-redux";
import { useTimTimeplan } from "@/data/ewp/konsulting/perencanaan/tim-timeplan";
import { CardTeam } from "@/components/molecules/ewp/konsulting/perencanaan/tim-timeplan";
import { fetchApi, loadingSwal, setErrorValidation } from "@/helpers";
import _ from "lodash";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";

const customCell = `cell-width-full-height-full cell-custom-dataTables`;
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
  const { id } = useRouter().query;
  const baseUrl = `/ewp/konsulting/overview/${id}`;
  const pathName = `${baseUrl}/analisa`;

  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const data = useSelector((state) => state.lingkupEWPKonsulting.objData);

  const { projectDetail } = useProjectDetail({ id });
  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "EWP", path: "/ewp" },
      { name: "Overview", path: "/ewp/konsulting/overview" },
      {
        name: `${projectDetail?.data?.project_info?.project_id?.toUpperCase()} / Analisa`,
        path: pathName,
      },
      {
        name: `Lingkup Konsulting Ringkasan`,
        path: `${pathName}/lingkup_konsulting`,
      },
    ]);
  }, [projectDetail]);

  return (
    <LandingLayoutEWPConsulting>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-7">
        <PageTitle text="Team & Time plan" />
        <PrevNextNavigation
          baseUrl={pathName}
          routes={routes}
          prevUrl={"/sumber-informasi"}
          nextUrl={"/anggaran"}
          marginLeft={"-60px"}
        />
      </div>
      {/* Start Content */}

      <TableTree>
        <Headers>
          <Header
            width="15%"
            className="border-x border-t cell-custom-dataTables"
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
            width="15%"
            className="border-t border-r cell-custom-dataTables"
          >
            <div className="custom-table-header text-sm font-semibold">
              LINGKUP
            </div>
          </Header>
          <Header
            width="15%"
            className="border-t border-r cell-custom-dataTables"
          >
            <div className="custom-table-header text-sm font-semibold">
              RISK
            </div>
          </Header>
          <Header
            width="15%"
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
            <div className="custom-table-header text-sm font-semibold">
              DOKUMEN
            </div>
          </Header>
          <Header
            width="10%"
            className="border-t border-r cell-custom-dataTables"
          >
            <div className="custom-table-header text-sm font-semibold">
              KERTAS KERJA
            </div>
          </Header>
        </Headers>
        <Rows
          items={data}
          render={({ tanggal, pnNama, subModul, aktifitas }) => (
            <Row>
              <Cell width="20%" className={`border-x ${customCell}`}>
                <div className="custom-table-position-center">
                  {tanggal ? convertDat(tanggal) : "N/A"}
                </div>
              </Cell>
              <Cell width="20%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center">
                  {pnNama ? pnNama : "N/A"}
                </div>
              </Cell>
              <Cell width="20%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center">
                  {pnNama ? pnNama : "N/A"}
                </div>
              </Cell>
              <Cell width="20%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center">
                  {pnNama ? pnNama : "N/A"}
                </div>
              </Cell>
              <Cell width="20%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center">
                  {subModul ? subModul : "N/A"}
                </div>
              </Cell>
              <Cell width="40%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center">
                  {aktifitas ? aktifitas : "N/A"}
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

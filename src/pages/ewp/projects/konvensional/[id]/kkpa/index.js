import {
  Breadcrumbs,
  ButtonField,
  LozengeField,
  PageTitle,
  Pagination,
} from "@/components/atoms";
import { useAuditorEWP } from "@/data/ewp/konvensional";
import { LandingLayoutEWP } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState } from "react";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import {
  DataNotFound,
  PrevNextNavigation,
} from "@/components/molecules/commons";
import Link from "next/link";

const customCell = `cell-width-full-height-full cell-custom-dataTables`;

const index = () => {
  const { id } = useRouter().query;
  const baseUrl = `/ewp/projects/konvensional/${id}/kkpa/audited`;
  const [data, setData] = useState([
    {
      id: "1",
      auditor: "Mohammad Dandy Putra",
      status: "On Approver",
      mandays: "30",
      risk_issue_code: "IRO1",
      risk_issue_name: "Risk Issue Unit",
      sub_major_code: "IRO",
      sub_major_name: "Identitas Pengukuran",
      sub_aktivitas: "LIKUIDITAS",
      aktivitas: "MANAJEMEN RESIKO",
      uker_kode: "123",
      uker_name: "DIVISI CENTER OF EXCELLENCE",
    },
  ]);
  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { auditorEWP } = useAuditorEWP({ id });

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "EWP", path: "/ewp" },
    {
      name: `${auditorEWP?.data?.project_info?.project_id} / KKPA`,
      path: `/ewp/projects/konvensional/${id}/kkpa`,
    },
  ];

  return (
    <LandingLayoutEWP>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-7">
        <PageTitle text="K.K.P.A Overview" />
        <PrevNextNavigation baseUrl={baseUrl} prevUrl={"/"} />
      </div>
      <div className="flex justify-between items-center gap-2 w-72 mb-5">
        <div className="w-36 rounded bg-atlasian-blue-light">
          <ButtonField
            handler={() => setShowFilter(!showFilter)}
            text={showFilter ? `Tutup Filter` : `Tampilkan Filter`}
          />
        </div>
        <div className="w-36 rounded bg-atlasian-red">
          <ButtonField text={"Unaudited List"} />
        </div>
      </div>
      {/* Start Content */}
      <TableTree>
        <Headers>
          <Header
            width="17%"
            className="border-x border-t cell-custom-dataTables rounded-ss-xl"
          >
            <div className="custom-table-header">AUDITOR</div>
          </Header>
          <Header
            width="9%"
            className="border-t border-r cell-custom-dataTables"
          >
            <div className="custom-table-header justify-center">STATUS</div>
          </Header>
          <Header
            width="7%"
            className="border-t border-r cell-custom-dataTables"
          >
            <div className="custom-table-header justify-center">MANDAYS</div>
          </Header>
          <Header
            width="12%"
            className="border-t border-r cell-custom-dataTables"
          >
            <div className="custom-table-header">RISK ISSUE</div>
          </Header>
          <Header
            width="12%"
            className="border-t border-r cell-custom-dataTables"
          >
            <div className="custom-table-header">SUB-MAJOR</div>
          </Header>
          <Header
            width="12%"
            className="border-t border-r cell-custom-dataTables"
          >
            <div className="custom-table-header">SUB-AKTIFITAS</div>
          </Header>
          <Header
            width="19%"
            className="border-t border-r cell-custom-dataTables"
          >
            <div className="custom-table-header">AKTIFITAS</div>
          </Header>
          <Header
            width="12%"
            className="border-t border-r cell-custom-dataTables rounded-se-xl"
          >
            <div className="custom-table-header">UKER</div>
          </Header>
        </Headers>
        {data?.length ? (
          <div className="max-h-[31rem] overflow-y-scroll">
            <Rows
              items={data}
              render={({
                id,
                auditor,
                status,
                mandays,
                risk_issue_code,
                risk_issue_name,
                sub_major_code,
                sub_major_name,
                sub_aktivitas,
                aktivitas,
                uker_kode,
                uker_name,
              }) => (
                <Row>
                  <Cell width="17%" className={`border-x ${customCell}`}>
                    <Link
                      className="custom-table-position-center"
                      href={`${baseUrl}/${id}/detail`}
                    >
                      {auditor}
                    </Link>
                  </Cell>
                  <Cell width="9%" className={`border-r ${customCell}`}>
                    <div
                      className={`custom-table-position-center justify-center text-xs`}
                    >
                      <LozengeField
                        appreance={
                          status === "On Approver" ? "removed" : "moved"
                        }
                        isBold={true}
                      >
                        {status}
                      </LozengeField>
                    </div>
                  </Cell>
                  <Cell width="7%" className={`border-r ${customCell}`}>
                    <div
                      className={`custom-table-position-center justify-center text-xs`}
                    >
                      {mandays}
                    </div>
                  </Cell>
                  <Cell width="12%" className={`border-r ${customCell}`}>
                    <div className={`custom-table-position-center text-xs`}>
                      <p>
                        <span className="font-bold">{risk_issue_code}</span> -{" "}
                        <span>{risk_issue_name}</span>
                      </p>
                    </div>
                  </Cell>
                  <Cell width="12%" className={`border-r ${customCell}`}>
                    <div className={`custom-table-position-center text-xs`}>
                      <p>
                        <span className="font-bold">{sub_major_code}</span> -{" "}
                        <span>{sub_major_name}</span>
                      </p>
                    </div>
                  </Cell>
                  <Cell width="12%" className={`border-r ${customCell}`}>
                    <div className={`custom-table-position-center text-xs`}>
                      {sub_aktivitas}
                    </div>
                  </Cell>
                  <Cell width="19%" className={`border-r ${customCell}`}>
                    <div className={`custom-table-position-center text-xs`}>
                      {aktivitas}
                    </div>
                  </Cell>
                  <Cell width="12%" className={`border-r ${customCell}`}>
                    <div className={`custom-table-position-center text-xs`}>
                      {uker_kode + " - " + uker_name}
                    </div>
                  </Cell>
                </Row>
              )}
            />
          </div>
        ) : (
          <div className="w-full border-x border-b rounded-es-xl rounded-ee-xl pb-4">
            <DataNotFound />
          </div>
        )}
      </TableTree>
      <div className="w-full border-x border-b rounded-b-xl pb-5 pt-0.5">
        <div className="-mt-3">
          <Pagination pages={currentPage} setCurrentPage={setCurrentPage} />
        </div>
      </div>
      {/* End Content */}
    </LandingLayoutEWP>
  );
};

export default index;

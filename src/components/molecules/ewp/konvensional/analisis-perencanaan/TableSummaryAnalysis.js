import { ButtonField, Card } from "@/components/atoms";
import { DataNotFound } from "@/components/molecules/commons";
import { useSummaryAnalysisEWP } from "@/data/ewp/konvensional/mapa/analisis-perencanaan";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import { useEffect } from "react";
import { useState } from "react";

const customCell = `cell-width-full-height-full cell-custom-dataTables`;

const TableSummaryAnalysis = () => {
  const [data, setData] = useState([]);
  const [params, setParams] = useState({
    uker_name: "",
    uker_kode: "",
    aktivitas: "",
    sub_aktivitas: "",
    sub_major: "",
    risk: "",
    tipe_uker: "",
  });

  const { summaryAnalysisEWP } = useSummaryAnalysisEWP({ id: 3, ...params });

  useEffect(() => {
    if (summaryAnalysisEWP?.data?.length) {
      const mapping = summaryAnalysisEWP?.data?.map((v) => {
        return {
          orgeh_kode: v.ref_auditee_orgeh_kode,
          branch_kode: v.ref_auditee_branch_kode,
          branch_nama: v.ref_auditee_branch_name,
          aktivitas: v.mtd_aktivitas_name,
          sub_aktivitas: v.mtd_sub_aktivitas_name,
          sub_major_kode: v.ref_sub_major_kode,
          sub_major_nama: v.ref_sub_major_name,
          risk_issue_kode: v.ref_sub_major_kode,
          risk_issue_nama: v.ref_sub_major_name,
          sample: v.sample_jumlah_sample,
        };
      });
      setData(mapping);
    }
  }, [summaryAnalysisEWP]);
  return (
    <>
      <div className="w-32 bg-atlasian-blue-light rounded">
        <ButtonField text="Tampilkan Filter" />
      </div>
      <div className="mb-4" />
      <Card>
        <div className="w-full px-6 py-4">
          <TableTree>
            <Headers>
              <Header
                width="18%"
                className="border-x border-t cell-custom-dataTables"
              >
                <div className={`custom-table-header text-sm font-semibold`}>
                  UKER
                </div>
              </Header>
              <Header
                width="18%"
                className="border-t border-r cell-custom-dataTables"
              >
                <div className="custom-table-header text-sm font-semibold">
                  AKTIFITAS
                </div>
              </Header>
              <Header
                width="18%"
                className="border-t border-r cell-custom-dataTables"
              >
                <div className="custom-table-header text-sm font-semibold">
                  SUB-AKTIFITAS
                </div>
              </Header>
              <Header
                width="18%"
                className="border-t border-r cell-custom-dataTables"
              >
                <div className="custom-table-header text-sm font-semibold">
                  SUB-MAJOR
                </div>
              </Header>
              <Header
                width="18%"
                className="border-t border-r cell-custom-dataTables"
              >
                <div className="custom-table-header text-sm font-semibold">
                  RISK ISSUE
                </div>
              </Header>
              <Header
                width="10%"
                className="border-t border-r cell-custom-dataTables"
              >
                <div className="custom-table-header justify-center text-sm font-semibold">
                  SAMPLE
                </div>
              </Header>
            </Headers>
            {data?.length ? (
              <div className="max-h-[18rem] overflow-y-scroll">
                <Rows
                  items={data}
                  render={({
                    orgeh_kode,
                    branch_kode,
                    branch_nama,
                    aktivitas,
                    sub_aktivitas,
                    sub_major_kode,
                    sub_major_nama,
                    risk_issue_kode,
                    risk_issue_nama,
                    sample,
                  }) => (
                    <Row>
                      <Cell width="18%" className={`border-x ${customCell}`}>
                        <div className="custom-table-position-center">
                          <p className="text-xs">
                            <span className="font-bold">
                              {branch_kode} [{orgeh_kode}]
                            </span>{" "}
                            - <span>{branch_nama}</span>
                          </p>
                        </div>
                      </Cell>
                      <Cell width="18%" className={`border-r ${customCell}`}>
                        <div className="custom-table-position-center">
                          <p className="text-xs font-semibold">{aktivitas}</p>
                        </div>
                      </Cell>
                      <Cell width="18%" className={`border-r ${customCell}`}>
                        <div className="custom-table-position-center">
                          <p className="text-xs font-semibold">
                            {sub_aktivitas}
                          </p>
                        </div>
                      </Cell>
                      <Cell width="18%" className={`border-r ${customCell}`}>
                        <div className="custom-table-position-center">
                          <p className="text-xs">
                            <span className="font-bold">{sub_major_kode}</span>{" "}
                            - <span>{sub_major_nama}</span>
                          </p>
                        </div>
                      </Cell>
                      <Cell width="18%" className={`border-r ${customCell}`}>
                        <div className="custom-table-position-center">
                          <p className="text-xs">
                            <span className="font-bold">{risk_issue_kode}</span>{" "}
                            - <span>{risk_issue_nama}</span>
                          </p>
                        </div>
                      </Cell>
                      <Cell width="10%" className={`border-r ${customCell}`}>
                        <div className="custom-table-position-center justify-center">
                          <p className="text-xs font-semibold">{sample}</p>
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
        </div>
      </Card>{" "}
    </>
  );
};

export default TableSummaryAnalysis;

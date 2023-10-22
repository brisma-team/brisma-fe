import { useHistorySamplePoolMapaEWP } from "@/data/ewp/konvensional/mapa/analisis-perencanaan";
import { useRouter } from "next/router";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import { useSelector } from "react-redux";
import { DataNotFound } from "@/components/molecules/commons";
import { useEffect, useState } from "react";
const customCell = `cell-width-full-height-full cell-custom-dataTables`;

const ContentHistorySampleCSV = ({
  selectedRiskIssueId,
  selectedSamplePoolId,
}) => {
  const { id } = useRouter().query;
  const [historySample, setHistorySample] = useState([]);

  const dataTables = useSelector(
    (state) => state.planningAnalysisMapaEWP.dataTables
  );

  const { historySamplePoolMapaEWP } = useHistorySamplePoolMapaEWP({
    id,
    risk_issue_id: selectedRiskIssueId,
    sample_pool_id: selectedSamplePoolId,
  });

  useEffect(() => {
    if (historySamplePoolMapaEWP?.data?.history?.length) {
      const mapping = historySamplePoolMapaEWP?.data?.history?.map((v) => {
        return {
          uploader: v.ref_pool_sample_csv.name_uploader,
          risk_issue_kode: v.ref_pool_sample_csv.original_risk_issue_kode,
          risk_issue_nama: v.ref_pool_sample_csv.original_risk_issue_nama,
          sub_aktivitas: v.ref_pool_sample_csv.original_sub_aktivitas_nama,
          aktivitas: v.ref_pool_sample_csv.original_aktivitas_nama,
        };
      });
      setHistorySample(mapping);
    }
  }, [historySamplePoolMapaEWP]);

  return (
    <div className="px-4 py-2">
      <p>{dataTables.fileName}</p>
      <div className="my-2" />
      <TableTree>
        <Headers>
          <Header
            width="25%"
            className="border-x border-t rounded-ss-xl cell-custom-dataTables"
          >
            <div className={`custom-table-header`}>Uploader</div>
          </Header>
          <Header
            width="25%"
            className="border-t border-r cell-custom-dataTables"
          >
            <div className={`custom-table-header`}>Risk Issue</div>
          </Header>
          <Header
            width="25%"
            className="border-t border-r cell-custom-dataTables"
          >
            <div className={`custom-table-header`}>Sub Aktifitas</div>
          </Header>
          <Header
            width="25%"
            className="border-t border-r rounded-se-xl cell-custom-dataTables"
          >
            <div className={`custom-table-header`}>Aktifitas</div>
          </Header>
        </Headers>
        {historySample?.length ? (
          <div className="max-h-[28rem] overflow-y-scroll">
            <Rows
              items={historySample}
              render={({
                uploader,
                risk_issue_kode,
                risk_issue_nama,
                sub_aktivitas,
                aktivitas,
              }) => (
                <Row>
                  <Cell width="25%" className={`border-x ${customCell}`}>
                    <div className="custom-table-position-center">
                      <p className="text-xs font-semibold">{uploader}</p>
                    </div>
                  </Cell>
                  <Cell width="25%" className={`border-r ${customCell} `}>
                    <div className="custom-table-position-center">
                      <p className="text-xs">
                        <span className="font-bold">{risk_issue_kode}</span> -{" "}
                        <span>{risk_issue_nama}</span>
                      </p>
                    </div>
                  </Cell>
                  <Cell width="25%" className={`border-r ${customCell} `}>
                    <div className="custom-table-position-center">
                      <p className="text-xs">{sub_aktivitas}</p>
                    </div>
                  </Cell>
                  <Cell width="25%" className={`border-r ${customCell} `}>
                    <div className="custom-table-position-center">
                      <p className="text-xs">{aktivitas}</p>
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
  );
};

export default ContentHistorySampleCSV;

import { DivButton, LozengeField } from "@/components/atoms";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";

const customCell = `cell-width-full-height-full cell-custom-dataTables`;

const DataTables = ({
  data,
  handleClickDokumenPerencanaan,
  handleClickKertasKerja,
}) => {
  return (
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
          <div className="custom-table-header text-sm font-semibold">RISK</div>
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
  );
};

export default DataTables;

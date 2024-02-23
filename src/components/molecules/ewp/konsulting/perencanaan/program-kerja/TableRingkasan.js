import { LinkIcon, LozengeField } from "@/components/atoms";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";

const TableRingkasan = ({ data }) => {
  return (
    <div className="dataTables-custom">
      <TableTree>
        <Headers>
          <Header className="!hidden" />
          <Header
            width="25%"
            className="border-t border-x cell-custom-dataTables rounded-ss-xl"
          >
            AUDITOR
          </Header>
          <Header
            width="21%"
            className="border-t border-x cell-custom-dataTables"
          >
            LINGKUP
          </Header>
          <Header
            width="21%"
            className="border-t border-x cell-custom-dataTables"
          >
            RISK
          </Header>
          <Header
            width="21%"
            className="border-t border-r cell-custom-dataTables"
          >
            CONTROL
          </Header>
          <Header
            width="12%"
            className="border-t border-r cell-custom-dataTables justify-center rounded-se-xl"
          >
            DOKUMEN
          </Header>
        </Headers>
        <Rows
          items={data}
          render={({
            id,
            auditor,
            lingkup_pemeriksaan,
            risk,
            control,
            uraian,
          }) => (
            <Row>
              <Cell className="!hidden" />
              <Cell width="25%" className="border-x cell-custom-dataTables">
                {auditor}
              </Cell>
              <Cell width="21%" className="border-r cell-custom-dataTables">
                {lingkup_pemeriksaan}
              </Cell>
              <Cell width="21%" className="border-r cell-custom-dataTables">
                {risk?.kode + " - " + risk?.nama}
              </Cell>
              <Cell width="21%" className="border-r cell-custom-dataTables">
                {control?.kode + " - " + control?.nama}
              </Cell>
              <Cell
                width="12%"
                className="border-r cell-custom-dataTables justify-center"
              >
                <div className={uraian ? "" : "opacity-30"}>
                  <LinkIcon
                    icon={
                      <LozengeField appreance="inprogress" isBold>
                        URAIAN
                      </LozengeField>
                    }
                    href={`/ewp/konsulting/overview/10/perencanaan/program-kerja/${id}`}
                  />
                </div>
              </Cell>
            </Row>
          )}
        />
      </TableTree>
    </div>
  );
};

export default TableRingkasan;

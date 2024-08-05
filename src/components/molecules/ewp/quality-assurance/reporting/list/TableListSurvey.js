import { TooltipField } from "@/components/atoms";
import { DataNotFound } from "@/components/molecules/commons";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import Link from "next/link";

const templateTooltip = (petugas) => {
  return (
    <div className="mt-3">
      <p className="text-atlasian-red">Petugas :</p>
      {petugas?.map((v, i) => {
        return <div key={i}>{v.pn + " - " + v.nama}</div>;
      })}
    </div>
  );
};

const generateUrl = (mtd_tipe, ewp_id) => {
  let type;
  switch (mtd_tipe) {
    case "Consulting":
      type = "konsulting";
      break;
    case "Quality Assurance":
      type = "quality-assurance";
      break;
    default:
      type = "undefined";
      break;
  }

  return `/ewp/${type}/${ewp_id}/info`;
};

const TableListSurvey = ({ data }) => {
  return (
    <div className="dataTables-custom bg-white">
      <TableTree>
        <Headers>
          <Header className="!hidden" />
          <Header
            width="6%"
            className="border-t border-x cell-custom-dataTables flex justify-center"
          >
            TAHUN
          </Header>
          <Header
            width="12%"
            className="border-t border-x cell-custom-dataTables"
          >
            PROJECT ID
          </Header>
          <Header
            width="28%"
            className="border-t border-r cell-custom-dataTables"
          >
            JUDUL EWP
          </Header>
          <Header
            width="14%"
            className="border-t border-r cell-custom-dataTables"
          >
            PROYEK SURVEI
          </Header>
          <Header
            width="10%"
            className="border-t border-r cell-custom-dataTables"
          >
            JUMLAH PETUGAS
          </Header>
          <Header
            width="10%"
            className="border-t border-r cell-custom-dataTables"
          >
            STATUS SURVEI
          </Header>
          <Header
            width="10%"
            className="border-t border-r cell-custom-dataTables justify-center"
          >
            JUMLAH REKOMENDASI
          </Header>
          <Header
            width="10%"
            className="border-t border-r cell-custom-dataTables justify-center"
          >
            JUMLAH ACTION PLAN
          </Header>
        </Headers>
        {data?.length ? (
          <Rows
            items={data}
            render={({
              ewp_id,
              tahun,
              project_id,
              judul,
              project_survei_id,
              petugas,
              status_survei,
              mtd_tipe,
              jumlah_rekomendasi,
              jumlah_action_plan,
            }) => (
              <Row>
                <Cell className="!hidden" />
                <Cell
                  width="6%"
                  className="border-x cell-custom-dataTables flex justify-center"
                >
                  {tahun}
                </Cell>
                <Cell width="12%" className="border-r cell-custom-dataTables">
                  {project_id?.toUpperCase()}
                </Cell>
                <Cell width="28%" className="border-r cell-custom-dataTables">
                  {ewp_id ? (
                    <>
                      <Link
                        href={generateUrl(mtd_tipe?.nama, ewp_id)}
                        target="_blank"
                        className={`underline`}
                      >
                        {judul}
                      </Link>
                    </>
                  ) : (
                    <>
                      <p className="mb-1">{judul}</p>
                    </>
                  )}
                </Cell>
                <Cell width="14%" className="border-r cell-custom-dataTables">
                  {project_survei_id?.toUpperCase()}
                </Cell>
                <Cell
                  width="10%"
                  className="border-r cell-custom-dataTables justify-center"
                >
                  {petugas?.length ? (
                    <TooltipField
                      textButton={`${petugas?.length} ATR`}
                      content={templateTooltip(petugas)}
                    />
                  ) : (
                    ""
                  )}
                </Cell>
                <Cell width="10%" className="border-r cell-custom-dataTables">
                  {status_survei}
                </Cell>
                <Cell
                  width="10%"
                  className="border-r cell-custom-dataTables justify-center"
                >
                  {jumlah_rekomendasi}
                </Cell>
                <Cell
                  width="10%"
                  className="border-r cell-custom-dataTables justify-center"
                >
                  {jumlah_action_plan}
                </Cell>
              </Row>
            )}
          />
        ) : (
          <div className="w-full border-x border-b py-4">
            <DataNotFound />
          </div>
        )}
      </TableTree>
    </div>
  );
};

export default TableListSurvey;

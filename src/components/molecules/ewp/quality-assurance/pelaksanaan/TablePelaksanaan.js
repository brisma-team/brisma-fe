import { CustomTooltip, DivButton, LinkIcon } from "@/components/atoms";
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

const TablePelaksanaan = ({ data, pathName, handleClickDetailObjectAudit }) => {
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
            width="20%"
            className="border-t border-r cell-custom-dataTables"
          >
            JUDUL EWP
          </Header>
          <Header
            width="12%"
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
            className="border-t border-r cell-custom-dataTables"
          >
            TIPE EWP
          </Header>
          <Header
            width="10%"
            className="border-t border-r cell-custom-dataTables"
          >
            JENIS EWP
          </Header>
          <Header
            width="10%"
            className="border-t border-r cell-custom-dataTables justify-center"
          >
            KERTAS KERJA
          </Header>
        </Headers>
        {data?.length ? (
          <Rows
            items={data}
            render={({
              id,
              ewp_id,
              tahun,
              project_id,
              judul,
              project_survei_id,
              survei_id,
              petugas,
              status_survei,
              mtd_tipe,
              mtd_jenis,
              analisa,
              is_close,
            }) => (
              <Row>
                <Cell className="!hidden" />
                <Cell
                  width="6%"
                  className="border-x cell-custom-dataTables flex justify-center"
                >
                  <p className={is_close ? `text-atlasian-red` : ""}>{tahun}</p>
                </Cell>
                <Cell width="12%" className="border-r cell-custom-dataTables">
                  {/* {is_close ? (
                    <p className="text-atlasian-red">
                      {project_id?.toUpperCase()}
                    </p>
                  ) : (
                    <DivButton
                      className="text-atlasian-blue-light hover:text-hover-blue underline"
                      handleClick={() => handleClickDetailObjectAudit(id)}
                    >
                      {project_id?.toUpperCase()}
                    </DivButton>
                  )} */}
                  <DivButton
                    className={`${
                      is_close
                        ? "text-atlasian-red hover:text-atlasian-red"
                        : "text-atlasian-blue-light hover:text-hover-blue"
                    } underline `}
                    handleClick={() => handleClickDetailObjectAudit(id)}
                  >
                    {project_id?.toUpperCase()}
                  </DivButton>
                </Cell>
                <Cell width="20%" className="border-r cell-custom-dataTables">
                  <Link
                    href={generateUrl(mtd_tipe?.nama, ewp_id)}
                    target="_blank"
                    className={`${
                      is_close ? "text-atlasian-red hover:text-red-500" : ""
                    } underline`}
                  >
                    {judul}
                  </Link>
                </Cell>
                <Cell width="12%" className="border-r cell-custom-dataTables">
                  {is_close ? (
                    <p className="text-atlasian-red">
                      {project_survei_id?.toUpperCase()}
                    </p>
                  ) : status_survei === "Sedang Berlangsung" ? (
                    <Link
                      className="underline"
                      href={`/survey/responden/overview/${survei_id}`}
                      target="_blank"
                    >
                      {project_survei_id?.toUpperCase()}
                    </Link>
                  ) : (
                    project_survei_id?.toUpperCase()
                  )}
                </Cell>
                <Cell
                  width="10%"
                  className="border-r cell-custom-dataTables justify-center"
                >
                  {petugas?.length ? (
                    <CustomTooltip content={templateTooltip(petugas)}>
                      <p
                        className={`${
                          is_close ? "text-atlasian-red" : ""
                        } underline cursor-pointer`}
                      >{`${petugas?.length} ATR`}</p>
                    </CustomTooltip>
                  ) : (
                    ""
                  )}
                </Cell>
                <Cell width="10%" className="border-r cell-custom-dataTables">
                  <p className={is_close ? "text-atlasian-red" : ""}>
                    {status_survei}
                  </p>
                </Cell>
                <Cell width="10%" className="border-r cell-custom-dataTables">
                  <p className={is_close ? "text-atlasian-red" : ""}>
                    {mtd_tipe?.nama}
                  </p>
                </Cell>
                <Cell width="10%" className="border-r cell-custom-dataTables">
                  <p className={is_close ? "text-atlasian-red" : ""}>
                    {mtd_jenis?.nama}
                  </p>
                </Cell>
                <Cell
                  width="10%"
                  className="border-r cell-custom-dataTables justify-center"
                >
                  {!is_close ? (
                    <div className={`${analisa ? "" : "opacity-30"}`}>
                      <LinkIcon
                        icon={
                          <div className="rounded bg-atlasian-blue-light hover:bg-hover-blue text-white flex text-center !py-1.5 !px-1 !my-1 text-xs font-bold">
                            Kertas Kerja Analisa
                          </div>
                        }
                        href={`${pathName}/perencanaan/analisis-perencanaan/${id}`}
                        isBlank
                      />
                    </div>
                  ) : (
                    ""
                  )}
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

export default TablePelaksanaan;

import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import { IconChevronDown, IconChevronRight } from "@/components/icons";
import { ButtonIcon, DivButton, LinkIcon } from "@/components/atoms";
import { ButtonEdit } from "@/components/molecules/commons";
const positionCenter = `w-full h-full flex justify-center items-center`;

const TablePenugasan = ({
  data,
  user,
  pathName,
  isInitiator,
  withoutButton,
  expansionMap,
  handleClickToggleExpansion,
  handleClickEdit,
  handleClickFieldPetugas,
}) => {
  return (
    <div className="dataTables-custom bg-white">
      <TableTree>
        <Headers>
          <Header className="!hidden" />
          <Header
            width="6%"
            className="border-t border-x cell-custom-dataTables justify-center rounded-ss-lg"
          >
            AKSI
          </Header>
          <Header
            width="27%"
            className="border-t border-x cell-custom-dataTables"
          >
            OBJEK AUDIT
          </Header>
          <Header
            width="8%"
            className="border-t border-r cell-custom-dataTables justify-center"
          >
            PETUGASA
          </Header>
          <Header
            width="8%"
            className="border-t border-r cell-custom-dataTables justify-center"
          >
            TAHUN
          </Header>
          <Header
            width="13%"
            className="border-t border-r cell-custom-dataTables justify-center"
          >
            JENIS EWP
          </Header>
          <Header
            width="13%"
            className="border-t border-r cell-custom-dataTables justify-center"
          >
            TIPE EWP
          </Header>
          <Header
            width="10%"
            className="border-t border-r cell-custom-dataTables justify-center"
          >
            KERTAS KERJA
          </Header>
          <Header
            width="15%"
            className="border-t border-r cell-custom-dataTables justify-center rounded-se-lg"
          >
            PIC ANALISATOR
          </Header>
        </Headers>
        <Rows
          items={data}
          render={({
            id,
            role,
            branch_kode,
            branch_name,
            orgeh_kode,
            project_id,
            project_name,
            tahun,
            mtd_tipe,
            mtd_jenis,
            analisa,
            pic,
            petugas,
            children = [],
          }) => (
            <Row
              itemId={id}
              role={role}
              items={children}
              hasChildren={children.length > 0}
              isExpanded={Boolean(expansionMap[`${id}-${role}`])}
            >
              <Cell className="!hidden" />
              <Cell
                width="6%"
                className="border-x cell-custom-dataTables justify-center"
              >
                {!withoutButton ? (
                  role === "child" ? (
                    <ButtonIcon
                      icon={<ButtonEdit />}
                      handleClick={() => handleClickEdit(id)}
                    />
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
              </Cell>
              <Cell
                width="27%"
                className="border-r cell-custom-dataTables cell-width-full-height-full px-10"
              >
                <div className={`${positionCenter}`}>
                  {role !== "child" ? (
                    <ButtonIcon
                      handleClick={() => handleClickToggleExpansion(id, role)}
                      icon={
                        expansionMap[`${id}-${role}`] ? (
                          <IconChevronDown />
                        ) : (
                          <IconChevronRight />
                        )
                      }
                      className={role === "parent-child" ? "ml-5" : ""}
                    />
                  ) : (
                    <div className="ml-[2.67rem]" />
                  )}
                  <div
                    className={`flex items-center w-full justify-between ml-2`}
                  >
                    {role === "parent" ? (
                      <p>
                        {`[${orgeh_kode}][${branch_kode}] - ${branch_name?.toUpperCase()}`}
                      </p>
                    ) : role === "child" ? (
                      <p>{`[${project_id?.toUpperCase()}] ${project_name}`}</p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </Cell>
              <Cell
                width="8%"
                className="border-r cell-custom-dataTables justify-center"
              >
                <DivButton
                  handleClick={() => handleClickFieldPetugas(id)}
                  className="hover:underline text-atlasian-blue-light hover:text-hover-blue"
                >
                  {petugas?.length ? `${petugas?.length} ATR` : ""}
                </DivButton>
              </Cell>
              <Cell
                width="8%"
                className="border-r cell-custom-dataTables justify-center"
              >
                {tahun || ""}
              </Cell>
              <Cell
                width="13%"
                className="border-r cell-custom-dataTables justify-center"
              >
                {mtd_tipe?.nama || ""}
              </Cell>
              <Cell
                width="13%"
                className="border-r cell-custom-dataTables justify-center"
              >
                {mtd_jenis?.nama || ""}
              </Cell>
              <Cell
                width="10%"
                className="border-r cell-custom-dataTables justify-center"
              >
                {role === "child" && (isInitiator || user?.pn === pic?.pn) ? (
                  <div className={analisa ? "" : "opacity-100"}>
                    <LinkIcon
                      icon={
                        <div className="hover:bg-hover-blue bg-atlasian-blue-light rounded !py-1 my-1">
                          <p className="text-white font-bold text-center text-sm">
                            Kertas Kerja Analisa
                          </p>
                        </div>
                      }
                      href={`${pathName}/${id}`}
                    />
                  </div>
                ) : (
                  ""
                )}
              </Cell>
              <Cell
                width="15%"
                className="border-r cell-custom-dataTables justify-center"
              >
                {role === "child" && `${pic?.pn} - ${pic?.name}`}
              </Cell>
            </Row>
          )}
        />
      </TableTree>
      <div className="w-full border rounded-ee-lg rounded-es-lg min-h-[2rem]"></div>
    </div>
  );
};

export default TablePenugasan;

import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import { IconChevronDown, IconChevronRight } from "@/components/icons";
import { ButtonIcon, LozengeField } from "@/components/atoms";
import {
  ButtonDelete,
  ButtonEdit,
  RetryButton,
} from "@/components/molecules/commons";
import Image from "next/image";
import { ImageGroup } from "@/helpers/imagesUrl";
import Link from "next/link";
const positionCenter = `w-full h-full flex justify-center items-center`;

const TableAnalisisPerencanaan = ({
  data,
  user,
  isInitiator,
  isEksternal,
  withoutButton,
  expansionMap,
  handleClickToggleExpansion,
  handleClickAddProject,
  handleClickEditProject,
  handleClickAnalisa,
  handleClickDeleteProject,
  handleClickRestoreProject,
}) => {
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

  return (
    <div className="dataTables-custom bg-white">
      <TableTree>
        <Headers>
          <Header className="!hidden" />
          <Header
            width="8%"
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
            TAHUN
          </Header>
          <Header
            width="15%"
            className="border-t border-r cell-custom-dataTables justify-center"
          >
            JENIS EWP
          </Header>
          <Header
            width="15%"
            className="border-t border-r cell-custom-dataTables justify-center"
          >
            TIPE EWP
          </Header>
          <Header
            width="12%"
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
            uker_origin_id,
            ewp_id,
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
            is_new,
            is_edit,
            is_delete,
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
                width="8%"
                className="border-x cell-custom-dataTables justify-center"
              >
                {!withoutButton && role === "child" ? (
                  is_delete ? (
                    <ButtonIcon
                      icon={
                        <RetryButton
                          size={"small"}
                          className={
                            "text-atlasian-purple border border-atlasian-purple"
                          }
                        />
                      }
                      handleClick={async () => handleClickRestoreProject(id)}
                    />
                  ) : (
                    <div className="flex gap-1.5">
                      <ButtonIcon
                        icon={<ButtonDelete />}
                        handleClick={async () => handleClickDeleteProject(id)}
                      />
                      <ButtonIcon
                        icon={<ButtonEdit />}
                        handleClick={async () => handleClickEditProject(id)}
                      />
                    </div>
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
                      <p
                        className={`${
                          is_new || is_edit || is_delete
                            ? "font-semibold"
                            : "font-medium"
                        } ${
                          is_new
                            ? "text-atlasian-blue-light"
                            : is_delete
                            ? "text-atlasian-red"
                            : is_edit
                            ? "text-atlasian-yellow"
                            : ""
                        }`}
                      >
                        {`[${orgeh_kode}][${branch_kode}] - ${branch_name?.toUpperCase()}`}
                      </p>
                    ) : role === "child" ? (
                      isEksternal ? (
                        <p
                          className={`${
                            is_new || is_edit || is_delete
                              ? "font-semibold"
                              : "font-medium"
                          } ${
                            is_new
                              ? "text-atlasian-blue-light"
                              : is_delete
                              ? "text-atlasian-red"
                              : is_edit
                              ? "text-atlasian-yellow"
                              : ""
                          }`}
                        >{`[${project_id?.toUpperCase()}] ${project_name}`}</p>
                      ) : (
                        <Link
                          className={`${
                            is_new || is_edit || is_delete
                              ? "font-semibold"
                              : "font-medium"
                          } ${
                            is_new
                              ? "text-atlasian-blue-light hover:text-atlasian-blue-light"
                              : is_delete
                              ? "text-atlasian-red hover:text-atlasian-red"
                              : is_edit
                              ? "text-atlasian-yellow hover:text-atlasian-yellow"
                              : ""
                          }`}
                          href={generateUrl(mtd_tipe?.nama, ewp_id)}
                          target="_blank"
                        >{`[${project_id?.toUpperCase()}] ${project_name}`}</Link>
                      )
                    ) : (
                      ""
                    )}
                    {role !== "child" ? (
                      !withoutButton ? (
                        <ButtonIcon
                          icon={<Image src={ImageGroup} alt="" />}
                          handleClick={() => {
                            handleClickAddProject({
                              id,
                              uker_origin_id,
                              orgeh_kode,
                              branch_kode,
                              branch_name,
                            });
                          }}
                          className={"w-8 flex justify-end"}
                        />
                      ) : (
                        ""
                      )
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
                <p
                  className={`${
                    is_new || is_edit || is_delete
                      ? "font-semibold"
                      : "font-medium"
                  } ${
                    is_new
                      ? "text-atlasian-blue-light"
                      : is_delete
                      ? "text-atlasian-red"
                      : is_edit
                      ? "text-atlasian-yellow"
                      : ""
                  }`}
                >
                  {tahun || ""}
                </p>
              </Cell>
              <Cell
                width="15%"
                className="border-r cell-custom-dataTables justify-center"
              >
                <p
                  className={`${
                    is_new || is_edit || is_delete
                      ? "font-semibold"
                      : "font-medium"
                  } ${
                    is_new
                      ? "text-atlasian-blue-light"
                      : is_delete
                      ? "text-atlasian-red"
                      : is_edit
                      ? "text-atlasian-yellow"
                      : ""
                  }`}
                >
                  {mtd_tipe?.nama || ""}
                </p>
              </Cell>
              <Cell
                width="15%"
                className="border-r cell-custom-dataTables justify-center"
              >
                <p
                  className={`${
                    is_new || is_edit || is_delete
                      ? "font-semibold"
                      : "font-medium"
                  } ${
                    is_new
                      ? "text-atlasian-blue-light"
                      : is_delete
                      ? "text-atlasian-red"
                      : is_edit
                      ? "text-atlasian-yellow"
                      : ""
                  }`}
                >
                  {mtd_jenis?.nama || ""}
                </p>
              </Cell>
              <Cell
                width="12%"
                className="border-r cell-custom-dataTables justify-center"
              >
                {role === "child" && (isInitiator || user?.pn === pic?.pn) ? (
                  <div className={analisa ? "" : "opacity-30"}>
                    <ButtonIcon
                      icon={
                        <LozengeField appreance="inprogress" isBold>
                          Kertas Kerja Analisa
                        </LozengeField>
                      }
                      handleClick={() => handleClickAnalisa(id)}
                      // href={`${pathName}/${id}`}
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
                {role === "child" ? (
                  <p
                    className={`${
                      is_new || is_edit || is_delete
                        ? "font-semibold"
                        : "font-medium"
                    } ${
                      is_new
                        ? "text-atlasian-blue-light"
                        : is_delete
                        ? "text-atlasian-red"
                        : is_edit
                        ? "text-atlasian-yellow"
                        : ""
                    }`}
                  >
                    {pic?.pn} - {pic?.name}
                  </p>
                ) : (
                  ""
                )}
              </Cell>
            </Row>
          )}
        />
      </TableTree>
      <div className="w-full border rounded-ee-lg rounded-es-lg min-h-[2rem]"></div>
    </div>
  );
};

export default TableAnalisisPerencanaan;

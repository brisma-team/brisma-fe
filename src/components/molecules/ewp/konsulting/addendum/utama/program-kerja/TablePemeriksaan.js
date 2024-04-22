import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import {
  IconChevronDown,
  IconChevronRight,
  IconPlus,
} from "@/components/icons";
import {
  ButtonField,
  ButtonIcon,
  LinkIcon,
  LozengeField,
} from "@/components/atoms";
import {
  ButtonDelete,
  ButtonEdit,
  RetryButton,
} from "@/components/molecules/commons";
import Image from "next/image";
import { ImageGroup } from "@/helpers/imagesUrl";
const positionCenter = `w-full h-full flex justify-center items-center`;

const TablePemeriksaan = ({
  data,
  withoutButton,
  pathName,
  expansionMap,
  handleSelectedLingkupPemeriksaan,
  handleSelectedRisk,
  handleClickToggleExpansion,
  handleClickAddLingkupPemeriksaan,
  handleClickAddRisk,
  handleClickAddControl,
  handleClickEditLingkupPemeriksaan,
  handleClickEditControl,
  handleClickDeleteLingkupPemeriksaan,
  handleClickDeleteRisk,
  handleClickDeleteControl,
  handleClickRestoreRisk,
  handleClickRestoreControl,
}) => {
  return (
    <div className="dataTables-custom">
      <TableTree>
        <Headers>
          <Header className="!hidden" />
          <Header
            width="8%"
            className="border-t border-x cell-custom-dataTables justify-center"
          >
            Aksi
          </Header>
          <Header
            width="53%"
            className="border-t border-x cell-custom-dataTables"
          >
            LINGKUP PEMERIKSAAN
          </Header>
          <Header
            width="24%"
            className="border-t border-r cell-custom-dataTables justify-center"
          >
            P.I.C
          </Header>
          <Header
            width="15%"
            className="border-t border-r cell-custom-dataTables justify-center"
          >
            Uraian
          </Header>
        </Headers>
        <Rows
          items={data}
          render={({
            id,
            is_new,
            is_edit,
            is_delete,
            role,
            lingkup_pemeriksaan,
            risk,
            control,
            pic,
            uraian,
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
                className="border-r cell-custom-dataTables justify-center"
              >
                <div className="flex gap-2">
                  {!withoutButton && (
                    <>
                      {role !== "parent-child" &&
                      !(role === "child" && is_delete) ? (
                        <ButtonIcon
                          icon={<ButtonEdit />}
                          handleClick={() => {
                            if (role === "parent") {
                              handleClickEditLingkupPemeriksaan(id);
                            } else if (role === "child") {
                              handleClickEditControl(id);
                            }
                          }}
                        />
                      ) : (
                        ""
                      )}
                      {role !== "parent" && is_delete ? (
                        <ButtonIcon
                          icon={
                            <RetryButton
                              size={"small"}
                              className={
                                "text-atlasian-purple border border-atlasian-purple"
                              }
                            />
                          }
                          handleClick={async () => {
                            if (role === "parent-child") {
                              handleClickRestoreRisk(id);
                            } else {
                              handleClickRestoreControl(id);
                            }
                          }}
                        />
                      ) : (
                        <ButtonIcon
                          icon={<ButtonDelete />}
                          handleClick={async () => {
                            if ((await role) === "parent") {
                              handleClickDeleteLingkupPemeriksaan(id);
                            } else if (role === "parent-child") {
                              handleClickDeleteRisk(id);
                            } else {
                              handleClickDeleteControl(id);
                            }
                          }}
                        />
                      )}
                    </>
                  )}
                </div>
              </Cell>
              <Cell
                width="53%"
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
                    >{`${
                      lingkup_pemeriksaan
                        ? lingkup_pemeriksaan
                        : risk
                        ? `${risk?.abbr} - ${risk?.nama}`
                        : control
                        ? `${control?.abbr} - ${control?.nama}`
                        : ""
                    }`}</p>
                    {role !== "child" ? (
                      !withoutButton ? (
                        <ButtonIcon
                          icon={<Image src={ImageGroup} alt="" />}
                          handleClick={() => {
                            if (role === "parent") {
                              handleSelectedLingkupPemeriksaan(
                                id,
                                lingkup_pemeriksaan
                              );
                              handleClickAddRisk(id);
                            } else if (role === "parent-child") {
                              handleSelectedRisk(id, risk?.nama);
                              handleClickAddControl(id);
                            } else {
                              return;
                            }
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
                width="24%"
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
                  {pic?.nama || ""}
                </p>
              </Cell>
              <Cell
                width="15%"
                className="border-r cell-custom-dataTables justify-center"
              >
                {role === "child" ? (
                  <div className={uraian ? "" : "opacity-30"}>
                    <LinkIcon
                      icon={
                        <LozengeField appreance="inprogress" isBold>
                          URAIAN
                        </LozengeField>
                      }
                      href={`${pathName}/${id}`}
                    />
                  </div>
                ) : (
                  ""
                )}
              </Cell>
            </Row>
          )}
        />
      </TableTree>
      <div className="w-full border rounded-ee-lg rounded-es-lg min-h-[2rem]">
        {!withoutButton ? (
          <div className="w-fit p-2">
            <ButtonField
              iconAfter={
                <div className="text-atlasian-purple">
                  <IconPlus size="medium" />
                </div>
              }
              text={"Tambah Lingkup Pemeriksaan"}
              textColor={"purple"}
              handler={handleClickAddLingkupPemeriksaan}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default TablePemeriksaan;

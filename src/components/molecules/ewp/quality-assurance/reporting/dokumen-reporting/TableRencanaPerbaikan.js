import { ButtonIcon, LinkIcon, LozengeField } from "@/components/atoms";
import { IconChevronDown, IconChevronRight } from "@/components/icons";
import {
  ButtonDelete,
  ButtonEdit,
  DataNotFound,
} from "@/components/molecules/commons";
import { capitalizeEveryWord } from "@/helpers";
import { ImageGroup } from "@/helpers/imagesUrl";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import Image from "next/image";

const positionCenter = `w-full h-full flex justify-center items-center`;

const TableRencanaPerbaikan = ({
  data,
  expansionMap,
  pathName,
  withoutButton,
  handleToggleExpansion,
  handleAddRekomendasi,
  handleEditRekomendasi,
  handleDeleteRekomendasi,
}) => {
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
            width="52%"
            className="border-t border-x cell-custom-dataTables"
          >
            SURVEI, REKOMENDASI & ACTION PLAN
          </Header>
          <Header
            width="13%"
            className="border-t border-r cell-custom-dataTables justify-center"
          >
            METODE
          </Header>
          <Header
            width="13%"
            className="border-t border-r cell-custom-dataTables justify-center"
          >
            ACTION PLAN
          </Header>
          <Header
            width="14%"
            className="border-t border-r cell-custom-dataTables justify-center rounded-se-lg"
          >
            JUMLAH ACTION PLAN
          </Header>
        </Headers>
        {data?.length ? (
          <Rows
            items={data}
            render={({
              id,
              metode,
              project,
              deskripsi,
              jumlah_action_plan,
              role,
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
                  {role === "child" && !withoutButton ? (
                    <div className="flex gap-1.5">
                      <ButtonIcon
                        icon={<ButtonDelete />}
                        handleClick={async () => handleDeleteRekomendasi(id)}
                      />
                      <ButtonIcon
                        icon={<ButtonEdit />}
                        handleClick={async () => handleEditRekomendasi(id)}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </Cell>
                <Cell
                  width="52%"
                  className="border-r cell-custom-dataTables cell-width-full-height-full px-10"
                >
                  <div className={`${positionCenter}`}>
                    {role === "parent" ? (
                      <ButtonIcon
                        handleClick={() => handleToggleExpansion(id, role)}
                        icon={
                          expansionMap[`${id}-${role}`] ? (
                            <IconChevronDown />
                          ) : (
                            <IconChevronRight />
                          )
                        }
                        className={role === "child" ? "ml-5" : ""}
                      />
                    ) : (
                      <div className="ml-[2.67rem]" />
                    )}
                    <div
                      className={`flex items-center w-full justify-between ml-2`}
                    >
                      <p>{`${
                        project ? project : deskripsi ? deskripsi : ""
                      }`}</p>
                      {role !== "child" ? (
                        !withoutButton ? (
                          <ButtonIcon
                            icon={<Image src={ImageGroup} alt="" />}
                            handleClick={() => {
                              handleAddRekomendasi(id);
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
                  width="13%"
                  className="border-r cell-custom-dataTables justify-center"
                >
                  {role === "child"
                    ? metode?.name
                      ? capitalizeEveryWord(metode?.name)
                      : ""
                    : ""}
                </Cell>
                <Cell
                  width="13%"
                  className="border-r cell-custom-dataTables justify-center"
                >
                  {role === "child" ? (
                    <div className={jumlah_action_plan ? "" : "opacity-30"}>
                      <LinkIcon
                        icon={
                          <LozengeField appreance="inprogress" isBold>
                            Action Plan
                          </LozengeField>
                        }
                        href={`${pathName}/${id}`}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </Cell>
                <Cell
                  width="14%"
                  className="border-r cell-custom-dataTables justify-center"
                >
                  {role === "child" ? jumlah_action_plan || 0 : ""}
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

export default TableRencanaPerbaikan;
